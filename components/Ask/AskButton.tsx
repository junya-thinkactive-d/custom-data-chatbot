import Link from "next/link";
import React from "react";

export const AskButton = () => {
  return (
    <div className="mb-5 flex justify-end">
      <Link href="/ask">
        <div className="rounded-lg bg-blue-400 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
          AskPage Access
        </div>
      </Link>
    </div>
  );
};
