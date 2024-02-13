import { fetchWishlist } from "../actions/wishlistActions";
import WishlistItems from "../components/WishlistItems";

async function WishListPage() {
  const wishlist = await fetchWishlist();

  return (
    <>
      <main className="h-full max-w-screen-xl mx-auto">
        <section className="py-10">
          {wishlist && <WishlistItems wishlist={wishlist} />}
        </section>
      </main>
    </>
  );
}

export default WishListPage;
