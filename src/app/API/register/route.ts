import {
  FetchResponse,
  UserModel,
  UserRegisterInput,
} from "@/app/types/all.types";
import { createUser } from "@/db/models/users";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// post/api/register
// validation
const userInputSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(5),
  name: z.string().nonempty().optional(),
});

export const POST = async (request: NextRequest) => {
  try {
    const data: UserRegisterInput = await request.json();
    const parsedData = userInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json<FetchResponse<UserModel>>(
      {
        status: 201,
        message: "Success POST register",
        data: user,
      },
      { status: 201 },
    );
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
      if (error.message === "RegisteredAccount") {
        return NextResponse.json<FetchResponse<never>>(
          {
            status: 400,
            error: "Email or username is already registered",
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
