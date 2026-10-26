# Forge Master Metrics

Forge Master Metrics is a web application for tracking player performance, analyzing clan wars, and comparing statistics in Forge Master.

## Features

- **Dashboard** — Overview of player statistics, rankings, and recent war performance.
- **Player Statistics** — Browse players, compare scores, and view individual war history.
- **War History** — Track clan wars, enemy clans, results, participant counts, and daily performance.
- **War Points Calculator** — Calculate and analyze war points.
- **Authentication** — User registration, login, and player account verification.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Recharts
- Supabase

## Getting Started

### Prerequisites

- Node.js and npm
- A configured Supabase project

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/gCode2/forge-master-metrics.git
cd forge-master-metrics
npm install
```

### Environment Variables

Create a `.env` file in the project root and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### Run Locally

Start the development server:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── components/   # UI components
├── features/     # Authentication and onboarding
├── hooks/        # Custom React hooks
├── lib/          # Shared utilities and Supabase client
├── pages/        # Application pages
└── types/        # TypeScript types
supabase/
└── functions/    # Supabase Edge Functions
```

## Development Status

The application includes player statistics, war tracking, authentication, and a dashboard. Some sections, such as advanced charts and administration, are still under development.

## Contributing

Contributions, suggestions, and bug reports are welcome.

## License

No license has been specified yet.
