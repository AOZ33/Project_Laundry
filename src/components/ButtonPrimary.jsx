import React from "react";
import { Button } from "@nextui-org/react";

const ButtonPrimary = ({ text, className, to, children, onClick, type = "button", ...props }) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      className={`bg-[#8c7851] text-white mb-4
      hover:bg-white hover:text-[#8c7851] hover:border hover:border-[#8c7851]
      ${className}`}
      css={{ cursor: to ? 'pointer' : 'default' }} 
      {...props}
      as={to ? 'a' : 'button'} 
      href={to} 
    >
      {children}
      {text}
    </Button>
  );
};

export default ButtonPrimary;
