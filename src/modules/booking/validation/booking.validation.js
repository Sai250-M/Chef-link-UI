import { z } from "zod";

export const EVENT_TYPES = [
  { value: "BIRTHDAY", label: "Birthday Party" },
  { value: "WEDDING", label: "Wedding" },
  { value: "HOUSEWARMING", label: "Housewarming" },
  { value: "ANNIVERSARY", label: "Anniversary" },
  { value: "BABY_SHOWER", label: "Baby Shower" },
  { value: "CORPORATE_EVENT", label: "Corporate Event" },
  { value: "PRIVATE_PARTY", label: "Private Party" },
  { value: "LIVE_COOKING", label: "Live Cooking" },
  { value: "FESTIVAL", label: "Festival" },
  { value: "OTHER", label: "Other" },
];

export const BOOKING_STATUS_CONFIG = {
  PENDING: { label: "Pending", color: "warning" },
  ACCEPTED: { label: "Accepted", color: "success" },
  REJECTED: { label: "Rejected", color: "error" },
  COMPLETED: { label: "Completed", color: "info" },
  CANCELLED: { label: "Cancelled", color: "default" },
};

const todayMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const bookingSchema = z
  .object({
    guest_name: z.string().min(2, "Name must be at least 2 characters"),
    guest_email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    guest_phone: z
      .string()
      .min(7, "Phone must be at least 7 characters")
      .max(20, "Phone is too long")
      .regex(/^[\d\s+\-()+]+$/, "Invalid phone format — use digits, spaces, +, -, or ()"),
    event_type: z.string().min(1, "Please select an event type"),
    event_date: z
      .string()
      .min(1, "Event date is required")
      .refine(
        (val) => {
          const selected = new Date(val);
          selected.setHours(0, 0, 0, 0);
          return selected >= todayMidnight();
        },
        "Event date must be today or in the future"
      ),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
    guest_count: z.coerce
      .number({ invalid_type_error: "Please enter a valid number" })
      .int("Must be a whole number")
      .min(1, "At least 1 guest is required"),
    budget: z.coerce
      .number({ invalid_type_error: "Please enter a valid number" })
      .positive("Budget must be a positive number"),
    currency: z.string().default("INR"),
    location: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().default("India"),
    special_requirements: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.start_time && data.end_time) {
        return data.end_time > data.start_time;
      }
      return true;
    },
    { message: "End time must be after start time", path: ["end_time"] }
  );
