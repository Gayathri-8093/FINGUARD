export interface SummaryCard {
  title: string;
  value: string | number;
  sub?: string;
}
 
export interface AuditLog {
  id?:number;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
}