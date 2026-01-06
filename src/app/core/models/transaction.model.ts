export interface Transaction {
 id: string;
 customer: string;
 amount: number;
 channel: string;
 timestamp: string;
 location:string;
 risk: 'LOW' | 'MEDIUM' | 'HIGH';
 status: 'completed' | 'pending' | 'flagged' | 'blocked';
} 