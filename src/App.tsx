import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import { Route, Routes } from "react-router"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import PlayersPage from "./pages/PlayersPage"
import PlayerPage from "./pages/PlayerPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import PublicRoute from "./components/auth/PublicRoute"
function App() {
  // const [players, setPlayers] = useState([])
  // useEffect(()=>{
  //     getPlayers();
  //   }, [])

  // async function getPlayers(){
  //   const {data, error} = await supabase.from('players').select()
  //   if(error){
  //     console.error(error);
  //     return
  //   }
  //   console.log(data)
  //   setPlayers(data);
  // }
  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard" element={
          <DashboardPage/>
        }/>
        <Route path="/admin" element={
          <AdminPage/>
        }/>
        <Route path="/players" element={
          <PlayersPage/>
        }/>
        <Route path="/player/:id" element={
           <PlayerPage/>
        }/>

      </Route>
      <Route element={<PublicRoute/>}>
        <Route path="/login" element={
          <LoginPage/>
        }/>
        <Route path="/register" element={
          <RegisterPage/>
        }/>
      </Route>
    </Routes>
      {/* <div className="text-3xl">
        Hello World
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {players.map(player=>(
            <div key={player.id} className={`${player.is_member ? `text-green-500` : `text-red-500`} border-1 rounded p-2`}>
              {player.nickname}
            </div>
          ))}
        </div> */}
    </>
  )
}

export default App
