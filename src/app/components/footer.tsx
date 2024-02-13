import { Fira_Sans_Condensed } from "next/font/google";
import { FaLocationDot } from "react-icons/fa6";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { fira } from "../fonts/fonts";

function Footer() {
  return (
    <>
      <footer className="bg-black mt-auto">
        <div
          className={`max-w-screen-xl mx-auto text-white pt-8 pb-2 ${fira.className}`}
        >
          <div className="flex items-start justify-between pt-5">
            <div className="flex gap-36">
              <div>
                <p className="mb-5 font-bold text-xs">FIND A STORE</p>
                <p className="mb-5 font-bold text-xs">BECOME A MEMBER</p>
                <p className="mb-5 font-bold text-xs">STUDENT DISCOUNTS</p>
                <p className="mb-5 font-bold text-xs">Send Us Feedback</p>
              </div>

              <div>
                <p className="mb-5 font-bold text-xs">GET HELP</p>
                <p className="mb-5 text-xs text-zinc-500">Order Status</p>
                <p className="mb-5 text-xs text-zinc-500">Delivery</p>
                <p className="mb-5 text-xs text-zinc-500">Returns</p>
                <p className="mb-5 text-xs text-zinc-500">Payment Options</p>
                <p className="mb-5 text-xs text-zinc-500">Contact Us</p>
              </div>

              <div>
                <p className="mb-5 font-bold text-xs">ABOUT TRUN</p>
                <p className="mb-5 text-xs text-zinc-500">News</p>
                <p className="mb-5 text-xs text-zinc-500">Career</p>
                <p className="mb-5 text-xs text-zinc-500">Investors</p>
                <p className="mb-5 text-xs text-zinc-500">Sustainability</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="rounded-full p-2 bg-zinc-500 hover:bg-white">
                <FaTwitter color="black" />
              </button>
              <button className="rounded-full p-2 bg-zinc-500 hover:bg-white">
                <FaFacebookF color="black" />
              </button>
              <button className="rounded-full p-2 bg-zinc-500 hover:bg-white">
                <FaYoutube color="black" />
              </button>
              <button className="rounded-full p-2 bg-zinc-500 hover:bg-white">
                <FaInstagram color="black" />
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <div className="flex gap-5 text-xs">
              <div className="text-white flex items-center gap-2">
                <FaLocationDot />
                <p>Indonesia</p>
              </div>
              <div>
                <p className="text-zinc-500">
                  © 2023 Trun, Inc. All Rights Reserved
                </p>
              </div>
            </div>

            <div className="flex text-zinc-500 text-xs gap-7">
              <p>Guides</p>
              <p>Terms of Sale</p>
              <p>Terms of Use</p>
              <p>Trun Privacy Policy</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
