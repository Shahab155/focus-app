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
    <div className="mt-6 flex flex-col gap-3">
      <form id="add-avoid-form" action={action} className="flex gap-2">
        <input
          name="name"
          placeholder="New distraction to avoid..."
          required
          className="flex-1 min-w-0 h-10 px-4 bg-[#1f2937] border border-white/5 rounded-[8px] text-[14px] text-white placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#d97706]/20 focus:border-[#d97706] transition-all outline-none font-medium"
        />
        <button
          type="submit"
          disabled={isPending}
          className="h-10 px-4 bg-transparent border border-[#d97706] text-[#d97706] rounded-[8px] text-[12px] font-semibold uppercase tracking-tight transition-all hover:bg-[#d97706]/10 active:scale-95 disabled:opacity-50"
        >
          {isPending ? "..." : "Add"}
        </button>
      </form>
    </div>
  );
}
