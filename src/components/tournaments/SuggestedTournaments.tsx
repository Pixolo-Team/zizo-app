import { TournamentListingItemData } from "@/types/tournament";
import Link from "next/link";
import SuggestedTournamentCard from "./SuggestedTournamentCard";

interface SuggestedTournamentsProps {
  suggestedTournaments: TournamentListingItemData[];
}

const tabs = [
  {
    label: "About",
    href: "/football-tournaments",
  },
  {
    label: "Help",
    href: "/football-tournaments",
  },
  {
    label: "7v7",
    href: "/football-tournaments",
  },
  {
    label: "Mumbai",
    href: "/football-tournaments",
  },
  {
    label: "5v5",
    href: "/football-tournaments",
  },
  {
    label: "Pune",
    href: "/football-tournaments",
  },
  {
    label: "Matches",
    href: "/football-tournaments",
  },
  {
    label: "Jobs",
    href: "/football-tournaments",
  },
  {
    label: "Time",
    href: "/football-tournaments",
  },
];

export default function SuggestedTournaments({
  suggestedTournaments,
}: SuggestedTournamentsProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    <div className="w-full flex flex-col gap-11 pr-5">
      <div className="flex flex-col gap-[30px]">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p className="text-n-600 text-lg font-medium">
            Suggested Tournaments
          </p>
          {/* See All Button */}
          <Link href="/football-tournaments" className="text-n-500 underline">
            <p>See All</p>
          </Link>
        </div>

        {/* Tournaments */}
        <div className="flex flex-col gap-7">
          {suggestedTournaments.map((tournament, tournamentIndex) => (
            <SuggestedTournamentCard key={tournamentIndex} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-16">
        {/* Bottom Tabs */}
        <div className="flex items-center gap-x-4 gap-y-1.5 flex-wrap">
          {tabs.map((tab, tabIndex) => (
            <Link
              key={tab.label}
              href={tab.href}
              className="text-n-600 flex items-center gap-4 hover:text-n-500 transition-colors"
            >
              <p>{tab.label}</p>
              {tabIndex !== tabs.length - 1 && (
                <div className="size-1 bg-n-600 rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
        {/* Powered By */}
        <div className="flex flex-col gap-1.5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
          >
            <path
              d="M13.7252 0C14.7176 0.0202533 17.1439 0.391939 18.9299 1.71508C19.4387 1.52041 19.9082 1.33997 20.3265 1.17783C21.4791 0.730997 23.3892 1.17785 22.0529 3.10741C20.5378 5.29533 12.7842 15.3214 9.01301 20.0065L23.3529 14.4818C23.9783 14.1975 25.1118 12.9625 25.2418 11.1914C25.786 12.9179 26.0094 16.039 23.3529 17.2036C20.9805 18.2435 10.5431 22.2679 5.621 24.1501C4.19495 24.6954 3.22 24.0542 3.97151 22.8095C5.27144 20.6565 6.54681 18.9097 7.28228 17.8332C7.87873 16.9602 14.0029 9.26855 16.9954 5.42292L2.57428 10.8867C1.94037 11.1711 0.665038 11.7804 0.0963073 14.0553C-0.0526431 13.1684 -0.0897489 11.2252 0.441607 10.2367C1.10761 8.99776 1.7982 8.3681 4.44294 7.27126C6.08231 6.59138 9.64979 5.23477 13.1756 3.89921C14.4291 3.11698 15.9967 1.44825 13.7252 0Z"
              fill="#6A7282"
            />
            <path
              d="M23.3121 5.54492L15.2891 15.6803C17.9634 14.7663 23.5193 12.5442 24.348 10.9681C25.1767 9.39191 24.0027 6.6959 23.3121 5.54492Z"
              fill="#D1D5DC"
            />
            <path
              d="M9.37802 0.344848C5.51072 1.20605 2.68879 4.83367 1.76123 6.53983C4.30016 5.55812 9.60957 3.50531 10.5358 3.14783C11.6935 2.70098 12.6075 1.76665 11.7951 0.730765C11.283 0.0778632 10.044 0.196571 9.37802 0.344848Z"
              fill="#6A7282"
            />
            <path
              d="M0.762746 16.1069C0.730249 17.4068 2.17531 19.6817 2.83882 20.5551C2.83882 19.8564 3.96269 18.2599 4.52463 17.549L11.1665 9.48535C9.8056 10.0338 6.4989 11.3459 4.15902 12.2071C1.23418 13.2836 0.795243 14.8069 0.762746 16.1069Z"
              fill="#6A7282"
            />
            <path
              d="M23.2308 19.1943L14.0094 23.1348C12.937 23.593 12.899 24.1923 13.0141 24.4347C12.9938 24.8612 13.7007 25.4584 16.6905 24.4347C19.9766 23.3095 22.2965 20.5146 23.2308 19.1943Z"
              fill="#6A7282"
            />
            <path
              d="M23.3323 5.54492L16.5889 14.0554C16.8191 14.245 18.1041 14.0148 20.7527 11.7399C23.4013 9.46503 23.576 6.66205 23.3323 5.54492Z"
              fill="#6A7282"
            />
            <path
              d="M11.9171 0.873535C10.3734 1.26351 7.10324 3.81192 5.66113 5.03738C6.53452 4.69885 8.73222 3.85119 10.5359 3.16873C12.3395 2.48626 12.2082 1.35424 11.9171 0.873535Z"
              fill="#D1D5DC"
            />
            <path
              d="M4.40268 14.8679C2.35529 16.5253 1.87052 18.375 1.88406 19.0926L2.91991 20.6566C3.06615 18.9992 7.73348 13.7101 9.86618 11.0493C8.89124 11.5842 6.45007 13.2105 4.40268 14.8679Z"
              fill="#D1D5DC"
            />
            <path
              d="M18.6999 22.2816C17.6404 22.9313 14.9258 24.3805 13.5582 24.9424C13.1722 24.9424 12.6841 24.515 13.091 23.8253C13.4978 23.1356 14.6347 22.8429 15.3282 22.5457C16.0216 22.2485 19.1032 20.8801 20.9921 20.1489C20.6468 20.6973 20.0578 21.4489 18.6999 22.2816Z"
              fill="#D1D5DC"
            />
          </svg>
          <p className="text-n-400 text-sm font-medium">Powered by Zizo</p>
        </div>
      </div>
    </div>
  );
}
