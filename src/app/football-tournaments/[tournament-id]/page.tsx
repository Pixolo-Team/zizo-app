import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface TournamentDetails {
  id: string;
  name: string;
  location: string;
  year: number;
  description: string;
  teams: number;
  startDate: string;
  endDate: string;
}

// Sample tournament data
const tournamentsData: Record<string, TournamentDetails> = {
  "1": {
    id: "1",
    name: "UEFA Champions League",
    location: "Europe",
    year: 2024,
    description:
      "The premier European club football competition, featuring the top teams from across Europe.",
    teams: 32,
    startDate: "September 2024",
    endDate: "June 2025",
  },
  "2": {
    id: "2",
    name: "FIFA World Cup",
    location: "Global",
    year: 2026,
    description:
      "The world's most prestigious football tournament, bringing together national teams from around the globe.",
    teams: 48,
    startDate: "June 2026",
    endDate: "July 2026",
  },
  "3": {
    id: "3",
    name: "English Premier League",
    location: "England",
    year: 2024,
    description:
      "The top tier of English football, featuring the best clubs in England.",
    teams: 20,
    startDate: "August 2024",
    endDate: "May 2025",
  },
  "4": {
    id: "4",
    name: "Copa America",
    location: "South America",
    year: 2024,
    description:
      "The main football competition for South American national teams.",
    teams: 16,
    startDate: "June 2024",
    endDate: "July 2024",
  },
};

type Props = {
  params: Promise<{ "tournament-id": string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "tournament-id": tournamentId } = await params;
  const tournament = tournamentsData[tournamentId];

  if (!tournament) {
    return {
      title: "Tournament Not Found",
    };
  }

  return {
    title: `${tournament.name} | Zizo App`,
    description: tournament.description,
  };
}

export default async function TournamentPage({ params }: Props) {
  const { "tournament-id": tournamentId } = await params;
  const tournament = tournamentsData[tournamentId];

  if (!tournament) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/football-tournaments"
          className="mb-6 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to Tournaments
        </Link>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-6 text-4xl font-bold text-foreground">
            {tournament.name}
          </h1>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-foreground">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tournament.location}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Year</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tournament.year}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">
                  Number of Teams
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tournament.teams}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Duration</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tournament.startDate} - {tournament.endDate}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-foreground">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {tournament.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
