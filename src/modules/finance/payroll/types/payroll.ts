import { z } from "zod";

export const PayrollBreakdownSchema = z.object({
  earnings: z.array(z.object({
    label: z.string(),
    amount: z.number(),
    description: z.string().optional(),
  })),
  deductions: z.array(z.object({
    label: z.string(),
    amount: z.number(),
    description: z.string().optional(),
  })),
  employerPaid: z.array(z.object({
    label: z.string(),
    amount: z.number(),
  })),
  totalGross: z.number(),
  totalDeductions: z.number(),
  netPay: z.number(),
});

export type PayrollBreakdown = z.infer<typeof PayrollBreakdownSchema>;

export const PayrollLedgerSchema = z.object({
  id: z.string(),
  periodStart: z.string(),
  periodEnd: z.string(),
  ledgerNumber: z.string(),
  month: z.string(),
  grossAmount: z.number(),
  netAmount: z.number(),
  isExpanded: z.boolean().optional(),
  breakdown: PayrollBreakdownSchema.optional(),
});

export type PayrollLedger = z.infer<typeof PayrollLedgerSchema>;
