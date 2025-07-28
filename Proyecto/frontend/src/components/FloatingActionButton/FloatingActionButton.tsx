import React from "react";
import "./FloatingActionButton.css";

interface FloatingActionButtonProps {
  onClick: () => void;
  isConfirmMode?: boolean;
  confirmText?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick
}) => {


  return (
    <button
      className="floating-action-button"
      onClick={onClick}
      title="Agregar nueva ruta"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2V22M2 12H22"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default FloatingActionButton;
