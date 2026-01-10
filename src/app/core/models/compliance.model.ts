export interface SummaryCard {
  title: string;
  value: string | number;
  sub?: string;
}
 
export interface AuditLog {
  time: string;
  user: string;
  action: string;
  module: string;
  details: string;
  ip: string;
}