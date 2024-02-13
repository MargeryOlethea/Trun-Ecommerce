/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import ClientFlashComponent from "../components/ClientFlashComponent";
import { handleLogin } from "../actions/userActions";

function LoginPage() {
  return (
    <>
      <main className=" h-full max-w-screen-xl mx-auto flex justify-center items-start">
        <div className="w-1/3 h-full py-7">
          <div className="flex">
            <Image
              src={"/images/nike-logo.png"}
              alt={"brand-logo"}
              width={70}
              height={30}
              className="mr-3"
            />
            <Image
              src={"/images/airjordan-logo.png"}
              alt={"brand-logo"}
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className=" text-3xl mt-7">Enter your account info to log in.</p>
            <p className=" mt-2 text-lg">
              Don't have an account yet?{" "}
              <Link href="/register" className="underline font-bold">
                Sign up here.
              </Link>
            </p>
          </div>

          <ClientFlashComponent />

          <form className="my-5" action={handleLogin}>
            {/* username */}
            <input
              type="text"
              required={true}
              name="email"
              placeholder="Email*"
              className="border border-gray-800 w-full p-4 rounded-lg my-4"
            />

            {/* password */}
            <input
              type="password"
              required={true}
              name="password"
              placeholder="Password*"
              className="border border-gray-800 w-full p-4 rounded-lg my-4"
            />

            <p className="my-7 text-md text-zinc-500">
              By continuing, I agree to Trun's{" "}
              <span className="underline font-bold">Privacy Policy</span> and{" "}
              <span className="underline font-bold">Terms of Use.</span>
            </p>

            <div className="my-7 flex justify-end">
              <button className="border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all duration-300 ease-in-out">
                Log in
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
