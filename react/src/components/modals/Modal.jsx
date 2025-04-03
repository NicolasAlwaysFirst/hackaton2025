import React, { useRef } from "react";
import { motion } from "framer-motion";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);
  let mouseDownInside = false;

  const handleMouseDown = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      mouseDownInside = true;
    } else {
      mouseDownInside = false;
    }
  };

  const handleMouseUp = (e) => {
    // Если целевой элемент является <select> или вложен в него, не закрываем модалку
    if (e.target.closest("select")) {
      return;
    }

    if (!mouseDownInside) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <motion.div
        ref={modalRef}
        className="bg-white w-full max-h-[40vh] max-w-[80vw] p-4 rounded-t-2xl shadow-lg flex flex-col"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
