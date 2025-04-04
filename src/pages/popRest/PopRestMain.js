import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Header from "../main/Header";
import PopRestList from "./PopRestList";
import { Modal } from "../../components/Modal";
import PopRestModal from "./PopRestModal";
import { useDispatch } from "react-redux";
import { getRestList } from "../../api/RestApi";

export default function PopRestMain() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestList());
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="min-h-screen w-screen bg-back flex justify-center items-center">
      <Header />
      <div className="flex-grow flex justify-center items-center pt-7vh">
        <PopRestList />
      </div>
      <div
        className="fixed bottom-6 right-10 text-3xl p-2 rounded-full text-white bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
        onClick={() => handleOpenModal()}
      >
        <FaPlus />
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <PopRestModal />
      </Modal>
    </div>
  );
}
