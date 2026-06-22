import { AttendancePage } from "@/modules/hrm/attendance/AttendancePage";
import { fetchRecentLogs } from "@/modules/hrm/attendance/services/attendance.service";

export default async function AttendanceRoute() {
  const logs = await fetchRecentLogs();
  return <AttendancePage initialLogs={logs} />;
}
