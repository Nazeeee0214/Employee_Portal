"use server";

import { getSession } from "@/modules/auth/auth/services/auth";
import { revalidatePath } from "next/cache";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const directusToken = process.env.DIRECTUS_API_BASE_TOKEN;

function getHeaders(extra: Record<string, string> = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extra,
  };
  if (directusToken) {
    headers["Authorization"] = `Bearer ${directusToken}`;
  }
  return headers;
}

// Anti-DDoS Rate Limiter (5 seconds per action)
const rateLimitCache = new Map<number, number>();

function isRateLimited(userId: number): boolean {
  const now = Date.now();
  const lastRequest = rateLimitCache.get(userId);
  if (lastRequest && now - lastRequest < 5000) return true;
  rateLimitCache.set(userId, now);
  return false;
}

async function getUserDepartment(userId: number) {
  try {
    const res = await fetch(`${API_BASE}/items/user?filter[user_id][_eq]=${userId}`, {
      method: "GET",
      headers: getHeaders()
    });
    if (res.ok) {
      const { data } = await res.json();
      return data?.[0]?.user_department || null;
    }
  } catch (error) {
    console.error("Failed to fetch user department", error);
  }
  return null;
}

function getMinutesDiff(startStr: string, endStr: string) {
  if (!startStr || !endStr) return 0;
  const [h1, m1] = startStr.split(':').map(Number);
  const [h2, m2] = endStr.split(':').map(Number);
  
  const d1 = new Date(); d1.setHours(h1, m1, 0, 0);
  const d2 = new Date(); d2.setHours(h2, m2, 0, 0);
  
  if (d2 < d1) d2.setDate(d2.getDate() + 1);

  return Math.floor((d2.getTime() - d1.getTime()) / 60000);
}

function formatTime(val: string | null) {
  if (!val) return val;
  if (val.split(':').length === 2) return `${val}:00`;
  return val;
}

function getDaysDiff(startStr: string, endStr: string) {
  if (!startStr || !endStr) return 0;
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays + 1 : 0; 
}

export async function submitLeaveRequest(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");
  if (isRateLimited(session.userId)) {
    throw new Error("You are submitting requests too quickly. Please wait 5 seconds and try again.");
  }

  const attachmentId = formData.get("attachment_id") as string | null;

  const start = formData.get("leave_start") as string;
  const end = formData.get("leave_end") as string;
  const totalDays = getDaysDiff(start, end);
  const departmentData = await getUserDepartment(session.userId);
  const departmentId = departmentData ? Number(departmentData) : null;

  const payload = {
    user_id: session.userId,
    department_id: departmentId,
    leave_type: formData.get("leave_type") as string,
    leave_start: start,
    leave_end: end,
    total_days: totalDays,
    reason: formData.get("reason") as string,
    emp_attatchment_uuid: attachmentId || null,
    status: "pending",
  };

  const res = await fetch(`${API_BASE}/items/leave_request`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Directus Leave Error Details:", errText, "Payload:", payload);
    throw new Error(`Failed to submit Leave request: ${errText}`);
  }
  
  const recordData = await res.json();
  
  revalidatePath("/");
  return { success: true };
}

export async function submitOvertimeRequest(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");
  if (isRateLimited(session.userId)) {
    throw new Error("You are submitting requests too quickly. Please wait 5 seconds and try again.");
  }

  const attachmentId = formData.get("attachment_id") as string | null;

  const from = formData.get("ot_from") as string;
  const to = formData.get("ot_to") as string;
  const duration = getMinutesDiff(from, to);
  const departmentData = await getUserDepartment(session.userId);
  const departmentId = departmentData ? Number(departmentData) : null;

  const payload = {
    user_id: session.userId,
    department_id: departmentId,
    request_date: formData.get("request_date") as string,
    sched_timeout: formatTime(formData.get("sched_timeout") as string),
    ot_from: formatTime(from),
    ot_to: formatTime(to),
    duration_minutes: duration,
    purpose: formData.get("purpose") as string,
    emp_attatchment_uuid: attachmentId || null, 
    status: "pending",
  };

  const res = await fetch(`${API_BASE}/items/overtime_request`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Directus Overtime Error Details:", errText, "Payload:", payload);
    throw new Error(`Failed to submit Overtime request: ${errText}`);
  }

  const recordData = await res.json();

  revalidatePath("/");
  return { success: true };
}

export async function submitUndertimeRequest(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");
  if (isRateLimited(session.userId)) {
    throw new Error("You are submitting requests too quickly. Please wait 5 seconds and try again.");
  }

  const attachmentId = formData.get("attachment_id") as string | null;

  const sched = formData.get("sched_timeout") as string;
  const actual = formData.get("actual_timeout") as string;
  const duration = getMinutesDiff(actual, sched); // Undertime is difference from actual to sched
  const departmentData = await getUserDepartment(session.userId);
  const departmentId = departmentData ? Number(departmentData) : null;

  const payload = {
    user_id: session.userId,
    department_id: departmentId,
    request_date: formData.get("request_date") as string,
    sched_timeout: formatTime(sched),
    actual_timeout: formatTime(actual),
    duration_minutes: duration > 0 ? duration : 0,
    reason: formData.get("reason") as string,
    emp_attatchment_uuid: attachmentId || null, 
    status: "pending",
  };

  const res = await fetch(`${API_BASE}/items/undertime_request`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Directus Undertime Error Details:", errText, "Payload:", payload);
    throw new Error(`Failed to submit Undertime request: ${errText}`);
  }

  const recordData = await res.json();

  revalidatePath("/");
  return { success: true };
}
