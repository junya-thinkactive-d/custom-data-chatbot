"use client";

import Loading from "@/app/loading";
import React, { useState } from "react";

export const Ask = () => {
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question) {
      alert("質問を入力してください");
      return;
    }
    setLoading(true);
    setAnswer("");

    const body = JSON.stringify({ query: question.replace(/\n/g, " ") });
    const response = await fetch("/api/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      setAnswer("エラーが発生しました");
      setLoading(false);
      return;
    }

    const data = response.body;

    if (!data) {
      setAnswer("回答がありません");
      setLoading(false);
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      setAnswer((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mb-3 text-center text-xl font-bold">Ask</div>
      <div>質問をします</div>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="質問を入力してください"
            disabled={loading}
            required
          />
        </div>

        <div className="my-5 text-center font-bold text-red-500">{message}</div>

        <div className="mb-5 flex justify-center">
          {loading ? (
            <Loading />
          ) : (
            <button
              className="rounded-lg bg-blue-400 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              type="submit"
              disabled={loading}
            >
              質問する
            </button>
          )}
        </div>
      </form>
      {answer && <div>{answer}</div>}
    </div>
  );
};
