/**
 * Operations dashboard home page
 * Internal Zizo operations entry point
 */
export default function OperationsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Zizo Operations</h1>
        <p className="text-sm text-muted-foreground">
          Internal tools for managing Zizo content and data
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="/operations/tournaments/create"
          className="rounded-xl border p-5 transition hover:bg-muted"
        >
          <h2 className="text-lg font-medium">Create Tournament</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add a new tournament series and category
          </p>
        </a>

        {/* Placeholder for future ops tools */}
        <div className="rounded-xl border p-5 opacity-50">
          <h2 className="text-lg font-medium">More Tools</h2>
          <p className="mt-1 text-sm text-muted-foreground">Coming soon</p>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
        This section is for internal use only. Authentication and role-based
        access will be added in a future phase.
      </div>
    </div>
  );
}
