"use client";
import { addWishlist } from "@/app/actions/wishlistActions";
import { FaBookmark } from "react-icons/fa6";

function AddToWishList({ id }: { id: string }) {
  return (
    <>
      <button
        onClick={() => addWishlist(id)}
        className="flex bg-black text-white items-center gap-2 w-5/6 justify-center py-3 rounded-full my-10 hover:bg-zinc-500 transition-all duration-500 ease-in-out"
      >
        <FaBookmark color="white" />
        Add to Wishlist
      </button>
    </>
  );
}

export default AddToWishList;
