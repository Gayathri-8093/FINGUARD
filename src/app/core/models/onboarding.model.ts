export interface OnboardingApplication {
  applicationId: string;    // Primary Key (e.g., KYCE07FA)
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  panCard: string;          // Filename from upload
  aadhaarFront: string;     // Filename from upload
  aadhaarBack: string;      // Filename from upload
  photo: string;            // Filename from upload
  status: string;           // PENDING, APPROVED, REJECTED
  balance?: number;         // Initialized in DB
  createdAt?: string;
}
 