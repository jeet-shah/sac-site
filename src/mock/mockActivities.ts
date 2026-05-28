import type { Activity } from "@/types/activity.types";

export const mockActivities: Activity[] = [
  {
    id: 1,
    name: "Basketball",
    slug: "basketball",
    category: "Sports",
    description:
      "Indoor basketball courts for practice sessions and tournaments.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    timings: [
      {
        dayOfWeek: 1,
        openTime: "06:00",
        closeTime: "22:00",
      },
    ],
  },

  {
    id: 2,
    name: "Football",
    slug: "football",
    category: "Sports",
    description:
      "Full-size football ground with evening floodlights.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    timings: [
      {
        dayOfWeek: 1,
        openTime: "05:30",
        closeTime: "21:00",
      },
    ],
  },

  {
    id: 3,
    name: "Swimming",
    slug: "swimming",
    category: "Fitness",
    description:
      "Olympic-standard swimming pool with training slots.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487",
    timings: [
      {
        dayOfWeek: 1,
        openTime: "06:00",
        closeTime: "20:00",
      },
    ],
  },

  {
    id: 4,
    name: "Gym",
    slug: "gym",
    category: "Fitness",
    description:
      "Fully equipped strength and conditioning gym.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    timings: [
      {
        dayOfWeek: 1,
        openTime: "05:00",
        closeTime: "23:00",
      },
    ],
  },

  {
    id: 5,
    name: "Badminton",
    slug: "badminton",
    category: "Sports",
    description:
      "Indoor badminton courts for casual and competitive play.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
    timings: [
      {
        dayOfWeek: 1,
        openTime: "07:00",
        closeTime: "22:00",
      },
    ],
  },
];