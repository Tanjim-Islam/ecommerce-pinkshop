"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams ? "?" + searchParams : ""}`;

    // Create a custom event for page changes
    const pageChangeEvent = new CustomEvent("pagechange", {
      detail: { url },
    });

    // Dispatch the event
    window.dispatchEvent(pageChangeEvent);
  }, [pathname, searchParams]);

  return null;
}
