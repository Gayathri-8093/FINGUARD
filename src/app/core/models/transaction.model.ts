export interface Transaction {
  id: number; 
  sender: {
    id: number;
    username: string;
    name: string;
  };
  recipient: {
    id: number;
    username: string;
  };
  amount: number;
  channel: string;
  createdAt: string; 
  location?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'; 
  status: string;
}
export interface TransactionSummary {
  totalToday: number;
  pendingCount: number;
  blockedCount: number;
  totalAmount: number;
}