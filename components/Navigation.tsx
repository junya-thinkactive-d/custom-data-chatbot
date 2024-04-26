"use client";
import Link from "next/link";
import React from "react";

export const Navigation = () => {
  return (
    <header className="border-b py-5">
      <div className="text-center">
        <Link href="/" className="cursor-pointer text-xl font-bold">
          Custom Data Chatbot
        </Link>
      </div>
    </header>
  );
};
