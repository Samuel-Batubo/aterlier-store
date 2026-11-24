"use client";

import { useState } from "react";

/** UI only: sign-up is not connected to a mailing provider yet. */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p role="status" className="text-body text-paper/70">
        Newsletter sign-up isn’t connected yet. This form is a placeholder.
      </p>
    );
  }

  return (
    <form
      className="flex w-full max-w-md items-end gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="flex-1">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="w-full border-0 border-b border-paper/40 bg-transparent px-0 py-3 text-body text-paper outline-none focus:border-paper"
        />
      </label>
      <button type="submit" className="btn btn-inverse min-h-11 px-6">
        Subscribe
      </button>
    </form>
  );
}
