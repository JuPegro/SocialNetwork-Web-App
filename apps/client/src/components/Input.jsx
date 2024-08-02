import React from "react";

export const Input = ({ color, size, ...props }) => {
  const colorClasses = {
    primary: "text-white bg-blue-500",
    secondary: "text-black bg-gray-300",
    success: "text-white bg-green-500",
    danger: "text-white bg-red-500",
  };

  const sizeClasses = {
    small: "text-sm p-2",
    medium: "text-base p-3",
    large: "text-lg p-4",
  };
  return (
    <input
      className={`border rounded ${colorClasses[color]} ${sizeClasses[size]}`}
      {...props}
    />
  );
};
