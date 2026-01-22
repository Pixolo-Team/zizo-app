import OrganizersListing from "./components/OrganizersListing";

export const metadata = {
  title: "Organizers | Operations | ZIZO",
  description: "View and manage tournament organizers.",
};

export default function OrganizersPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <OrganizersListing />
    </div>
  );
}
