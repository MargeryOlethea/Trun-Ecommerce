"use client";

import { useSearchParams } from "next/navigation";
import { MdError } from "react-icons/md";

function ClientFlashComponent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  return (
    <>
      {error && (
        <div className="text-red-500 border border-red-500 rounded-xl px-5 py-2 bg-red-200 my-5 flex items-center gap-3 animate-pulse">
          <MdError size={20} />
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-500 border border-green-500 rounded-xl px-5 py-2 bg-green-200 my-5 flex items-center gap-3 animate-pulse">
          <MdError size={20} />
          {success}
        </div>
      )}
    </>
  );
}

export default ClientFlashComponent;
