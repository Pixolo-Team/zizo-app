"use client";

// SERVICES //
import { createIdentity } from "@/services/queries/identity.query";
import {
  addTournamentLead,
  getOrganizerDetails,
  getTournamentContactDetails,
  getTournamentDetails,
  getTournaments,
} from "@/services/queries/tournaments.query";

/** Tournaments Page */
export default function Tournaments() {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions
  const createAIIdentity = async () => {
    const { data, error } = await createIdentity();

    if (error) {
      console.error("Error creating identity:", error);
    } else {
      console.log("Identity created successfully:", data);
    }
  };
  const getAllTournaments = async () => {
    const { data, error } = await getTournaments({
      city: "",
      area: "",
      age_category: "",
      gender: "",
      tournament_format: "",
      format: "",
      ground_type: "",
      entry_fee_min: undefined,
      entry_fee_max: undefined,
      has_cash_prize: false,
      start_date: "",
      end_date: "",
      search_text: "",
      page: 1,
      page_size: 10,
    });

    if (error) {
      console.error("Error getting tournaments:", error);
    } else {
      console.log("Tournaments fetched successfully:", data);
    }
  };

  const getSingleTournament = async () => {
    const { data, error } = await getTournamentDetails(
      "037ffc40-3240-41f3-ab1c-4066daf8567d"
    );

    if (error) {
      console.error("Error getting tournament:", error);
    } else {
      console.log("Tournament fetched successfully:", data);
    }
  };

  const addLeadToTournament = async () => {
    const { data, error } = await addTournamentLead(
      "037ffc40-3240-41f3-ab1c-4066daf8567d",
      {
        identity_id: "5a2c4226-27f3-4a14-8384-9fffcb4ff426",
        name: "John Doe",
        phone: "1234567890",
      }
    );

    if (error) {
      console.error("Error adding lead to tournament:", error);
    } else {
      console.log("Lead added to tournament successfully:", data);
    }
  };

  const getContactDetails = async () => {
    const { data, error } = await getTournamentContactDetails(
      "037ffc40-3240-41f3-ab1c-4066daf8567d"
    );

    if (error) {
      console.error("Error getting contact details:", error);
    } else {
      console.log("Contact details fetched successfully:", data);
    }
  };

  const getTheOrganizerDetails = async () => {
    const { data, error } = await getOrganizerDetails(
      "9638deb6-2eaa-403c-a649-8d6415123c20"
    );

    if (error) {
      console.error("Error getting organizer details:", error);
    } else {
      console.log("Organizer details fetched successfully:", data);
    }
  };

  // Use Effects
  return (
    <div className=" flex flex-col items-center justify-center gap-4 mt-18">
      <h1 className="text-2xl font-bold">Tournaments</h1>

      <button onClick={() => createAIIdentity()}>Create Identity</button>
      {/* Get Tournaments List and console */}
      <button onClick={() => getAllTournaments()}>Get Tournaments</button>
      {/* Get a Single Tournament and console */}
      <button onClick={() => getSingleTournament()}>
        Get Single Tournament
      </button>
      {/* Add a lead to a Tournament */}
      <button onClick={() => addLeadToTournament()}>
        Add Lead to Tournament
      </button>
      {/* Get Contact Details */}
      <button onClick={() => getContactDetails()}>Get Contact Details</button>
      {/* Get the Organizer Details */}
      <button onClick={() => getTheOrganizerDetails()}>
        Get Organizer Details
      </button>
    </div>
  );
}
