export type CustomModal = {
  showModal: boolean;
  setShowModal: (...args: boolean[]) => void;
  children: React.ReactNode;
};
