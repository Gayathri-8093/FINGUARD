export interface Alert {
  id: string;
  type: string;
  customer: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  status: 'open' | 'in-progress' | 'closed';
  description: string;
}