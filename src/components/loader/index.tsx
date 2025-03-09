import React from "react";
import { CircularProgress } from "@mui/material";
import "./loader.scss"; 

interface LoadingProps {
  size?: number;
  thickness?: number;
  color?: "primary" | "secondary" | "inherit";
}

const Loading: React.FC<LoadingProps> = ({ size = 50, thickness = 5, color = "primary" }) => {
  return (
    <div className="loading-container">
      <CircularProgress size={size} thickness={thickness} color={color} />
    </div>
  );
};

export default Loading;
