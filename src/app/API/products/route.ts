import { NextRequest, NextResponse } from "next/server";
import { FetchResponse, ProductModel } from "@/app/types/all.types";
import { getProducts } from "@/db/models/products";

// get/api/products or get/api/products?search=
export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get("search");
  const page = request.nextUrl.searchParams.get("page");

  const products = await getProducts(search, Number(page));
  return NextResponse.json<FetchResponse<ProductModel[]>>({
    status: 200,
    message: "Success GET users",
    data: products,
  });
};
