import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
// };

// function jsonResponse(body: unknown, status = 200) {
//   return new Response(JSON.stringify(body), {
//     status,
//     headers: {
//       ...corsHeaders,
//       "Content-Type": "application/json",
//     },
//   });
// }

function generateToken(): string {
  // 32 znaki, bez łatwych do pomylenia I, O, 0 i 1.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = new Uint8Array(10);
  const chars: string[] = [];

  while (chars.length < 10) {
    crypto.getRandomValues(random);

    for (const byte of random) {
      // 224 jest podzielne przez 32 — brak biasu modulo.
      if (byte >= 224) continue;

      chars.push(alphabet[byte % alphabet.length]);

      if (chars.length === 10) break;
    }
  }

  return `PLPL-${chars.join("")}`;
}

Deno.serve(async (req: Request) => {
  // if (req.method === "OPTIONS") {
  //   return new Response("ok", { headers: corsHeaders });
  // }

  // if (req.method !== "POST") {
  //   return jsonResponse({ error: "Method not allowed" }, 405);
  // }

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const authorization = req.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return jsonResponse({ error: "Authentication required" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    console.error("Missing Supabase environment variables");
    return jsonResponse({ error: "Server configuration error" }, 500);
  }

  // Klient użytkownika służy wyłącznie do weryfikacji sesji.
  const authClient = createClient(supabaseUrl, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const accessToken = authorization.slice("Bearer ".length);

  const {
    data: { user },
    error: authError,
  } = await authClient.auth.getUser(accessToken);

  if (authError || !user) {
    return jsonResponse({ error: "Invalid or expired session" }, 401);
  }

  // Klucz administracyjny pozostaje wyłącznie na serwerze.
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    const body = await req.json();
    const playerId = body?.player_id;

    if (
      typeof playerId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(playerId)
    ) {
      return jsonResponse({ error: "Invalid player_id" }, 400);
    }

    // Pobieramy aktywny klan po jego stałym slugu.
    const { data: clan, error: clanError } = await admin
      .from("clans")
      .select("id")
      .eq("slug", "polskapl")
      .eq("is_active", true)
      .single();

    if (clanError || !clan) {
      console.error("Could not load POLSKAPL clan:", clanError);
      return jsonResponse({ error: "Clan configuration error" }, 500);
    }

    // Nie pozwalamy zgłaszać byłego gracza ani nieistniejącego ID.
    const { data: player, error: playerError } = await admin
      .from("players")
      .select("id, nickname")
      .eq("id", playerId)
      .eq("is_member", true)
      .maybeSingle();

    if (playerError) {
      console.error("Player lookup failed:", playerError);
      return jsonResponse({ error: "Could not check player" }, 500);
    }

    if (!player) {
      return jsonResponse(
        { error: "Player not found or is no longer a clan member" },
        404,
      );
    }

    // Jeden aktywny claim na konto.
    const { data: existingClaim, error: existingClaimError } = await admin
      .from("player_claims")
      .select("id")
      .eq("user_id", user.id)
      .in("status", ["pending", "verified"])
      .limit(1)
      .maybeSingle();

    if (existingClaimError) {
      console.error("Claim lookup failed:", existingClaimError);
      return jsonResponse({ error: "Could not check existing claim" }, 500);
    }

    if (existingClaim) {
      return jsonResponse(
        { error: "You already have a pending or verified claim" },
        409,
      );
    }

    // Nie pozwalamy przejąć gracza już zweryfikowanego dla innego konta.
    const { data: playerClaim, error: playerClaimError } = await admin
      .from("player_claims")
      .select("id")
      .eq("player_id", player.id)
      .eq("status", "verified")
      .limit(1)
      .maybeSingle();

    if (playerClaimError) {
      console.error("Player claim lookup failed:", playerClaimError);
      return jsonResponse({ error: "Could not check player claim" }, 500);
    }

    if (playerClaim) {
      return jsonResponse(
        { error: "This player has already been verified" },
        409,
      );
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    console.log("Player:", player);
    console.log("Clan:", clan);
    const { data: claim, error: insertError } = await admin
      .from("player_claims")
      .insert({
        user_id: user.id,
        player_id: player.id,
        clan_id: clan.id,
        status: "pending",
        verification_method: "admin_token",
        verification_code: token,
        expires_at: expiresAt,
      })
      .select("id, player_id, status, expires_at")
      .single();
      console.log("Claim insert result:", { claim, insertError });
    if (insertError) {
  if (insertError.code === "23505") {
    return jsonResponse(
      { error: "A conflicting claim already exists" },
      409
    );
  }

  console.error("Claim insert failed:", insertError);
  return jsonResponse({ error: "Could not create claim" }, 500);
}

if (!claim) {
  console.error("Claim insert returned no data");
  return jsonResponse(
    { error: "Claim was created but no data was returned" },
    500
  );
}

return jsonResponse({
  id: claim.id,
  player_id: claim.player_id,
  status: claim.status,
  token,
  expires_at: claim.expires_at,
}, 201);

  } catch (error) {
  console.error(
    "Unexpected create-player-claim error:",
    error instanceof Error
      ? { message: error.message, stack: error.stack }
      : error,
  );

  return jsonResponse(
    {
      error: error instanceof Error
        ? error.message
        : "Unexpected server error",
    },
    500,
  );
}
});
