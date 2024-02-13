import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { handleLogout } from "@/app/actions/userActions";

function Navbar() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  return (
    <>
      <nav className="bg-white h-full">
        <div className=" flex justify-between max-w-screen-xl mx-auto">
          <Link href="/">
            <div className="flex items-center h-full">
              <Image
                src={"/images/nike-logo.png"}
                alt={"nike-logo"}
                width={60}
                height={25}
              />
            </div>
          </Link>
          <div className="flex gap-10 font-semibold">
            <h1 className="hover:border-b-2 py-5 hover:border-b-black transition-all delay-100 ease-in-out">
              <Link href="/products">Products</Link>
            </h1>
            <h1 className="hover:border-b-2 py-5 hover:border-b-black transition-all delay-100 ease-in-out">
              <Link href="/wishlist">Wishlist</Link>
            </h1>
          </div>
          <div className="flex items-center h-full my-auto gap-5">
            {token ? (
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all delay-100 ease-in-out"
                >
                  Log out
                </button>
              </form>
            ) : (
              <Link href="/login">
                <button className="border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all delay-100 ease-in-out">
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
