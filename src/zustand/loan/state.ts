import {getLocalItems} from "@/utils/store";
import {SelectedLoanType} from "@/DTO";

let selectedLoan: SelectedLoanType[] = [];

if (
  JSON.parse(getLocalItems("selectedLoan") + "") != null &&
  JSON.parse(getLocalItems("selectedLoan") + "") != ""
) {
  selectedLoan = JSON.parse(getLocalItems("selectedLoan") + "");
}

export const initialState: SelectedLoanType[] = [...selectedLoan];
