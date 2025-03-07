import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import {
  Users,
  Package,
  Store,
  Truck,
  CreditCard,
  RefreshCcw,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";

const Footer = ({ mt = "mt-0" }) => {
  return (
    <footer className={`${mt} bg-gray-800 text-white py-6 md:py-10 px-4 md:px-5`}>
      <div className="container mx-auto">
        {/* Top Section: Logo and Download Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-xl">SS POWER TOOL</p>
              <p className="text-gray-300 text-sm">
                Sell on India's leading B2B
              </p>
              <p className="text-gray-300 text-sm">E-commerce Marketplace</p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
              <button className="bg-white text-black px-3 py-1 rounded-md flex items-center justify-center gap-1 text-sm shadow-sm border">
                <CiMobile3 size={16} />
                DOWNLOAD MOBILE APP
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-white text-center md:text-right">Keep in touch</p>
            <div className="flex gap-2">
              <button className=" p-2 rounded-full text-white">
                <FaYoutube size={20} />
              </button>
              <button className=" p-2 rounded-full text-white">
                <FaFacebookF size={20} />
              </button>
              <button className=" p-2 rounded-full text-white">
                <FaInstagram size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="border-gray-500 mb-6" />

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Product Info Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {[
              { icon: Users, count: "2 Lakh+", label: "Customers" },
              { icon: Package, count: "20,000+", label: "Products" },
              { icon: Store, count: "1200+", label: "Sellers" },
              { icon: Truck, count: "Free", label: "Shipping" },
              { icon: CreditCard, count: "Cash On", label: "Delivery" },
              { icon: RefreshCcw, count: "Easy", label: "Returns" }
            ].map(({ icon: Icon, count, label }, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Icon className="text-yellow-400 text-3xl" />
                <div className="text-center">
                  <p className="font-bold text-yellow-400">{count}</p>
                  <p>{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold mb-2">Quick Links</p>
              <ul className="space-y-1">
                <li className="hover:text-yellow-400 transition-colors">About Us</li>
                <li className="hover:text-yellow-400 transition-colors">Privacy Policy</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2">Policies</p>
              <ul className="space-y-1">
                <li className="hover:text-yellow-400 transition-colors">Terms of Service</li>
                <li className="hover:text-yellow-400 transition-colors">Refund & Cancellation</li>
              </ul>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="text-center md:text-left">
            <p className="font-bold mb-2">Contact Us</p>
            <div className="space-y-1 text-sm">
              <p>S S GROUP</p>
              <p>GST NO. 06ADRPG7908H1Z9</p>
              <p> SHOP NO. 259/E</p>
              <p>GAUSHALA MARKET NEAR SHYAM MANDIR, </p>
              <p>NARNAUL, DISTRICT MAHENDRAGARH</p>
              <p> PIN NO. 123001 HARYANA</p>
              <p className="mt-2">
                <span className="font-semibold">Email:</span> SSPOWERTOOL.IN@GMAIL.COM
              </p>
              <p>
                <span className="font-semibold">CONTACT NO: </span>  +91 9804611111, 9992707172
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;