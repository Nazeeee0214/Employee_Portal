import { DashboardPage } from "@/modules/core/dashboard/DashboardPage";
import { fetchDashboardData } from "@/modules/core/dashboard/services/dashboard.service";

export default async function DashboardRoute() {
  const { netPay, schedule } = await fetchDashboardData();
  
  return <DashboardPage initialNetPay={netPay} initialSchedule={schedule} />;
}
