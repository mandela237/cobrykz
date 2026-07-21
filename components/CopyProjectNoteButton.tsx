"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyProjectNoteButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyNote = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button type="button" onClick={copyNote} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-current/20 px-4 text-[13px] font-semibold transition-colors hover:bg-white/10">
      {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      {copied ? "Project note copied" : "Copy project note"}
    </button>
  );
}
