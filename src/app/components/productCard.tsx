/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import { FaBookmark } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { ProductModel } from "../types/all.types";
import { priceConverter } from "../helper/priceConverter";
import { deleteWishlist, addWishlist } from "../actions/wishlistActions";

type ProductCardProps = {
  editMode?: boolean;
  hideButton?: boolean;
  deleteWishlistId?: string;
  product: ProductModel;
};

function ProductCard({
  editMode,
  hideButton,
  product,
  deleteWishlistId,
}: ProductCardProps) {
  return (
    <>
      <div className="mb-10 hover:scale-95 transition-all duration-200 ease-in-out">
        {!hideButton && (
          <button
            onClick={() => addWishlist(product._id.toString())}
            className="rounded-full bg-black hover:bg-zinc-500 p-3 absolute z-10 mt-3 ml-3 transition-all duration-300 ease-in-out"
          >
            <FaBookmark color="#f0f0f0" />
          </button>
        )}

        {editMode && deleteWishlistId && (
          <button
            onClick={async () => await deleteWishlist(deleteWishlistId)}
            className="rounded-full bg-rose-900 hover:bg-rose-500 p-2 absolute z-10 mt-3 ml-3 transition-all duration-300 ease-in-out"
          >
            <IoCloseSharp color="#f0f0f0" size={20} />
          </button>
        )}
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.thumbnail}
            alt="product photo"
            width={350}
            height={350}
            className="mb-3"
          />
          <p className="font-semibold">{product.name}</p>
          <p className="text-zinc-500">{product.excerpt}</p>

          <div className="mb-5 mt-2 flex gap-2">
            {product.tags.map((tag, index) => (
              <p
                key={index}
                className="px-2 py-1 border rounded-full text-xs border-black font-semibold"
              >
                {tag}
              </p>
            ))}
          </div>

          <p className="mt-3 font-semibold">{priceConverter(product.price)}</p>
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
