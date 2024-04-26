import Link from "next/link";
import React from "react";

export const KnowledgeButton = () => {
  return (
    <div className="mb-5 flex justify-end">
    <Link href="/knowledge">
      <div className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900">
        Database Access
      </div>
    </Link>
  </div>
  );
};
