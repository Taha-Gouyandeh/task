export type CustomModalType = {
  showModal: boolean;
  setShowModal: (...args: boolean[]) => void;
  children: React.ReactNode;
};
