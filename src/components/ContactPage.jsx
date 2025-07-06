import React from "react";
import { contactConfig } from "../content_option";

const ContactUs = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-500 mb-6">Contact Me</h1>
        <div className="border-b-2 border-pink-400 mb-12 w-24"></div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">
              Get in touch
            </h3>
            <address className="not-italic text-zinc-600 dark:text-zinc-300 mb-4">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${contactConfig.YOUR_EMAIL}`}
                  className="text-pink-500 hover:underline"
                >
                  {contactConfig.YOUR_EMAIL}
                </a>
              </p>
              {contactConfig.YOUR_FONE && (
                <p>
                  <strong>Phone:</strong>{" "}
                  <span className="text-pink-500">{contactConfig.YOUR_FONE}</span>
                </p>
              )}
            </address>
            <p className="text-zinc-700 dark:text-zinc-400">
              {contactConfig.description}
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-400 dark:bg-zinc-800 dark:text-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-400 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-400 dark:bg-zinc-800 dark:text-white"
            ></textarea>

            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
