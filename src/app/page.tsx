/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { fetchProducts } from "./actions/productActions";
import ClientFlashComponent from "./components/ClientFlashComponent";

export default async function Home() {
  const products = await fetchProducts({ search: "" });
  const highlightedProducts = products?.slice(0, 8);

  return (
    <>
      <Navbar />
      <main className="h-full max-w-screen-xl mx-auto">
        <ClientFlashComponent />
        <Banner />

        <section className="py-10">
          <div className="flex justify-between mb-10">
            <p className="text-2xl">Popular</p>
            <Link href="/products">
              <button className="border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all duration-300 ease-in-out">
                See All
              </button>
            </Link>
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-4 gap-2 mt-5 overflow-x-auto mb-10">
            {highlightedProducts?.map((product) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
