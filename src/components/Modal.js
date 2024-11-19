export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      {children}
    </div>
  );
};
