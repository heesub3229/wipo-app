import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Header from "../main/Header";
import LedgerTop from "./LedgerTop";
import LedgerMid from "./LedgerMid";
import { Modal } from "../../components/Modal";
import LedgerModal from "./LedgerModal";

export default function LedgerMain() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="min-h-screen w-screen bg-back flex justify-center items-center">
      <Header />
      <div className="flex-grow flex justify-center items-center pt-10vh">
        <div className="w-4/5 min-h-[90vh] bg-white rounded-t-lg p-10">
          <LedgerTop />
        </div>
      </div>
      <div
        className="fixed bottom-6 right-10 text-3xl p-2 rounded-full text-white bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
        onClick={() => handleOpenModal()}
      >
        <FaPlus />
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <LedgerModal />
      </Modal>
    </div>
  );
}
