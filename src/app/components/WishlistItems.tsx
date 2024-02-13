"use client";
import ClientFlashComponent from "@/app/components/ClientFlashComponent";
import ProductCard from "@/app/components/ProductCard";
import { WishlistModel } from "@/app/types/all.types";
import Link from "next/link";
import { useState } from "react";

function WishlistItems({ wishlist }: { wishlist: WishlistModel[] }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <div className="flex justify-between h-full items-center mb-5 ">
        <p className="text-2xl">
          {editMode ? "Manage your wishlist" : `Wishlist (${wishlist.length})`}
        </p>
        {wishlist.length > 0 && (
          <button
            className={
              editMode
                ? "border-2 rounded-full border-black bg-transparent text-black px-5 py-2.5"
                : "border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all duration-300 ease-in-out"
            }
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Done" : "Edit"}
          </button>
        )}
      </div>

      {wishlist.length <= 0 ? (
        <>
          <div className="h-[500px] w-full flex justify-center items-center mt-5">
            <div>
              <p>Nothing to see here, add your wishlist now! </p>
              <div className="mt-5 flex justify-center">
                <Link href="/products">
                  <button className="border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all duration-300 ease-in-out">
                    Back to products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={`${editMode && "px-5 py-2"}`}>
          <ClientFlashComponent />
          <div
            className={`transition-all duration-300 ease-in-out grid grid-cols-4 gap-2 mt-5 overflow-x-auto mb-10 `}
          >
            {wishlist.map((wish) => (
              <ProductCard
                key={wish._id.toString()}
                product={wish.product}
                editMode={editMode}
                hideButton={true}
                deleteWishlistId={wish._id.toString()}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WishlistItems;
