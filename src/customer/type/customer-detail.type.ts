interface LectureMember {
  memberId: number;
  memberRegistrationDate: Date;
  memberDeletedAt: Date | null;
}

interface Lecture {
  lectureId: number;
  lectureTitle: string;
  lectureLevel: string;
  lectureDays: string;
  lectureTime: string;
  lectureAmount: string;
  lectureCreatedAt: Date;
  lectureUpdatedAt: Date;
  lectureDeletedAt: Date | null;
  member: LectureMember[];
}

interface Payment {
  paymentId: number;
  paymentFee: string;
  paymentDate: string;
  paymentDeletedAt: Date | null;
}

interface CustomerInfo {
  customerId: number;
  name: string;
  gender: string | null;
  phoneNumber: string;
  birthDate: string;
  address: string;
  customerCreatedAt: Date;
  customerUpdatedAt: Date;
  customerDeletedAt: Date | null;
}

export interface CustomerDetail {
  customer: CustomerInfo;
  lecture: Lecture[];
  payment: Payment[];
}
