import CreateOrganizerForm from "./components/CreateOrganizerForm";

export const metadata = {
  title: "Create Organizer | Operations | ZIZO",
  description: "Add a new tournament organizer to the ZIZO platform.",
};

export default function CreateOrganizerPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <CreateOrganizerForm />
    </div>
  );
}
