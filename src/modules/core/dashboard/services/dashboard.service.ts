import { getSession } from "@/modules/auth/auth/services/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface NetPayData {
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
  
  // 1. Fetch Latest Net Pay
  let netPay: NetPayData | null = null;
  try {
    const payRes = await fetch(`${API_BASE}/items/payroll_run_employee?filter[user_id][_eq]=${userId}&sort=-cutoff_end&limit=1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 }
    });
    if (payRes.ok) {
      const { data } = await payRes.json();
      if (data && data.length > 0) {
        netPay = {
          net_pay: parseFloat(data[0].net_pay || "0"),
          cutoff_end: data[0].cutoff_end || ""
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch net pay:", error);
  }

  // 2. Fetch User to get department_id
  let departmentId: number | null = null;
  try {
    // We assume the id matches because we fetch the list with filter
    const userRes = await fetch(`${API_BASE}/items/user?filter[user_id][_eq]=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
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
      headers: { "Content-Type": "application/json" }
    });
    
    let hasOncall = false;
    if (oncallListRes.ok) {
      const { data } = await oncallListRes.json();
      if (data && data.length > 0) {
        const deptSchedId = data[0].dept_sched_id;
        
        const oncallSchedRes = await fetch(`${API_BASE}/items/oncall_schedule/${deptSchedId}`, {
           method: "GET",
           headers: { "Content-Type": "application/json" }
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
        headers: { "Content-Type": "application/json" }
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
    netPay,
    schedule
  };
}
