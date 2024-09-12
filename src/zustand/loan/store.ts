import {create} from "zustand";
import {initialState} from "./state";
import {SelectedLoanType} from "@/DTO";
import {setLocalItems} from "@/utils/store";

interface selectedLoanState {
  selectedLoanList: SelectedLoanType[];
  selectedLoanId: (id: string) => SelectedLoanType | undefined;
  setSelectedLoanList: (SelectedLoan: SelectedLoanType) => void;
}

const useLoanStore = create<selectedLoanState>((set) => ({
  selectedLoanList: initialState as SelectedLoanType[],

  selectedLoanId: (id: string) => {
    return initialState.find((el) => el.loan?.id === id);
  },

  setSelectedLoanList: (SelectedLoan: SelectedLoanType) => {
    set((state) => {
      const oldLoan = state.selectedLoanList.find(
        (el) => el.loan?.id === SelectedLoan.loanId,
      );

      let updatedList: SelectedLoanType[] = [];

      if (oldLoan) {
        // if have old Loan in end status dont change list
        if (oldLoan.status === "end") {
          updatedList = [...state.selectedLoanList];
        } else {
          // if have old Loan in in_progress status just update old loan
          updatedList = [
            ...state.selectedLoanList.filter(
              (el) => el.loan?.id !== SelectedLoan.loanId,
            ),
            {...oldLoan, ...SelectedLoan},
          ];
        }
      } else {
        // if dont have old loan add to list
        updatedList = [...state.selectedLoanList, SelectedLoan];
      }

      // persist to localStorage
      setLocalItems("selectedLoan", JSON.stringify(updatedList));

      return {
        selectedLoanList: updatedList,
      };
    });
  },
}));

export default useLoanStore;
