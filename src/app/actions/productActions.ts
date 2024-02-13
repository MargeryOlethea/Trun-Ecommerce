"use server";

import { redirect } from "next/navigation";
import { FetchResponse, ProductModel } from "../types/all.types";

const url = process.env.NEXT_PUBLIC_API_URL;

//FETCH PRODUCT
export const fetchProducts = async ({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) => {
  if (!url) {
    return null;
  }

  if (!search) {
    search = "";
  }
  if (!page) {
    page = 1;
  }

  const response = await fetch(
    `${url}/api/products?search=${search}&page=${page}`,
  );

  const responseJson: FetchResponse<ProductModel[]> = await response.json();

  if (!response.ok) {
    let message = responseJson.error || "Oops! Something went wrong";

    redirect(`/products?error=${message}`);
  }

  return responseJson.data;
};
