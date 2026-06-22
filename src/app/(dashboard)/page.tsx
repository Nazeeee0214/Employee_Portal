import { DashboardPage } from "@/modules/core/dashboard/DashboardPage";
import { fetchDashboardData } from "@/modules/core/dashboard/services/dashboard.service";

export default async function DashboardRoute() {
  const { salaryData, schedule } = await fetchDashboardData();
  
  return <DashboardPage initialSalaryData={salaryData} initialSchedule={schedule} />;
}
