"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OrganizerCreateData, OrganizerTypeData } from "@/types/tournament";
import { organizerTypeOptionsData } from "@/infrastructure/constants/tournaments";
import { createOrganizerRequest } from "@/services/queries/tournaments.query";
import Motion from "@/components/animations/Motion";
import { fadeIn } from "@/lib/animations";

/**
 * Organizer creation form (Operations)
 */
export default function CreateOrganizerForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<OrganizerCreateData>({
    name: "",
    type: "individual",
    contact_name: "",
    contact_phone: "",
    whatsapp_phone: "",
    logo_url: "",
  });

  const canSubmit = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.type.trim() !== "" &&
      formData.contact_name.trim() !== "" &&
      formData.contact_phone.trim() !== "" &&
      formData.whatsapp_phone.trim() !== "" &&
      formData.logo_url.trim() !== ""
    );
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      setError("Please fill all the mandatory fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { data, error: submitError } =
        await createOrganizerRequest(formData);

      if (submitError) {
        throw submitError;
      }

      alert(`Organizer created successfully! ID: ${data}`);
      router.push("/operations/organizers");
    } catch (err) {
      console.error(err);
      setError("Failed to create organizer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-n-200">
      <Motion variants={fadeIn}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-n-950">Add New Organizer</h1>
            <p className="text-n-500 text-sm">
              Fill in the details to register a new organizer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-n-700">
                Organizer Name *
              </label>
              <input
                type="text"
                className="w-full h-11 px-4 rounded-xl border border-n-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="Enter organizer name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-n-700">
                Organizer Type *
              </label>
              <select
                className="w-full h-11 px-4 rounded-xl border border-n-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as OrganizerTypeData,
                  })
                }
              >
                {organizerTypeOptionsData.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-n-700">
                Contact Person Name *
              </label>
              <input
                type="text"
                className="w-full h-11 px-4 rounded-xl border border-n-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="Name of the primary contact"
                value={formData.contact_name}
                onChange={(e) =>
                  setFormData({ ...formData, contact_name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-n-700">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  className="w-full h-11 px-4 rounded-xl border border-n-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="e.g. +91 9876543210"
                  value={formData.contact_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_phone: e.target.value })
                  }
                />
              </div>

              {/* WhatsApp Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-n-700">
                  WhatsApp Phone *
                </label>
                <input
                  type="tel"
                  className="w-full h-11 px-4 rounded-xl border border-n-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="e.g. +91 9876543210"
                  value={formData.whatsapp_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp_phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Logo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-n-700">
                Logo Image URL *
              </label>
              <input
                type="url"
                className="w-full h-11 px-4 rounded-xl border border-n-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="https://example.com/logo.png"
                value={formData.logo_url}
                onChange={(e) =>
                  setFormData({ ...formData, logo_url: e.target.value })
                }
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="mt-4 w-full h-12 bg-n-950 text-white font-bold rounded-xl hover:bg-n-800 disabled:bg-n-300 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "Processing..." : "Create Organizer"}
            </button>
          </form>
        </div>
      </Motion>
    </div>
  );
}
