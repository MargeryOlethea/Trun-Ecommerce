"use server";
import { redirect } from "next/navigation";
import { FetchResponse } from "../types/all.types";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL;

// REGISTER
export async function handleRegister(formData: FormData) {
  const bodyRegister = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  };

  const response = await fetch(`${url}/api/register`, {
    method: "POST",
    body: JSON.stringify(bodyRegister),
    headers: { "Content-Type": "application/json" },
  });

  const responseJson: FetchResponse<unknown> = await response.json();

  if (!response.ok) {
    let errorMessage = responseJson.error || "Oops! Something went wrong";

    return redirect(`/register?error=${errorMessage}`);
  }

  let successMessage = "Successfully register, please login!";
  return redirect(`/login?success=${successMessage}`);
}

//LOGIN
export async function handleLogin(formData: FormData) {
  const bodyLogin = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(`${url}/api/login`, {
    method: "POST",
    body: JSON.stringify(bodyLogin),
    headers: { "Content-Type": "application/json" },
  });

  const responseJson: FetchResponse<string> = await response.json();

  if (!response.ok) {
    let message = responseJson.error || "Oops! Something went wrong";

    return redirect(`/login?error=${message}`);
  }

  const token = responseJson.data;
  if (token) {
    cookies().set("token", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
      sameSite: "strict",
    });
  }

  return redirect(`/`);
}

//LOGOUT

export async function handleLogout() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    cookieStore.delete("token");

    redirect("/login");
  }
}
