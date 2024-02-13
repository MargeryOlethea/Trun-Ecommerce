import { fira } from "@/app/fonts/fonts";
import Image from "next/image";
import AddToWishList from "../../components/AddToWishList";
import { FetchResponse, ProductModel } from "@/app/types/all.types";
import { priceConverter } from "@/app/helper/priceConverter";
import Link from "next/link";

const url = process.env.NEXT_PUBLIC_API_URL;
const fetchProductDetail = async (slug: string) => {
  const response = await fetch(`${url}/api/products/${slug}`);

  const responseJson: FetchResponse<ProductModel> = await response.json();

  if (!response.ok) {
    throw new Error("Error fetching data!");
  }

  return responseJson.data;
};

// METADATA
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProductDetail(params.slug);

  if (product) {
    return {
      title: `Trun - ${product.name}`,
    };
  }
}

// PAGE
async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductDetail(params.slug);

  return (
    <>
      {product && (
        <main className="h-full max-w-screen-xl mx-auto">
          <div className="flex gap-10 py-10">
            {/* IMAGE */}
            <div className="w-1/2 flex gap-2">
              <div className="flex-col">
                <Image
                  src={product.images[1]}
                  alt="product photo"
                  width={120}
                  height={120}
                  className="mb-2"
                />
                <Image
                  src={product.images[2]}
                  alt="product photo"
                  width={120}
                  height={120}
                />
              </div>
              <div>
                <Image
                  src={product.images[0]}
                  alt="product photo"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="w-1/2 px-10 flex items-center">
              <div>
                <p className={`text-6xl font-extrabold ${fira.className}`}>
                  {product.name}
                </p>
                <div className="flex gap-2 mt-3">
                  {product.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="rounded-full border px-5 py-1 text-center text-sm border-black"
                    >
                      {tag}
                    </p>
                  ))}
                </div>

                <p className="mt-10 text-xl">{priceConverter(product.price)}</p>

                <AddToWishList id={product._id.toString()} />

                <p>{product.description}</p>
                <Link href={"/products"}>
                  <button className="border-black border rounded-full bg-transparent px-5 py-2.5 hover:bg-zinc-500 hover:text-white transition-all duration-300 ease-in-out my-10">
                    Back to products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default ProductDetailPage;
