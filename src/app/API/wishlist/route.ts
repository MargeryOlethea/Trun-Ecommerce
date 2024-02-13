import {
  FetchResponse,
  WishlistInput,
  WishlistModel,
} from "@/app/types/all.types";
import { createWishlist, getWishlist } from "@/db/models/wishlist";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// get/api/wishlist
export const GET = async (request: NextRequest) => {
  const userId = request.headers.get("x-user-id");

  if (userId) {
    const wishlist = await getWishlist(userId);
    return NextResponse.json<FetchResponse<unknown>>({
      status: 200,
      message: "Success GET wishlist",
      data: wishlist,
    });
  }
};

// post/api/wishlist
// validasi post wishlist
const wishlistInputSchema = z.object({
  productId: z.string(),
  userId: z.string(),
});

export const POST = async (request: NextRequest) => {
  try {
    const productId = await request.json();
    const userId = request.headers.get("x-user-id");

    if (productId && userId) {
      const input: WishlistInput = {
        productId,
        userId,
      };
      const parsedData = wishlistInputSchema.safeParse(input);

      if (!parsedData.success) {
        throw parsedData.error;
      }

      const wishlist = await createWishlist(parsedData.data);

      return NextResponse.json<FetchResponse<WishlistModel>>(
        {
          status: 201,
          message: "Success POST wishlist",
          data: wishlist,
        },
        {
          status: 201,
        },
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return NextResponse.json<FetchResponse<never>>(
        {
          status: 400,
          error: `${errorPath} - ${errorMessage}`,
        },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      if (error.message == "DuplicateInput") {
        return NextResponse.json<FetchResponse<never>>(
          {
            status: 400,
            error: "Item is already in your wishlist",
          },
          { status: 400 },
        );
      }
    }

    return NextResponse.json<FetchResponse<never>>(
      {
        status: 500,
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
};
