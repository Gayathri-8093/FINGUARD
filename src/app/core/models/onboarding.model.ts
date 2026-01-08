export interface OnboardingApplication {
  applicationId: string;
  name: string;
  email:string;
  mobile: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}