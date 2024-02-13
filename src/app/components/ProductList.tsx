"use client";
import { fetchProducts } from "@/app/actions/productActions";
import ProductCard from "@/app/components/ProductCard";
import { ProductModel } from "@/app/types/all.types";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { setTimeout } from "timers";

function ProductList({
  initialProducts,
  search,
}: {
  initialProducts: ProductModel[];
  search: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = () => {
    setTimeout(async () => {
      const next = page + 1;
      const products = await fetchProducts({ search, page: next });

      if (products?.length) {
        setPage(next);
        setProducts((prevData) => [
          ...(prevData.length ? prevData : []),
          ...products,
        ]);

        if (products?.length < 8) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    }, 300);
  };

  return (
    <>
      {/* PRODUCTS */}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMore}
        loader={
          <h1 className="text-md text-center animate-pulse text-zinc-400 my-3">
            Loading...
          </h1>
        }
        hasMore={hasMore}
        endMessage={
          <h1 className="text-md text-center text-zinc-400 my-3">
            End of items
          </h1>
        }
      >
        <div className="grid grid-cols-4 gap-2 mt-5 overflow-x-auto mb-10">
          {products.map((product) => (
            <ProductCard key={product._id.toString()} product={product} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default ProductList;
