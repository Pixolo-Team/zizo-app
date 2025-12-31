// app/football-tournaments/page.tsx

export const metadata = {
  title: "Local Football Tournaments in India | ZIZO",
  description:
    "Discover local football tournaments for players, teams, and academies. View dates, categories, venues, and register for upcoming tournaments on ZIZO.",
  keywords:
    "local football tournaments, football tournament near me, football tournaments in India, football competitions, football events, football leagues, football cups, football championships, football fixtures, football schedules, football match registration, youth football tournaments, amateur football tournaments, professional football tournaments, school football tournaments, college football tournaments, community football tournaments, regional football tournaments, national football tournaments, international football tournaments, ZIZO football tournaments",
};

import TournamentDetails from "./TournamentDetails";

export default function Page() {
  return <TournamentDetails />;
}
