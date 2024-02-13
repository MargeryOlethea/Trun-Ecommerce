"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function SearchBar({ searchText }: { searchText?: string }) {
  const [search, setSearch] = useState(searchText);
  const router = useRouter();

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    setTimeout(() => {
      if (!search) {
        router.push(`/products`);
      } else {
        router.push(`/products?search=${search}`);
      }
    }, 500);
  }, [search, router]);
  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="w-1/2 rounded-full px-5 py-2.5 border-black border"
        placeholder="search product here..."
      />
    </>
  );
}

export default SearchBar;
