"use server";

import { cookies } from "next/headers";
import { FetchResponse, WishlistModel } from "../types/all.types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const url = process.env.NEXT_PUBLIC_API_URL;

//FETCH WISHLIST
export async function fetchWishlist() {
  if (!url) {
    return null;
  }

  const response = await fetch(`${url}/api/wishlist`, {
    headers: { Cookie: cookies().toString() },
  });

  const responseJson: FetchResponse<WishlistModel[]> = await response.json();

  if (!response.ok) {
    let message = "Oops! Something went wrong";

    return redirect(`/wishlist?error=${message}`);
  }

  return responseJson.data;
}

//ADD WISHLIST
export const addWishlist = async (id: string) => {
  const response = await fetch(`${url}/api/wishlist`, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      Cookie: cookies().toString(),
      "Content-type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    let message = responseJson.error || "Oops! Something went wrong";

    redirect(`/wishlist?error=${message}`);
  }

  revalidatePath("/wishlist");
  redirect("/wishlist");
};

// DELETE WISHLIST
export const deleteWishlist = async (id: string) => {
  const response = await fetch(`${url}/api/wishlist/${id}`, {
    method: "DELETE",
    headers: { Cookie: cookies().toString() },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    let message = responseJson.error || "Oops! Something went wrong";

    redirect(`/wishlist?error=${message}`);
  }

  revalidatePath("/wishlist");
  redirect("/wishlist");
};
