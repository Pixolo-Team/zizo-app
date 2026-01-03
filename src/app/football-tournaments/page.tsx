// app/football-tournaments/page.tsx

export const metadata = {
  title: "Local Football Tournaments in India | ZIZO",
  description:
    "Discover local football tournaments for players, teams, and academies. View dates, categories, venues, and register for upcoming tournaments on ZIZO.",
  keywords:
    "local football tournaments, football tournament near me, football tournaments in India, football competitions, football events, football leagues, football cups, football championships, football fixtures, football schedules, football match registration, youth football tournaments, amateur football tournaments, professional football tournaments, school football tournaments, college football tournaments, community football tournaments, regional football tournaments, national football tournaments, international football tournaments, ZIZO football tournaments",
  openGraph: {
    title: "Local Football Tournaments in India | ZIZO",
    description:
      "Discover local football tournaments for players, teams, and academies. View dates, categories, venues, and register for upcoming tournaments on ZIZO.",
    url: "https://www.zizoapp.com/football-tournaments",
    siteName: "ZIZO",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Local Football Tournaments in India | ZIZO",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import Tournaments from "./FootballTournaments";

export default function Page() {
  return <Tournaments />;
}
