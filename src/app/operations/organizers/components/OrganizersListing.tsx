"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OrganizerListingItemData } from "@/types/tournament";
import { getOrganizersListRequest } from "@/services/queries/tournaments.query";
import Motion from "@/components/animations/Motion";
import { fadeIn, slideInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, User, Users, Phone } from "lucide-react";

export default function OrganizersListing() {
  const [organizers, setOrganizers] = useState<OrganizerListingItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const { data, error } = await getOrganizersListRequest();
        if (error) throw error;
        setOrganizers(data ?? []);
      } catch (err) {
        console.error("Error fetching organizers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-n-950">Organizers</h1>
          <p className="text-n-500 text-sm">
            Manage and view all registered tournament organizers.
          </p>
        </div>
        <Link href="/operations/organizers/create">
          <Button className="rounded-xl flex items-center gap-2">
            <Plus className="size-4" />
            Add Organizer
          </Button>
        </Link>
      </div>

      {organizers.length === 0 ? (
        <Motion variants={fadeIn}>
          <div className="flex flex-col items-center justify-center py-20 bg-n-50 rounded-3xl border border-dashed border-n-300">
            <p className="text-n-500 mb-4">No organizers found.</p>
            <Link href="/operations/organizers/create">
              <Button variant="outline" className="rounded-xl">
                Create your first organizer
              </Button>
            </Link>
          </div>
        </Motion>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizers.map((organizer, index) => (
            <Motion key={organizer.id} variants={slideInUp} delay={index * 0.1}>
              <div className="bg-white p-6 rounded-2xl border border-n-200 hover:border-green-500 transition-all shadow-sm group">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-14 rounded-xl border border-n-200 overflow-hidden bg-n-50 relative flex items-center justify-center">
                    {organizer.logo_url ? (
                      <Image
                        src={organizer.logo_url}
                        alt={organizer.name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <Users className="size-6 text-n-400" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      organizer.type === "individual"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-purple-50 text-purple-600"
                    }`}
                  >
                    {organizer.type.charAt(0).toUpperCase() +
                      organizer.type.slice(1)}
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                  <h3 className="font-bold text-lg text-n-950 line-clamp-1">
                    {organizer.name}
                  </h3>
                  <div className="flex items-center gap-2 text-n-500 text-sm">
                    <User className="size-3" />
                    <span>
                      {organizer.contact_name || "No contact specified"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-n-100">
                  <div className="flex items-center gap-2 text-n-500 text-sm">
                    <Phone className="size-3" />
                    <span>{organizer.contact_phone || "N/A"}</span>
                  </div>
                  <Link
                    href={`/operations/organizers/${organizer.id}`}
                    className="text-sm font-semibold text-green-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      )}
    </div>
  );
}
