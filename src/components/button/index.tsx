import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  title,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn--${variant}`]} ${
        styles[`btn--${size}`]
      }`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
