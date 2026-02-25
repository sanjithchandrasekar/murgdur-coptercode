import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { fetchContactPage } from "../utils/sanity";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

const ContactInfo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchContactPage();
      if (result) setData(result);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24 pb-12">
      <SEO
        title={`${data?.heading || "Contact Us"} | Murgdur Support`}
        description="Get in touch with Murgdur. We are here to assist you with your royal experience."
        url="https://murugdur1.vercel.app/contact"
      />
      <div className="container mx-auto px-6 relative">
        <div className="absolute top-0 left-6 z-30">
          <BackButton className="text-gray-500 hover:text-royal-gold" />
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-royal-gold uppercase tracking-[0.2em] text-sm font-bold block mb-4">
            {data?.eyebrow || "Contact Us"}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6">
            {data?.heading || "Get in Touch"}
          </h1>
          <div className="w-24 h-0.5 bg-royal-gold mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          {/* Contact Details */}
          <div className="w-full lg:w-5/12 space-y-12">
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-6 border-l-2 border-royal-gold pl-4">
                Contact Information
              </h3>
              <p className="text-gray-400 font-light mb-8 leading-relaxed">
                {data?.intro ||
                  "We're here to help with any questions about your order, products, or our services."}
              </p>

              <div className="space-y-6">
                <a
                  href={`tel:${data?.phone || "+910000000000"}`}
                  className="flex items-start gap-4 group cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-black transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-1 group-hover:text-royal-gold transition-colors">
                      Phone
                    </h4>
                    <p className="text-gray-400 font-serif">
                      {data?.phone || "+91 000 000 0000"}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                {data?.socialLinks?.whatsapp && (
                  <a
                    href={`https://wa.me/${data.socialLinks.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-4 group cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-1">WhatsApp</h4>
                      <p className="text-gray-400 font-serif">{data.socialLinks.whatsapp}</p>
                    </div>
                  </a>
                )}

                <a
                  href={`mailto:${data?.email || "support@murgdur.com"}`}
                  className="flex items-start gap-4 group cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-black transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-1 group-hover:text-royal-gold transition-colors">
                      Email
                    </h4>
                    <p className="text-gray-400 font-serif">
                      {data?.email || "support@murgdur.com"}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 group p-2 -ml-2">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-black transition-colors">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-1">
                      Working Hours
                    </h4>
                    <p className="text-gray-400 font-serif">
                      {data?.hours || "Mon-Sat: 10:00 AM-8:00 PM"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-6 border-l-2 border-royal-gold pl-4">
                {data?.stores?.length > 1 ? "Our Stores" : "Our Store"}
              </h3>
              {data?.stores?.length > 0 ? (
                <div className="space-y-6">
                  {data.stores.map((store, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-royal-gold shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        {store.name && <h4 className="text-sm font-bold text-gray-900 mb-1">{store.name}</h4>}
                        <p className="text-gray-400 font-serif text-sm leading-relaxed whitespace-pre-line">{store.address}</p>
                        {store.hours && <p className="text-xs text-gray-400 mt-1">{store.hours}</p>}
                        {store.phone && <p className="text-xs text-gray-400">{store.phone}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-royal-gold shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-400 font-serif leading-relaxed whitespace-pre-line">
                      {data?.address || `123, Heritage Boulevard,\nPalace Road, Bengaluru,\nKarnataka-560001`}
                    </p>
                  </div>
                </div>
              )}

              {/* Map Embed */}
              {data?.mapEmbedUrl && (
                <div className="mt-6 rounded-lg overflow-hidden border border-gray-200" style={{ height: "200px" }}>
                  <iframe src={data.mapEmbedUrl} width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" title="Store Location" />
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-7/12 bg-gray-50 border border-gray-200 p-8 md:p-12 rounded-lg relative">
            <h3 className="text-2xl font-serif text-gray-900 mb-8">
              Send a message
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 font-medium">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 font-medium">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">Subject</label>
                <select className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors">
                  <option>General Inquiry</option>
                  <option>Support</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">Message</label>
                <textarea
                  rows="5"
                  className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none resize-none transition-colors placeholder:text-gray-400"
                ></textarea>
              </div>

              <button className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
