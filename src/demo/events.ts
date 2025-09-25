import type { Event } from "../types/types";

type EventType = "social" | "course" | "networking" | "digital";

const titlesByType: Record<EventType, string[]> = {
  social: ["Social Meetup", "Morning Yoga Social", "Weekend Social", "Evening Social", "Festival"],
  course: ["Course Session", "Bootcamp", "Workshop", "Campus Tour", "Review Class"],
  networking: ["Networking Mixer", "Panel", "Lunch", "Roundtable", "Conference"],
  digital: ["Digital Sprint", "Hackathon", "Demo", "Product Lab", "Strategy Session"]
};

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateEvents(count = 40): Event[] {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const events: Event[] = [];

  for (let i = 0; i < count; i++) {
    // Pick a month offset: -1, 0, +1 to include prev/next month
    const monthOffset = randomChoice([-1, 0, 0, 0, 1]); // bias towards current month
    const eventMonth = month + monthOffset;

    // Random start day/time
    const startDay = randomInt(1, 28); // safe range
    const startHour = randomInt(6, 20);
    const startMinute = [0, 15, 30, 45][randomInt(0, 3)];

    // Random duration (hours or days)
    const durationDays = randomChoice([0, 0, 1, 2, 3]); // some multi-day events
    const durationHours = randomInt(1, 6);

    const start = new Date(year, eventMonth, startDay, startHour, startMinute);
    const end = new Date(
      year,
      eventMonth,
      startDay + durationDays,
      startHour + durationHours,
      startMinute
    );

    const type = randomChoice(["social", "course", "networking", "digital"] as const);
    const title = randomChoice(titlesByType[type]);

    events.push({
      id: String(i + 1),
      title,
      start,
      end,
      type,
      link: "https://example.com/event" + (i + 1),
      locationName: "Location " + (i + 1)
    });
  }

  // Add at least one ongoing event crossing months
  events.push({
    id: String(events.length + 1),
    title: "Ongoing Challenge",
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 15),
    type: "social",
    link: "https://example.com/ongoing",
    locationName: "Online"
  });

  return events;
}

// Usage:
export const events = generateEvents();
