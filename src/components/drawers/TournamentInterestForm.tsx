"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TournamentInterestFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TournamentInterestForm({
  isOpen,
  onOpenChange,
}: Readonly<TournamentInterestFormProps>) {
  const [interestFormFields, setInterestFormFields] = useState({
    name: "",
    phone: "",
    teamName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInterestFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Ideally this would submit data to an API
    console.log("Form Submitted:", interestFormFields);
    toast.success("Interest submitted successfully!");
    onOpenChange(false);
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
              placeholder="Name"
              name="name"
              value={interestFormFields.name}
              onChange={handleChange}
              className="h-11 rounded-xl bg-n-50 border-n-200"
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Phone Number"
              name="phone"
              type="tel"
              value={interestFormFields.phone}
              onChange={handleChange}
              className="h-11 rounded-xl bg-n-50 border-n-200"
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Team Name"
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
          >
            Submit
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
