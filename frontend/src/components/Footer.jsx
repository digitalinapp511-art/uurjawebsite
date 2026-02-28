import { FaInstagram, FaFacebookF, FaTwitter,FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className=" text-white bg-[#383737]  pt-14 pb-2 border-t border-[#eeee]/10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-col-2 md:grid-cols-4 gap-10 ">

                {/* Brand */}
                <div>
                    <h3 className="font-heading text-[#ff9d00] text-2xl mb-4">Uurja</h3>
                    <p className="text-white/90 text-sm">
                        Premium ethnic wear crafted with elegance, tradition, and modern style.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-semibold text-[#ff9d00] mb-4 ">Quick Links</h4>
                    <ul className="space-y-2 text-white/90 text-sm cursor-pointer">
                        <li><Link to="/" className="hover:text-[#ff9d00]">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-[#ff9d00]">Shop</Link></li>
                        <li><Link to="/shop" className="hover:text-[#ff9d00]">Collections</Link></li>
                        <li><Link to="/contact" className="hover:text-[#ff9d00]">Contact</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-semibold text-[#ff9d00] mb-4">Support</h4>
                    <ul className="space-y-2 text-white/90 text-sm cursor-pointer">
                        <li><Link to="/policies#shipping" className="hover:text-[#ff9d00]">Shipping & Returns</Link></li>
                        <li><Link to="/policies#privacy" className="hover:text-[#ff9d00]">Privacy Policy</Link></li>
                        <li><Link to="/policies#terms" className="hover:text-[#ff9d00]">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="font-semibold text-[#ff9d00] mb-4">Follow Us</h4>
                    <div className="flex gap-4 text-xl">
                        <FaInstagram className="hover:text-[#ff9d00] cursor-pointer  hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]" />
                        <FaFacebookF className="hover:text-[#ff9d00] cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]" />
                        <FaTwitter className="hover:text-[#ff9d00] cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]" />
                        <FaWhatsapp className="hover:text-[#ff9d00] cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]" />
                    </div>
                </div>

            </div>

            <div className="border-t border-white/10 mt-12 pt-2 text-center text-sm text-white/50">
                © {new Date().getFullYear()} uurja. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
