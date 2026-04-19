"use client";

import { Toaster } from "sonner";

export function StudyToaster() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        classNames: {
          toast: "border border-border-dark bg-surface text-warm-white"
        }
      }}
    />
  );
}
