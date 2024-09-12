import {repaymentType} from "@/DTO";

export type LoanType = {
  id: string;
  createdDate: string;
  name: string;
  repaymentType: repaymentType[];
  amount: number;
  percentageRate?: number;
  interestRate?: number;
  penaltyRate: number;
};
