"use client";

import { useEffect } from "react";

const DashboardErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {}, [error]);

  return (
    <section>
      <p className="text-red-400 animate-pulse">
        Something happened: {error.message}
      </p>

      <button
        className="py-2 px-4 bg-red-400 rounded hover:text-white transition-colors duration-300"
        onClick={() => reset()}
      >
        Reset
      </button>
    </section>
  );
};

export default DashboardErrorPage;