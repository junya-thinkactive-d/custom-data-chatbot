"use client";

import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const KnowledgeNew = () => {
  const [text, setText] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const body = JSON.stringify({ text });
    const response = await fetch("/api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      alert("Failed to create knowledge");
      setLoading(false);
      return;
    }

    setMessage("");
    setText([]);
    router.refresh();
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-3 text-center text-xl font-bold">New Knowledge</div>
      <div>テキストをデーターベース入力します</div>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none"
            rows={10}
            value={text.join("\n")}
            onChange={(e) => setText(e.target.value.split("\n"))}
            disabled={loading}
          />
        </div>

        <div className="my-5 text-center font-bold text-red-500">{message}</div>

        <div className="mb-5 flex justify-center">
          {loading ? (
            <Loading />
          ) : (
            <button
              className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
              type="submit"
              disabled={loading}
            >
              追加する
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
