"use client";
// REACT //
import { useRouter } from "next/navigation";

// COMPONENTS //
import { Button } from "@/components/ui/button";

/** Home Page */
export default function Home() {
  // Define Navigation
  const router = useRouter();
  return (
    <div className=" flex flex-col items-center justify-center gap-4 mt-18">
      <h1 className="text-2xl text-n-900 font-bold">Welcome to the Zizo App</h1>
      <Button onClick={() => router.push("football-tournaments")}>
        Check Upcoming Football Tournaments
      </Button>
    </div>
  );
}
