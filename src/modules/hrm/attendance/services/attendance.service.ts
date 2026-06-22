"use server";

import { getSession } from "@/modules/auth/auth/services/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface AttendanceLogEntry {
  id: string | number;
  date: string;
  clockIn: string;
  clockOut: string;
  hours: string;
  status: string;
}

export async function fetchRecentLogs(offset = 0): Promise<AttendanceLogEntry[]> {
  const session = await getSession();
  if (!session || !session.userId) return [];

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.DIRECTUS_API_BASE_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.DIRECTUS_API_BASE_TOKEN}`;
    }

    const res = await fetch(`${API_BASE}/items/attendance_log?filter[user_id][_eq]=${session.userId}&sort=-log_date&limit=10&offset=${offset}`, {
      method: "GET",
      headers,
      next: { revalidate: 60 }
    });

    if (!res.ok) return [];
    const { data } = await res.json();
    
    return data.map((log: any) => {
      let hours = "00:00";
      let clockIn = "-- : --";
      let clockOut = "-- : --";

      if (log.time_in) {
        const dIn = new Date(log.time_in);
        clockIn = dIn.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
        
        if (log.time_out) {
          const dOut = new Date(log.time_out);
          clockOut = dOut.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
          const diffMs = dOut.getTime() - dIn.getTime();
          if (diffMs > 0) {
             const h = Math.floor(diffMs / 3600000);
             const m = Math.floor((diffMs % 3600000) / 60000);
             hours = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
          }
        }
      }

      const dDate = new Date(log.log_date);
      const formattedDate = dDate.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });

      return {
        id: log.log_id,
        date: formattedDate,
        clockIn,
        clockOut,
        hours,
        status: log.status || "Regular"
      };
    });
  } catch (err) {
    console.error("Failed to fetch attendance logs", err);
    return [];
  }
}
