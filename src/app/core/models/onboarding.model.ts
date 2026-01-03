export interface OnboardingApplication {
  applicationId: string;
  name: string;
  mobile: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}