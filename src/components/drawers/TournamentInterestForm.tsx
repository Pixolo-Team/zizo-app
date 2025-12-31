"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// TOAST //
import { toast } from "sonner";

// CONTEXT //
import { useAuth } from "@/context/AuthContext";

// SERVICES //
import { addTournamentLeadRequest } from "@/services/queries/tournaments.query";

// ENUMS //
import { LocalStorageKeys } from "@/enums/app";

interface TournamentInterestFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentId: string;
  onSuccess: () => void;
}

export default function TournamentInterestForm({
  isOpen,
  onOpenChange,
  tournamentId,
  onSuccess,
}: Readonly<TournamentInterestFormProps>) {
  const { identityId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [interestFormFields, setInterestFormFields] = useState<{
    name: string;
    phone: string;
    teamName: string;
  }>({
    name: "",
    phone: "",
    teamName: "",
  });

  // Herlper Functions
  /** Handle any change in the form fields */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone number allow only numbers
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setInterestFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** Validate the form fields */
  const validate = () => {
    if (!interestFormFields.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!interestFormFields.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    if (interestFormFields.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    return true;
  };

  /** Handle form submission */
  const handleSubmit = async () => {
    if (!validate()) return;

    if (!identityId) {
      toast.error("Unable to identify user. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await addTournamentLeadRequest(tournamentId, {
        identity_id: identityId,
        name: interestFormFields.name,
        phone: interestFormFields.phone,
        team_name: interestFormFields.teamName || undefined,
      });

      if (error) {
        throw error;
      }

      toast.success("Interest submitted successfully!");

      // Store in Local Storage
      const interestedTournaments = JSON.parse(
        localStorage.getItem(LocalStorageKeys.INTERESTED_TOURNAMENTS) || "[]"
      );
      if (!interestedTournaments.includes(tournamentId)) {
        interestedTournaments.push(tournamentId);
        localStorage.setItem(
          LocalStorageKeys.INTERESTED_TOURNAMENTS,
          JSON.stringify(interestedTournaments)
        );
      }

      setInterestFormFields({ name: "", phone: "", teamName: "" });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting interest:", error);
      toast.error("Failed to submit interest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader
          title="Tournament Interest"
          subTitle="Fill in your details to register interest"
        />

        <div className="flex flex-col gap-4 p-4 pb-0">
          <div className="space-y-2">
            <Input
              placeholder="Name *"
              name="name"
              value={interestFormFields.name}
              onChange={handleChange}
              className="h-11 rounded-xl bg-n-50 border-n-200"
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Phone Number *"
              name="phone"
              type="tel"
              value={interestFormFields.phone}
              onChange={handleChange}
              className="h-11 rounded-xl bg-n-50 border-n-200"
              maxLength={10}
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Team Name (Optional)"
              name="teamName"
              value={interestFormFields.teamName}
              onChange={handleChange}
              className="h-11 rounded-xl bg-n-50 border-n-200"
            />
          </div>
        </div>

        <div className="p-4 mt-2">
          <Button
            className="w-full h-11 rounded-3xl bg-n-950 text-n-50 hover:bg-n-900"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
