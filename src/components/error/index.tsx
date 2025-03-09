import React from "react";
import "./error.scss";

interface ErrorComponentProps {
  message: string;
}

const Error: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;