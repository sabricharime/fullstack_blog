import { Button, Input } from "@nextui-org/react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaLock,
  FaMobile,
} from "react-icons/fa";
import { FaEarthAfrica, FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-grayColor-100 text-foreground py-8">
      <div className="container mx-auto px-4 max-w-[1024px] flex flex-col gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 ">
          <div className="text-start flex flex-col gap-4">
            <h5 className="capitalize font-Roboto ">
              <small>about</small>
            </h5>
            <p className="text-justify">
              <small className="text-justify">
                Your Daily Blog is your go-to source for the latest updates,
                insights, and stories from around the world. We are dedicated to
                providing our readers with high-quality content that is both
                informative and engaging.
              </small>
            </p>
          </div>
          <div className="text-start flex flex-col gap-4">
            <h5 className="capitalize font-Roboto ">
              <small>Contact</small>
            </h5>
            <ul className="list-none flex flex-col gap-2">
              <li className="flex gap-2">
                <FaMobile className="fill-primary" />
                <small className="text-justify">+213668038264</small>
              </li>
              <li className="flex gap-2">
                <FaFacebook className="fill-primary" />
                <small className="text-justify">
                  <a href="https://www.facebook.com/sabricharime">
                    /sabricharime
                  </a>
                </small>
              </li>
              <li className="flex gap-2">
                <FaGithub className="fill-primary" />
                <small className="text-justify">
                  <a href="https://www.github.com/sabricharime">
                    /sabricharime
                  </a>
                </small>
              </li>
              <li className="flex gap-2">
                <FaLinkedin className="fill-primary" />
                <small className="text-justify">
                  <a href="https://www.linkedin.com/in/sabri-charime">
                    /in/sabri-charime
                  </a>
                </small>
              </li>
              <li className="flex gap-2">
                <FaLinkedin className="fill-primary" />
                <small className="text-justify">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sabricharim7@gmail.com"
                    target="_blank"
                  >
                    sabricharim7@gmail.com
                  </a>
                </small>
              </li>
            </ul>
          </div>
          <div className="text-start">
            <h5 className="capitalize font-Roboto ">
              <small>terms</small>
            </h5>
            <p className="text-justify">
              <small className="text-justify">
                Terms and Conditions Welcome to Your Daily Blog! These terms and
                conditions outline the rules and regulations for the use of Your
                Daily Blog's Website, located at www.yourdailyblog.com. By
                accessing this website, we assume you accept these terms and
                conditions. Do not continue to use Your Daily Blog if you do not
                agree to take all of the terms and conditions stated on this
                page.
              </small>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6">
          <div className="text-start flex flex-col gap-4">
            <h5>
              <small>Fast Links :</small>
            </h5>
            <ul className="flex gap-4 items-center justify-start">
              <li className="flex gap-2 items-center">
                <FaEarthAfrica className="fill-primary" />{" "}
                <small>
                  <Link to={"/about"}>About</Link>
                </small>
              </li>
              <li className="flex gap-2 items-center">
                <FaMessage className="fill-primary" />{" "}
                <small>
                  <Link to={"/contact"}>Contact</Link>
                </small>
              </li>
              <li className="flex gap-2 items-center">
                <FaLock className="fill-primary" />{" "}
                <small>
                  <Link to={"/contact"}>Privacy</Link>
                </small>
              </li>
            </ul>
          </div>
          <div className="text-start flex flex-col gap-4">
            <div className="w-full ">
              {" "}
              <h5 className="text-xl font-bold">
                <small>Subscribe to our Newsletter</small>
              </h5>{" "}
              <form className="flex  gap-4">
                {" "}
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  variant="flat"
                  color="primary"
                />{" "}
                <Button type="submit" variant="solid" color="primary">
                  Subscribe
                </Button>{" "}
              </form>{" "}
            </div>
          </div>

          <div className="mt-8 text-center">
            {" "}
            <p>
              <small>© 2024 Your Daily Blog. All rights reserved.</small>
            </p>{" "}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
