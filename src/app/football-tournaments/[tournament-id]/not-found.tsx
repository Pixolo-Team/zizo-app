import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Tournament Not Found
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The tournament you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/football-tournaments"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Back to Tournaments
        </Link>
      </div>
    </div>
  );
}
