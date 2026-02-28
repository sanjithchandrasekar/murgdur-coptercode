import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { fetchFooter } from "../../utils/sanity";

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchFooter();
      if (result) setData(result);
    };
    load();
  }, []);

  const aboutLinks = data?.aboutLinks?.length
    ? data.aboutLinks
    : [
      { title: "Contact Us", url: "/contact" },
      { title: "About Us", url: "/about" },
      { title: "Careers", url: "/careers" },
      { title: "Murgdur Stories", url: "/stories" },
      { title: "Press", url: "/press" },
      { title: "Corporate Information", url: "/corporate" },
    ];

  const helpLinks = data?.helpLinks?.length
    ? data.helpLinks
    : [
      { title: "Payments", url: "/payments" },
      { title: "Shipping", url: "/shipping" },
      { title: "Cancellation & Returns", url: "/cancellation" },
      { title: "FAQ", url: "/faq" },
      { title: "Report Infringement", url: "/report" },
    ];

  const policyLinks = data?.policyLinks?.length
    ? data.policyLinks
    : [
      { title: "Cancellation & Returns", url: "/cancellation" },
      { title: "Terms Of Use", url: "/terms" },
      { title: "Security", url: "/security" },
      { title: "Privacy", url: "/privacy" },
      { title: "Sitemap", url: "/sitemap" },
      { title: "Grievance Redressal", url: "/grievance" },
      { title: "EPR Compliance", url: "/epr" },
    ];

  const defaultMailAddress = `Murgdur Private Limited,
Buildings Alyssa, Begonia &
Clove Embassy Tech Village,
Outer Ring Road, Devarabeesanahalli Village,
Bengaluru, 560103,
Karnataka, India`;

  const defaultOfficeAddress = `Murgdur Private Limited,
Buildings Alyssa, Begonia &
Clove Embassy Tech Village,
Outer Ring Road, Devarabeesanahalli Village,
Bengaluru, 560103,
Karnataka, India
CIN : U51109KA2012PTC066107
Telephone: 044-45614700 / 044-67415800`;

  return (
    <footer className="bg-[#f8f7f4] text-gray-900 font-sans text-[13px] leading-relaxed border-t border-gray-200">
      {/* Top Footer Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: HELP */}
          <div>
            <h3 className="uppercase mb-6 text-[11px] tracking-[0.2em] font-medium text-gray-900">
              Help
            </h3>
            <div className="flex flex-col space-y-3">
              <p className="mb-2 text-gray-600">
                A Client Advisor is available at{" "}
                <a
                  href="tel:+9118001039988"
                  className="underline hover:text-royal-gold decoration-1 underline-offset-4 decoration-current"
                >
                  +91 1800 103 9988
                </a>
                . You can also{" "}
                <Link
                  to="/contact"
                  className="underline hover:text-royal-gold decoration-1 underline-offset-4 decoration-current"
                >
                  chat
                </Link>{" "}
                or{" "}
                <a
                  href="mailto:support@murugdur.com"
                  className="underline hover:text-royal-gold decoration-1 underline-offset-4 decoration-current"
                >
                  email us
                </a>
                .
              </p>
              {helpLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.url}
                  className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
              <Link
                to="/stores"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Stores
              </Link>
            </div>
          </div>

          {/* Column 2: SERVICES */}
          <div>
            <h3 className="uppercase mb-6 text-[11px] tracking-[0.2em] font-medium text-gray-900">
              Services
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                to="/repairs"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Repairs
              </Link>
              <Link
                to="/personalisation"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Personalisation
              </Link>
              <Link
                to="/gifting"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Art of Gifting
              </Link>
              <Link
                to="/apps"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Download our Apps
              </Link>
            </div>
          </div>

          {/* Column 3: ABOUT MURUGDUR */}
          <div>
            <h3 className="uppercase mb-6 text-[11px] tracking-[0.2em] font-medium text-gray-900">
              About Murugdur
            </h3>
            <div className="flex flex-col space-y-3">
              {aboutLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.url}
                  className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
              <Link
                to="/sustainability"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Sustainability
              </Link>
              <Link
                to="/news"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Latest News
              </Link>
              <Link
                to="/foundation"
                className="text-gray-600 hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
              >
                Foundation Murugdur
              </Link>
            </div>
          </div>

          {/* Column 4: CONNECT */}
          <div>
            <h3 className="uppercase mb-6 text-[11px] tracking-[0.2em] font-medium text-gray-900">
              Connect
            </h3>
            <div className="flex flex-col space-y-6">
              <p className="text-gray-600 leading-relaxed">
                <Link
                  to="/signup"
                  className="underline hover:text-royal-gold decoration-1 underline-offset-4 decoration-current"
                >
                  Sign up
                </Link>{" "}
                for Murugdur emails and receive the latest news from the Maison,
                including exclusive online pre-launches and new collections.
              </p>

              <div className="space-y-3">
                <h4 className="text-[13px] mb-2 text-gray-900">Follow Us</h4>
                <div className="flex gap-5 text-gray-700">
                  <a
                    href={data?.socialLinks?.facebook || "#!"}
                    className="hover:text-royal-gold transition-colors"
                  >
                    <Facebook strokeWidth={1.5} size={20} />
                  </a>
                  <a
                    href={data?.socialLinks?.twitter || "#!"}
                    className="hover:text-royal-gold transition-colors"
                  >
                    <Twitter strokeWidth={1.5} size={20} />
                  </a>
                  <a
                    href={data?.socialLinks?.youtube || "#!"}
                    className="hover:text-royal-gold transition-colors"
                  >
                    <Youtube strokeWidth={1.5} size={20} />
                  </a>
                  <a
                    href={data?.socialLinks?.instagram || "#!"}
                    className="hover:text-royal-gold transition-colors"
                  >
                    <Instagram strokeWidth={1.5} size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          {/* Top Row: Country & Navigation */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-8 text-gray-900">
              {/* India Flag Placeholder or SVG */}
              <span className="text-lg">🇮🇳</span>
              <span className="underline decoration-1 underline-offset-4 text-xs uppercase tracking-wider font-medium">
                India
              </span>
            </div>
          </div>

          {/* Middle Row: Addresses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 text-[11px] text-gray-500 uppercase tracking-widest leading-loose">
            {/* Manufacturer */}
            <div>
              <h4 className="mb-3 text-gray-900 font-medium">
                Full Name and Address of the Manufacturer
              </h4>
              <div className="whitespace-pre-line text-gray-500">
                {data?.mailAddress || defaultMailAddress}
              </div>
              <div className="mt-4">
                <p>Country of Origin: India</p>
              </div>
            </div>

            {/* Importer */}
            <div>
              <h4 className="mb-3 text-gray-900 font-medium">
                Full Name and Address of the Importer
              </h4>
              <div className="whitespace-pre-line text-gray-500">
                {data?.officeAddress || defaultOfficeAddress}
              </div>
              <div className="mt-4 lowercase normal-case tracking-normal">
                <p>
                  Please refer to the product label for specific country of
                  origin for each product.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: Links */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-6 mt-16 text-[13px] text-gray-600">
            <Link
              to="/sitemap"
              className="hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
            >
              Sitemap
            </Link>
            <Link
              to="/legal-privacy"
              className="hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
            >
              Legal & Privacy
            </Link>
            <Link
              to="/cookies"
              className="hover:text-royal-gold hover:underline decoration-1 underline-offset-4 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
