import Image from "next/image";
import { fira } from "../fonts/fonts";

function Banner() {
  return (
    <>
      <section className="py-10">
        <div>
          <Image
            src={"/images/promotion-banner.jpg"}
            alt="shoe promotional banner"
            width={1500}
            height={100}
            className="rounded-xl"
          />
          <div className="mt-16">
            <p className="text-center font-semibold">Arriving March 26th</p>
            <p
              className={`${fira.className} font-extrabold text-6xl text-center`}
            >
              TRUN FIRE MIN ND
            </p>
            <p className="text-center my-5">
              Welcome to the next generation of fire technology.
            </p>
          </div>

          <div className="my-7 flex justify-center">
            <button className="border rounded-full bg-black px-5 py-2.5 text-white hover:bg-zinc-500 transition-all duration-300 ease-in-out">
              Get Notified
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
