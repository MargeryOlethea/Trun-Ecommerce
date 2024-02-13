/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import ClientFlashComponent from "../components/ClientFlashComponent";
import { handleRegister } from "../actions/userActions";

function RegisterPage() {
  return (
    <>
      <main className="h-full max-w-screen-xl mx-auto flex justify-center items-start ">
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
            <p className=" text-3xl mt-7">Now let's make you a Trun Member.</p>
            <p className=" mt-2 text-lg">
              Already have an account?{" "}
              <Link href="/login" className="underline font-bold">
                Login here.
              </Link>
            </p>
          </div>
          <ClientFlashComponent />
          <form className="my-5" action={handleRegister}>
            {/* username */}
            <input
              type="text"
              required={true}
              name="username"
              placeholder="Username*"
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
            <div className="flex items-center">
              <IoIosClose size={20} />
              <p className="my-2 text-xs text-gray-500">
                Minimum of 5 characters
              </p>
            </div>
            <div className="flex items-center">
              <IoIosClose size={20} />
              <p className="my-2 text-xs text-gray-500">
                Uppercase, lowercase letters, and one number
              </p>
            </div>

            {/* name */}
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="border border-gray-800 w-full p-4 rounded-lg my-4"
            />
            {/* email */}
            <input
              type="text"
              required={true}
              name="email"
              placeholder="Email*"
              className="border border-gray-800 w-full p-4 rounded-lg my-4"
            />
            <div className="flex gap-5 items-start my-4 mt-7">
              <input
                type="checkbox"
                className="h-10 border accent-black border-black flex"
              />
              <p className="">
                Sign up for emails to get updates from Trun on products, offers,
                and your Member benefits.
              </p>
            </div>

            <div className="flex gap-5 items-start my-4">
              <input
                type="checkbox"
                className="h-10 accent-black border border-black"
                required={true}
              />
              <p className="">
                I agree to Trun's{" "}
                <span className="underline font-bold">Privacy Policy</span> and{" "}
                <span className="underline font-bold">Terms of Use.</span>
              </p>
            </div>
            <div className="my-5 flex justify-end">
              <button className="border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all duration-300 ease-in-out">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default RegisterPage;
