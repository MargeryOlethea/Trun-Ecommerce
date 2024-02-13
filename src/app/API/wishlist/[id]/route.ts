import { FetchResponse } from "@/app/types/all.types";
import { deleteWishlist } from "@/db/models/wishlist";
import { NextRequest, NextResponse } from "next/server";

//delete/api/wishlist/id
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params;

    await deleteWishlist(id);

    return NextResponse.json<FetchResponse<string>>({
      status: 200,
      message: `Success DELETE wishlist/${id}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "BSONError") {
        return NextResponse.json<FetchResponse<never>>(
          {
            status: 400,
            error: "Invalid input",
          },
          { status: 400 },
        );
      }
      if (error.message == "NotFound") {
        return NextResponse.json<FetchResponse<never>>(
          {
            status: 404,
            error: "Wishlist not found",
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
      {
        status: 500,
      },
    );
  }
};
