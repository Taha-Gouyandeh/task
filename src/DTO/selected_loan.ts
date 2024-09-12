import {LoanType} from "@/DTO/loan";
import {UserInfoType} from "@/DTO/user_info";
import {BankInfoType} from "@/DTO/bank_info";
import {repaymentType} from "@/DTO/repayment";

export type SelectedLoanType = {
  loanId: string;
  loan?: LoanType;
  userInfo?: UserInfoType;
  bankInfo?: BankInfoType;
  status?: "end" | "in_progress";
  repaymentType?: repaymentType;
};
