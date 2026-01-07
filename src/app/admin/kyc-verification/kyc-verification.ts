import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface KycRecord {
  id: string;
  customer: string;
  email: string;
  mobile: string;
  date:string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-kyc-verification',
  imports: [CommonModule, FormsModule],
  templateUrl: './kyc-verification.html',
  styleUrl: './kyc-verification.css',
})
export class KycVerification {
  view: 'list' | 'review' = 'list';
  selectedKyc?: KycRecord;
  remarks = '';
 
  kycList: KycRecord[] = [
    {
      id: 'KYC-001',
      customer: 'Alice Johnson',
      email: 'alice@example.com',
      mobile: '+1 234-567-8901',
      date: '2024-12-27',
      status: 'Pending'
    },
    {
      id: 'KYC-002',
      customer: 'Bob Smith',
      email: 'bob@example.com',
      mobile: '+1 234-567-8902',
      date: '2024-12-26',
      status: 'Approved'
    }
  ];
 
  reviewKyc(kyc: KycRecord) {
    this.selectedKyc = kyc;
    this.view = 'review';
  }
 
  approve() {
    if (!this.selectedKyc) return;
    this.selectedKyc.status = 'Approved';
    alert('KYC Approved');
    this.back();
  }
 
  reject() {
    if (!this.remarks) {
      alert('Remarks required');
      return;
    }
    if (!this.selectedKyc) return;
    this.selectedKyc.status = 'Rejected';
    alert('KYC Rejected');
    this.back();
  }
 
  back() {
    this.view = 'list';
    this.remarks = '';
    this.selectedKyc = undefined;
  }
}
