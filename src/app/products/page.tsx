"use client";
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import Loading from "../loading";
import { FetchResponse, ProductModel } from "../types/all.types";
import { redirect } from "next/navigation";

type SearchParams = {
  search: string;
};

const ProductsPage = ({ searchParams }: { searchParams: SearchParams }) => {
  let search = searchParams.search;
  if (!search) {
    search = "";
  }

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async ({
    search,
    page,
  }: {
    search?: string;
    page?: number;
  }) => {
    try {
      setLoading(true);
      if (!search) {
        search = "";
      }
      if (!page) {
        page = 1;
      }

      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${url}/api/products?search=${search}&page=${page}`,
      );

      const responseJson: FetchResponse<ProductModel[]> = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.error || "Oops! Something went wrong");
      }
      if (responseJson.data) {
        setProducts(responseJson.data);
      }
    } catch (error) {
      if (error instanceof Error) {
        redirect(`/products?error=${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts({ search });
  }, [search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main className="h-full max-w-screen-xl mx-auto">
        <section className="py-10">
          <div className="flex justify-between items-center mb-10 ">
            <p className="text-2xl">Products</p>
            <SearchBar searchText={search} />
          </div>
          <div key={Math.random()}>
            {products && products.length > 0 && (
              <ProductList initialProducts={products} search={search} />
            )}
          </div>
          {!products ||
            (products.length == 0 && (
              <div className="h-[500px] flex justify-center items-center">
                <p className="text-4xl text-zinc-200">No Products</p>
              </div>
            ))}
        </section>
      </main>
    </>
  );
};

export default ProductsPage;
