export interface OnboardingApplication {
  applicationId: string;    
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  panCard: string;          
  aadhaarFront: string;     
  aadhaarBack: string;      
  photo: string;            
  status: string;           
  balance?: number;         
  createdAt?: string;
}
 