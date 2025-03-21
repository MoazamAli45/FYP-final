"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface HeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonIconPath: string;
  onButtonClick?: any;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  buttonText,
  buttonIconPath,
  onButtonClick,
  children,
}) => {
  return (
    <div className="flex flex-col my-2">
      <div className="flex flex-col sm:flex-row sm:justify-between space-y-5 sm:items-center py-4">
        <div className="">
          <h1 className="text-text-primary-foreground font-[700] text-[32px]">
            {title}
          </h1>
          <p className="text-text-quaternary text-[16px]">{subtitle}</p>
        </div>
        <div className="">
          <Button
            className={`bg-primary ${
              buttonText.toLowerCase() === "export statistics" ||
              buttonText.toLowerCase() == ""
                ? "!hidden"
                : "flex"
            } w-full sm:w-auto text-white text-[16px] font-[500] py-7 px-5 rounded-[8px]  items-center space-x-2`}
            onClick={onButtonClick}
          >
            <span>{buttonText}</span>
            <Image src={buttonIconPath} alt="" height={24} width={24} />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
