'use client'
import React, { useState } from "react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription logic
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="w-full py-6 px-4 bg-gray-100 text-center text-gray-600 text-sm mt-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <section className="mb-2 md:mb-0">
          <h3 className="font-semibold text-gray-800 mb-1">About Us</h3>
          <p className="text-xs text-gray-500">
            We create high-quality, customizable t-shirts for everyone.
          </p>
        </section>
        <section className="mb-2 md:mb-0">
          <h3 className="font-semibold text-gray-800 mb-1">Contact</h3>
          <p className="text-xs text-gray-500">
            Email: info@yourcompany.com
          </p>
        </section>
        <section className="mb-2 md:mb-0">
          <h3 className="font-semibold text-gray-800 mb-1">Follow Us</h3>
          <div className="flex justify-center gap-2">
            <a href="#" className="hover:text-blue-600">Twitter</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-800">Facebook</a>
            <span>|</span>
            <a href="#" className="hover:text-pink-600">Instagram</a>
          </div>
        </section>
        <section>
          <h3 className="font-semibold text-gray-800 mb-1">Newsletter</h3>
          {submitted ? (
            <p className="text-xs text-green-600">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
