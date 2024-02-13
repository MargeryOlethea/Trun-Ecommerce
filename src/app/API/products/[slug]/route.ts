import { FetchResponse, ProductModel } from "@/app/types/all.types";
import { getProductBySlug } from "@/db/models/products";
import { NextRequest, NextResponse } from "next/server";

// get/api/products/id
export const GET = async (
  _request: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params;

    const product = await getProductBySlug(slug);

    return NextResponse.json<FetchResponse<ProductModel>>({
      status: 200,
      message: `Success GET products/${slug}`,
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "NotFound") {
        return NextResponse.json<FetchResponse<never>>(
          {
            status: 404,
            error: "Product not found",
          },
          { status: 404 },
        );
      }
    }

    return NextResponse.json<FetchResponse<never>>(
      {
        status: 500,
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
};
