import { useEffect, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ isOpen, onClose, children }) => {
  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = "scroll";
    return currentScrollY;
  };

  const allowScroll = (prevScrollY) => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, prevScrollY);
  };

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      {isValidElement(children)
        ? cloneElement(children, { onClose }) // onClose를 children에 전달
        : children}
    </div>,
    document.body
  );
};
