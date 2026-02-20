// export interface Transaction {
//  id: string;
//  customer: string;
//  amount: number;
//  channel: string;
//  timestamp: string;
//  location:string;
//  risk: 'LOW' | 'MEDIUM' | 'HIGH';
//  status: 'completed' | 'pending' | 'flagged' | 'blocked';
// } 
export interface Transaction {
  id: number; // Database IDs are usually numbers
  sender: {
    id: number;
    username: string;
    name?: string;
  };
  recipient: {
    id: number;
    username: string;
  };
  amount: number;
  channel: string;
  createdAt: string; // Matches created_at in DB
  location?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'; // Matches risk_level in DB
  status: string;
}