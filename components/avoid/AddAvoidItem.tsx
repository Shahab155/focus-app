"use client";

import { useState } from "react";
import { createAvoidItem } from "@/lib/actions/avoid";

export function AddAvoidItem() {
  const [isPending, setIsPending] = useState(false);

  async function action(formData: FormData) {
    setIsPending(true);
    await createAvoidItem(formData);
    (document.getElementById("add-avoid-form") as HTMLFormElement)?.reset();
    setIsPending(false);
  }

  return (
    <form id="add-avoid-form" action={action} className="mt-6 flex gap-4">
      <input
        name="name"
        placeholder="What should you avoid today?"
        required
        className="flex-1 min-w-0 h-12 px-6 bg-bg-main border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none font-semibold shadow-inner"
      />
      <button
        type="submit"
        disabled={isPending}
        className="h-12 px-8 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 border border-red-500/30 hover:border-red-500 shadow-lg shadow-red-500/5 active:scale-95 shrink-0"
      >
        {isPending ? "Adding..." : "Mark Distraction"}
      </button>
    </form>
  );
}
