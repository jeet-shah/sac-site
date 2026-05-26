import type { Event } from "@/types/event.types";

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Inter-BITS Football Tournament",
    slug: "interbits-football",
    description:
      "Annual inter-campus football championship.",
    startDate: "2026-06-12",
    venue: "Main Football Ground",
    isFeatured: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
  },

  {
    id: 2,
    title: "SAC Fitness Challenge",
    slug: "fitness-challenge",
    description:
      "Campus-wide endurance and strength challenge.",
    startDate: "2026-07-01",
    venue: "SAC Gym",
    isFeatured: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a",
  },

  {
    id: 3,
    title: "Swimming Championship",
    slug: "swimming-championship",
    description:
      "Competitive swimming meet hosted by SAC Goa.",
    startDate: "2026-08-05",
    venue: "Aquatics Complex",
    isFeatured: false,
    coverImageUrl:
      "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8",
  },
];