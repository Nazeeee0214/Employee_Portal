import { getSession } from "@/modules/auth/auth/services/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SalaryData {
  gross_pay: number;
  net_pay: number;
  cutoff_end: string;
}

export interface ScheduleData {
  work_start: string;
  work_end: string;
  workdays_note?: string;
  workdays?: string;
}

export async function fetchDashboardData() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const userId = session.userId;
  
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.DIRECTUS_API_BASE_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.DIRECTUS_API_BASE_TOKEN}`;
  }
  
  // 1. Calculate Estimated Salary based on attendance logs and wage management
  let salaryData: SalaryData | null = null;
  try {
    
    // a. Fetch current open cutoff
    const cutoffRes = await fetch(`${API_BASE}/items/cutoff_settings?filter[period_status][_eq]=OPEN&limit=1`, { headers });
    let currentCutoff: any = null;
    if (cutoffRes.ok) {
      const { data } = await cutoffRes.json();
      if (data && data.length > 0) currentCutoff = data[0];
    }

    // b. Fetch daily wage
    const wageRes = await fetch(`${API_BASE}/items/user_wage_management?filter[user_id][_eq]=${userId}&limit=1`, { headers });
    let dailyWage = 0;
    if (wageRes.ok) {
      const { data } = await wageRes.json();
      if (data && data.length > 0) dailyWage = parseFloat(data[0].daily_wage || "0");
    }

    if (currentCutoff && dailyWage > 0) {
      // c. Fetch attendance logs within cutoff
      const start = currentCutoff.start_date;
      const end = currentCutoff.end_date;
      const attRes = await fetch(`${API_BASE}/items/attendance_log?filter[user_id][_eq]=${userId}&filter[log_date][_gte]=${start}&filter[log_date][_lte]=${end}`, { headers });
      
      let estimatedGrossPay = 0;
      if (attRes.ok) {
        const { data } = await attRes.json();
        let daysWorked = 0;
        data?.forEach((log: any) => {
          if (log.status === "Half Day") {
            daysWorked += 0.5;
          } else if (log.status !== "Absent") {
            // Treat "On Time", "Late", "Incomplete", "Leave", "Holiday" as 1 day
            daysWorked += 1;
          }
        });
        estimatedGrossPay = daysWorked * dailyWage;
      }
      
      salaryData = {
        gross_pay: estimatedGrossPay,
        net_pay: 0,
        cutoff_end: currentCutoff.end_date || ""
      };
    }
  } catch (error) {
    console.error("Failed to calculate estimated salary data:", error);
  }

  // 2. Fetch User to get department_id
  let departmentId: number | null = null;
  try {
    // We assume the id matches because we fetch the list with filter
    const userRes = await fetch(`${API_BASE}/items/user?filter[user_id][_eq]=${userId}`, {
      method: "GET",
      headers
    });
    if (userRes.ok) {
      const { data } = await userRes.json();
      if (data && data.length > 0) {
        departmentId = data[0].user_department || null;
      }
    }
  } catch (error) {
    console.error("Failed to fetch user department:", error);
  }

  // 3. Fetch Schedule
  let schedule: ScheduleData | null = null;
  try {
    // Check Oncall
    const oncallListRes = await fetch(`${API_BASE}/items/oncall_list?filter[user_id][_eq]=${userId}`, {
      method: "GET",
      headers
    });
    
    let hasOncall = false;
    if (oncallListRes.ok) {
      const { data } = await oncallListRes.json();
      if (data && data.length > 0) {
        const deptSchedId = data[0].dept_sched_id;
        
        const oncallSchedRes = await fetch(`${API_BASE}/items/oncall_schedule/${deptSchedId}`, {
           method: "GET",
           headers
        });
        if (oncallSchedRes.ok) {
          const { data: schedData } = await oncallSchedRes.json();
          if (schedData) {
            schedule = {
              work_start: schedData.work_start,
              work_end: schedData.work_end,
              workdays: schedData.workdays // format: "Monday,Tuesday..."
            };
            hasOncall = true;
          }
        }
      }
    }

    // Fallback to Department Schedule
    if (!hasOncall && departmentId) {
      const deptSchedRes = await fetch(`${API_BASE}/items/department_schedule?filter[department_id][_eq]=${departmentId}&limit=1`, {
        method: "GET",
        headers
      });
      if (deptSchedRes.ok) {
         const { data } = await deptSchedRes.json();
         if (data && data.length > 0) {
           schedule = {
             work_start: data[0].work_start,
             work_end: data[0].work_end,
             workdays_note: data[0].workdays_note // format: "Mon-Sat"
           };
         }
      }
    }
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
  }

  return {
    salaryData,
    schedule
  };
}
