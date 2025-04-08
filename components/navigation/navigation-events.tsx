"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NavigationEventsContent() {
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

export function NavigationEvents() {
  return (
    <Suspense fallback={null}>
      <NavigationEventsContent />
    </Suspense>
  );
}
