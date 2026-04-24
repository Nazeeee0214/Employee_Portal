import { z } from "zod";

export const ApprovalStepSchema = z.object({
  id: z.string(),
  label: z.string(),
  approver: z.string(),
  status: z.enum(["Approved", "Pending", "Future", "Rejected"]),
  date: z.string().optional(),
  time: z.string().optional(),
  comment: z.string().optional(),
});

export type ApprovalStep = z.infer<typeof ApprovalStepSchema>;

export const RequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["Processing", "Approved", "Rejected", "Withdrawn"]),
  date: z.string(),
  amount: z.number().optional(),
  category: z.string().optional(),
  duration: z.string().optional(),
  progress: z.number(), // Percentage
  trail: z.array(ApprovalStepSchema).optional(),
});

export type UserRequest = z.infer<typeof RequestSchema>;
