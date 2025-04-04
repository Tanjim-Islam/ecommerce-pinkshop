"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Function to handle route change start
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    // Function to handle route change complete
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    // Add event listeners for Next.js router events
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      // Only trigger for internal links (not external links or non-navigation clicks)
      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.target &&
        !anchor.hasAttribute("download") &&
        !anchor.classList.contains("no-transition")
      ) {
        setIsLoading(true);

        // Set a timeout to hide the loader in case navigation fails
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    // Listen for navigation events
    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handleRouteChangeStart);
    window.addEventListener("pageshow", handleRouteChangeComplete);

    // Custom event for when navigation is complete
    const handleNavigationComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Small delay to ensure smooth transition
    };

    window.addEventListener("pagechange", handleNavigationComplete);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handleRouteChangeStart);
      window.removeEventListener("pageshow", handleRouteChangeComplete);
      window.removeEventListener("pagechange", handleNavigationComplete);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center"
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pink heart loading animation */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center flex-col"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#FFA2CB"
                  animate={{
                    fill: ["#FFA2CB", "#FF77B3", "#FFA2CB"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </svg>

              <motion.p
                className="mt-2 text-pink-700 font-medium text-center"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Loading...
              </motion.p>
            </motion.div>

            {/* Sparkle effects */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#FECCE3",
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
