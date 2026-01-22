/**
 * Create Tournament page (Operations)
 */
import CreateTournamentForm from "./components/CreateTournamentForm";

export default function TournamentCreatePage() {
  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-semibold">Create Tournament</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Create a tournament series and add one or more categories
      </p>

      <div className="mt-6">
        <CreateTournamentForm />
      </div>
    </div>
  );
}
