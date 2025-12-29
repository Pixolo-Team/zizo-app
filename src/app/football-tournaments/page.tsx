import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Football Tournaments | Zizo App",
  description: "Browse all football tournaments",
};

interface Tournament {
  id: string;
  name: string;
  location: string;
  year: number;
}

// Sample tournament data
const tournaments: Tournament[] = [
  {
    id: "1",
    name: "UEFA Champions League",
    location: "Europe",
    year: 2024,
  },
  {
    id: "2",
    name: "FIFA World Cup",
    location: "Global",
    year: 2026,
  },
  {
    id: "3",
    name: "English Premier League",
    location: "England",
    year: 2024,
  },
  {
    id: "4",
    name: "Copa America",
    location: "South America",
    year: 2024,
  },
];

export default function FootballTournaments() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Football Tournaments
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <Link
              key={tournament.id}
              href={`/football-tournaments/${tournament.id}`}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                {tournament.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Location: {tournament.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Year: {tournament.year}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
