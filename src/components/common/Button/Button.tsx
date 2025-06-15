import React from "react";
import { motion } from "framer-motion";
import "./Button.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "text"
  | "icon"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <motion.button
      className={`button ${variant} ${size} ${
        fullWidth ? "full-width" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}>
      {isLoading ? (
        <div className="loading-spinner" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="icon">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="icon">{icon}</span>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
