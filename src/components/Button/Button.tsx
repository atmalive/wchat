import React from "react";

interface ButtonProps {
    isLoading?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ isLoading, onClick, children }) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={isLoading}
            className={` text-[#fff] px-4 py-2 rounded-lg shadow-md transition 
                ${isLoading ? "opacity-50 cursor-not-allowed bg-gray-500" : "bg-[#3B9702] hover:opacity-80 hover:shadow-lg active:shadow-sm cursor-pointer"}`}>
            {children}
        </button>
    );
};
