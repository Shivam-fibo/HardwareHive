import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";


const Footer = ({ mt = "mt-0" }) => {
  const images = Array.from(
    { length: 16 },
    (_, i) => `/logo/img${i + 1}.jpg`
  );
  return (
    <footer
      className={`${mt} bg-gray-800 sm:text-yellow-200 text-yellow-100 py-6 md:py-10 px-4 md:px-5`}
    >
      <div className="container mx-auto">
        {/* Top Section: Logo and Download Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-center md:text-left">
              <p className=" font-bold text-xl">SS POWER TOOL</p>
              <p className="sm:text-yellow-200  text-yellow-100 text-sm">
                MULTI BRAND SPARE PARTS
              </p>
              <p className="sm:text-yellow-200 text-yellow-100 text-sm">
                {" "}
                B2B PORTAL
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
              <button className="sm:text-yellow-200 text-yellow-100  px-3 py-1 rounded-md flex items-center justify-center gap-1 text-sm shadow-sm border">
                <CiMobile3 size={16} />
                DOWNLOAD MOBILE APP
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="sm:text-yellow-200 text-yellow-100 text-center md:text-right">
              KEEP IN TOUCH
            </p>
            <div className="flex gap-2">
              <button className=" p-2 rounded-full sm:text-yellow-200 text-yellow-100">
                <FaYoutube size={20} />
              </button>
              <button className=" p-2 rounded-full sm:text-yellow-200 text-yellow-100">
                <FaFacebookF size={20} />
              </button>
              <button className=" p-2 rounded-full sm:text-yellow-200 text-yellow-100">
                <FaInstagram size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="border-gray-500 mb-6" />

        {/* Footer Content Grid */}
        <div>
  <div className="text-3xl mb-10 text-center">DEALING IN MULTI BRAND</div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {/* Logos Section - Takes 50% width */}
    <div className="md:col-span-1 lg:col-span-1">
  <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
    {images.map((src, index) => (
      <div 
        key={index} 
        className="w-20 h-6  sm:w-24 sm:h-8 flex items-center justify-center"
      >
        <img
          src={src}
          alt={`Product ${index + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
    ))}
  </div>
</div>


    {/* Quick Links Section - Centered on mobile */}
    <div className="sm:ml-64 text-center md:text-left">
      <p className="font-bold mb-2">QUICK LINKS</p>
      <ul className="space-y-1">
        <li className="hover:text-yellow-400 transition-colors">ABOUT US</li>
        <li className="hover:text-yellow-400 transition-colors">PRIVACY POLICY</li>
      </ul>
    </div>

    {/* Contact Us Section */}
    <div className="text-center md:text-left">
      <p className="font-bold mb-2">CONTACT US</p>
      <div className="space-y-1 text-sm">
        <p>S S GROUP</p>
        <p>GST NO. 06ADRPG7908H1Z9</p>
        <p>SHOP NO. 259/E</p>
        <p>GAUSHALA MARKET NEAR SHYAM MANDIR,</p>
        <p>NARNAUL, DISTRICT MAHENDRAGARH</p>
        <p>PIN NO. 123001 HARYANA</p>
        <p className="mt-2">
          <span className="font-semibold">Email:</span> SSPOWERTOOL.IN@GMAIL.COM
        </p>
        <p>
          <span className="font-semibold">CONTACT NO:</span> +91 9804611111, 9992707172
        </p>
      </div>
    </div>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
