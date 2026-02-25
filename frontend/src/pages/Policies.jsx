import { useEffect } from "react";
import { Link } from "react-router-dom";

const Policies = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-heading text-center mb-8 text-[#d4af37]">Policies</h1>

      <div className="space-y-12">
        {/* Shipping & Returns */}
        <section id="shipping" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4 text-[#d4af37]">Shipping & Returns</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              We offer free shipping on all prepaid orders above ₹500. For orders below ₹500, a nominal shipping charge of ₹50 applies.
            </p>
            <p>
              Orders are typically delivered within 5-7 business days. You will receive a tracking number via email once your order is shipped.
            </p>
            <p>
              We accept returns within 7 days of delivery, provided the item is in its original condition with tags intact. Custom or personalized items are not eligible for return.
            </p>
            <p>
              To initiate a return, please contact our customer support team with your order details.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4 text-[#d4af37]">Privacy Policy</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
            </p>
            <p>
              We collect information such as your name, email, phone number, and shipping address when you place an order or create an account.
            </p>
            <p>
              Your information is used solely for processing orders, improving our services, and communicating with you about your purchases.
            </p>
            <p>
              We do not share your personal information with third parties except as necessary to fulfill your orders (e.g., with shipping partners).
            </p>
            <p>
              You have the right to access, update, or delete your personal information at any time by contacting us.
            </p>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section id="terms" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4 text-[#d4af37]">Terms & Conditions</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              By using our website and placing orders, you agree to these terms and conditions.
            </p>
            <p>
              All prices are subject to change without notice. We reserve the right to cancel orders if items are out of stock or pricing errors occur.
            </p>
            <p>
              Ownership of items transfers to you upon delivery. We are not responsible for delays caused by factors beyond our control.
            </p>
            <p>
              Disputes will be resolved through mutual agreement or legal channels if necessary.
            </p>
            <p>
              These terms are governed by the laws of India. Any modifications to these terms will be posted on this page.
            </p>
          </div>
        </section>
      </div>

      {/* Navigation Links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="#shipping" className="text-[#d4af37] hover:underline">Shipping & Returns</Link>
          <Link to="#privacy" className="text-[#d4af37] hover:underline">Privacy Policy</Link>
          <Link to="#terms" className="text-[#d4af37] hover:underline">Terms & Conditions</Link>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-gray-600 hover:text-[#d4af37]">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Policies;