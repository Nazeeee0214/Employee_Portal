import { z } from "zod";

export const AttendanceLogSchema = z.object({
  id: z.string(),
  date: z.string(),
  clockIn: z.string().nullable(),
  clockOut: z.string().nullable(),
  totalHours: z.string(),
  status: z.enum(["Regular", "Late", "On Leave", "Holiday", "Absent"]),
});

export type AttendanceLog = z.infer<typeof AttendanceLogSchema>;

export const FilingSchema = z.object({
  type: z.enum(["Leave", "OT", "UT"]),
  leaveType: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string(),
  attachments: z.array(z.any()).optional(),
});

export type FilingRequest = z.infer<typeof FilingSchema>;
