"use client";

/**
 * Tournament create form (Operations)
 */
import { useEffect, useMemo, useState } from "react";
import {
  OrganizerOptionData,
  TournamentSeriesCreateData,
  TournamentCategoryCreateData,
} from "@/types/tournament";
import {
  ageCategoryOptionsData,
  matchFormatOptionsData,
  tournamentFormatOptionsData,
  genderOptionsData,
  slotStatusOptionsData,
  groundTypeOptionsData,
  seriesStatusOptionsData,
} from "@/infrastructure/constants/tournaments";
import {
  getOrganizersRequest,
  createTournamentService,
} from "@/services/queries/tournaments.query";

/**
 * Convert string to number or null
 */
function numberOrNullService(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
}

/**
 * Convert empty string to null
 */
function textOrNullService(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

const emptyCategoryData: TournamentCategoryCreateData = {
  age_category: "OPEN",
  gender: "boys",
  format: "7v7",
  tournament_format: "league",
  slot_status: "open",

  contact_name: null,
  contact_phone: null,

  start_date: null,
  start_time: null,
  end_date: null,
  end_time: null,

  entry_fee: null,
  advance_fee: null,

  prizes_text: null,
  cash_prize_total: null,

  age_cutoff_date: null,
  rules_text: null,

  registration_deadline: null,
  match_days_text: null,
  min_matches: null,

  playing_team_size: null,
  total_team_size: null,
  min_players: null,
  max_players: null,
};

export default function TournamentCreateForm() {
  const [organizers, setOrganizers] = useState<OrganizerOptionData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [seriesData, setSeriesData] = useState<TournamentSeriesCreateData>({
    name: "",
    city: "",
    area: "",
    ground_name: "",
    ground_type: "turf",
    organizer_id: "",
    poster_url: "",
    status: "draft",
  });

  const [categories, setCategories] = useState<TournamentCategoryCreateData[]>([
    { ...emptyCategoryData },
  ]);

  useEffect(() => {
    getOrganizersRequest()
      .then(setOrganizers)
      .catch(() => setOrganizers([]));
  }, []);

  const canSubmit = useMemo(() => {
    if (!seriesData.name.trim()) return false;
    if (!seriesData.city.trim()) return false;
    if (!seriesData.area.trim()) return false;
    if (!seriesData.ground_name.trim()) return false;
    if (!seriesData.organizer_id) return false;

    // At least one category
    if (categories.length < 1) return false;

    // Basic required checks per category
    const everyCategoryValid = categories.every((c) => {
      if (!c.age_category) return false;
      if (!c.format) return false;
      if (!c.gender) return false;
      if (!c.tournament_format) return false;
      return true;
    });

    return everyCategoryValid;
  }, [seriesData, categories]);

  /**
   * Update one category field
   */
  const updateCategoryService = (
    index: number,
    patch: Partial<TournamentCategoryCreateData>
  ) => {
    setCategories((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...patch };
      return copy;
    });
  };

  /**
   * Add a new empty category
   */
  const addCategoryService = () => {
    setCategories((prev) => [...prev, { ...emptyCategoryData }]);
  };

  /**
   * Remove a category by index
   */
  const removeCategoryService = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Submit series + categories
   */
  const submitTournamentService = async () => {
    if (!canSubmit) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Normalize optional fields
      const seriesPayload: TournamentSeriesCreateData = {
        ...seriesData,
        name: seriesData.name.trim(),
        city: seriesData.city.trim(),
        area: seriesData.area.trim(),
        ground_name: seriesData.ground_name.trim(),
        poster_url: textOrNullService(seriesData.poster_url ?? "") ?? undefined,
      };

      const categoriesPayload = categories.map((c) => ({
        ...c,
        contact_name: textOrNullService(c.contact_name ?? ""),
        contact_phone: textOrNullService(c.contact_phone ?? ""),
        prizes_text: textOrNullService(c.prizes_text ?? ""),
        rules_text: textOrNullService(c.rules_text ?? ""),
        match_days_text: textOrNullService(c.match_days_text ?? ""),
        start_date: textOrNullService(c.start_date ?? ""),
        start_time: textOrNullService(c.start_time ?? ""),
        end_date: textOrNullService(c.end_date ?? ""),
        end_time: textOrNullService(c.end_time ?? ""),
        registration_deadline: textOrNullService(c.registration_deadline ?? ""),
        age_cutoff_date: textOrNullService(c.age_cutoff_date ?? ""),
      }));

      const seriesId = await createTournamentService(
        seriesPayload,
        categoriesPayload
      );

      alert(`Tournament created successfully. Series ID: ${seriesId}`);
    } catch {
      alert("Failed to create tournament. Please check required fields.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Series */}
      <div className="rounded-xl border p-5 space-y-4">
        <h2 className="text-lg font-medium">Tournament Series</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm">Tournament Name *</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.name}
              onChange={(e) =>
                setSeriesData({ ...seriesData, name: e.target.value })
              }
              placeholder="e.g. Sultan Cup 2026"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Organizer *</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.organizer_id}
              onChange={(e) =>
                setSeriesData({ ...seriesData, organizer_id: e.target.value })
              }
            >
              <option value="">Select Organizer</option>
              {organizers.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm">City *</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.city}
              onChange={(e) =>
                setSeriesData({ ...seriesData, city: e.target.value })
              }
              placeholder="Mumbai"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Area *</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.area}
              onChange={(e) =>
                setSeriesData({ ...seriesData, area: e.target.value })
              }
              placeholder="Ghatkopar / Andheri / Nerul / Pune"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Ground Name *</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.ground_name}
              onChange={(e) =>
                setSeriesData({ ...seriesData, ground_name: e.target.value })
              }
              placeholder="Ramji Assar Turf"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Ground Type *</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.ground_type}
              onChange={(e) =>
                setSeriesData({
                  ...seriesData,
                  ground_type: e.target
                    .value as TournamentSeriesCreateData["ground_type"],
                })
              }
            >
              {groundTypeOptionsData.map((gt) => (
                <option key={gt} value={gt}>
                  {gt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm">Poster URL</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.poster_url ?? ""}
              onChange={(e) =>
                setSeriesData({ ...seriesData, poster_url: e.target.value })
              }
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Status *</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={seriesData.status}
              onChange={(e) =>
                setSeriesData({
                  ...seriesData,
                  status: e.target
                    .value as TournamentSeriesCreateData["status"],
                })
              }
            >
              {seriesStatusOptionsData.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-xl border p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Tournament Categories</h2>

          <button
            type="button"
            className="rounded-lg border px-3 py-2 text-sm"
            onClick={addCategoryService}
          >
            + Add Category
          </button>
        </div>

        <div className="space-y-6">
          {categories.map((c, index) => (
            <div key={index} className="rounded-xl border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Category {index + 1}</p>

                {categories.length > 1 ? (
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() => removeCategoryService(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>

              {/* Core enums */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-sm">Age Category *</label>
                  <select
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.age_category}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        age_category: e.target
                          .value as TournamentCategoryCreateData["age_category"],
                      })
                    }
                  >
                    {ageCategoryOptionsData.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Gender *</label>
                  <select
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.gender}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        gender: e.target
                          .value as TournamentCategoryCreateData["gender"],
                      })
                    }
                  >
                    {genderOptionsData.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Match Format *</label>
                  <select
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.format}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        format: e.target
                          .value as TournamentCategoryCreateData["format"],
                      })
                    }
                  >
                    {matchFormatOptionsData.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="text-sm">Tournament Format *</label>
                  <select
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.tournament_format}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        tournament_format: e.target
                          .value as TournamentCategoryCreateData["tournament_format"],
                      })
                    }
                  >
                    {tournamentFormatOptionsData.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & fees */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <label className="text-sm">Start Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.start_date ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        start_date: textOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Start Time</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.start_time ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        start_time: textOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">End Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.end_date ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        end_date: textOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">End Time</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.end_time ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        end_time: textOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Entry Fee (₹)</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.entry_fee ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        entry_fee: numberOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Advance Fee (₹)</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.advance_fee ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        advance_fee: numberOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Cash Prize Total (₹)</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.cash_prize_total ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        cash_prize_total: numberOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Slot Status *</label>
                  <select
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.slot_status}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        slot_status: e.target
                          .value as TournamentCategoryCreateData["slot_status"],
                      })
                    }
                  >
                    {slotStatusOptionsData.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rules, deadlines, contacts */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm">Registration Deadline</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.registration_deadline ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        registration_deadline: textOrNullService(
                          e.target.value
                        ),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Age Cutoff Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.age_cutoff_date ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        age_cutoff_date: textOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Match Days</label>
                  <input
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.match_days_text ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        match_days_text: textOrNullService(e.target.value),
                      })
                    }
                    placeholder="Sat–Sun"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Minimum Matches</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.min_matches ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        min_matches: numberOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Category Contact Name</label>
                  <input
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.contact_name ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        contact_name: textOrNullService(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Category Contact Phone</label>
                  <input
                    inputMode="tel"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.contact_phone ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        contact_phone: textOrNullService(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm">Prizes Description</label>
                  <textarea
                    className="w-full rounded-lg border px-3 py-2 min-h-[96px]"
                    value={c.prizes_text ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        prizes_text: textOrNullService(e.target.value),
                      })
                    }
                    placeholder="Trophies, medals, certificates, MVP award..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Rules & Instructions</label>
                  <textarea
                    className="w-full rounded-lg border px-3 py-2 min-h-[96px]"
                    value={c.rules_text ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        rules_text: textOrNullService(e.target.value),
                      })
                    }
                    placeholder="Reporting time, kit rules, ID checks, etc."
                  />
                </div>
              </div>

              {/* Team size / squad */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <label className="text-sm">Playing Team Size</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.playing_team_size ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        playing_team_size: numberOrNullService(e.target.value),
                      })
                    }
                    placeholder="7"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Total Team Size</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.total_team_size ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        total_team_size: numberOrNullService(e.target.value),
                      })
                    }
                    placeholder="11"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Min Players</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.min_players ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        min_players: numberOrNullService(e.target.value),
                      })
                    }
                    placeholder="7"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Max Players</label>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-lg border px-3 py-2"
                    value={c.max_players ?? ""}
                    onChange={(e) =>
                      updateCategoryService(index, {
                        max_players: numberOrNullService(e.target.value),
                      })
                    }
                    placeholder="12"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-lg border px-4 py-2"
          disabled={isSubmitting}
          onClick={submitTournamentService}
        >
          {isSubmitting ? "Creating..." : "Create Tournament"}
        </button>

        {!canSubmit ? (
          <p className="text-sm text-muted-foreground">
            Fill required fields marked with *
          </p>
        ) : null}
      </div>
    </div>
  );
}
