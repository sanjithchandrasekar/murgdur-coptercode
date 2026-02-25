import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchPolicyPage } from "../utils/sanity";
import SEO from "../components/common/SEO";
import { PortableText } from "@portabletext/react";

const portableComponents = {
  block: {
    normal: ({ children }) => <p className="text-gray-600 leading-relaxed mb-4">{children}</p>,
    h1: ({ children }) => <h1 className="text-gray-900 font-serif text-3xl mb-4 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-royal-gold text-xl font-serif mb-3 mt-6 uppercase tracking-wide">{children}</h2>,
    h3: ({ children }) => <h3 className="text-gray-900 font-serif text-lg mb-2 mt-5">{children}</h3>,
    h4: ({ children }) => <h4 className="text-gray-800 font-semibold text-base mb-1 mt-4">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-royal-gold pl-4 italic text-gray-500 my-4">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-4">{children}</ol>,
  },
  listItem: { bullet: ({ children }) => <li>{children}</li>, number: ({ children }) => <li>{children}</li> },
  marks: {
    strong: ({ children }) => <strong className="text-gray-900 font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target={value?.blank ? "_blank" : "_self"} rel="noopener noreferrer" className="text-royal-gold hover:underline">{children}</a>
    ),
  },
  types: {
    infobox: ({ value }) => (
      <div className="border border-gray-200 bg-gray-50 rounded p-6 my-4 text-left">
        {value.title && <h3 className="text-gray-900 font-serif text-xl mb-2">{value.title}</h3>}
        {value.text && <p className="whitespace-pre-line text-gray-600">{value.text}</p>}
      </div>
    ),
  },
};

const InfoPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const slug = path.substring(1); // e.g. 'cancellation' from '/cancellation'

  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchPolicyPage(slug);
      if (result) setSanityData(result);
      else setSanityData(null); // Reset if not found
    };
    load();
  }, [slug]);

  // Default title from path
  const defaultTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const pageContent = {
    "/cancellation": {
      title: "Cancellation & Returns",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            At Murgdur, we pride ourselves on the exquisite quality of our
            craftsmanship. If you are not entirely satisfied with your purchase,
            we offer a transparent and seamless return process.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Return Policy
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Items can be returned within <strong>15 days</strong> of
                delivery.
              </li>
              <li>
                The product must be unused, unwashed, and with all original tags
                and packaging intact.
              </li>
              <li>
                Personalized or made-to-order items are{" "}
                <strong>non-returnable</strong> unless there is a manufacturing
                defect.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Refund Process
            </h3>
            <p>
              Once your return is received and inspected, we will notify you of
              the approval. Refunds will be processed to your original method of
              payment within <strong>5-7 business days</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Cancellations
            </h3>
            <p>
              Orders can be cancelled within 24 hours of placement. Please
              contact our concierge immediately at{" "}
              <span className="text-royal-gold">support@murgdur.com</span>.
            </p>
          </div>
        </div>
      ),
    },
    "/terms": {
      title: "Terms of Use",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            Welcome to the House of Murgdur. By accessing our website, you agree
            to be bound by the following terms and conditions.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Intellectual Property
            </h3>
            <p>
              All content included on this site, such as text, graphics, logos,
              images, and software, is the property of Murgdur Private Limited
              and is protected by Indian and international copyright laws.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Product Accuracy
            </h3>
            <p>
              We have made every effort to display as accurately as possible the
              colors and images of our products. We cannot guarantee that your
              computer monitor's display of any color will be accurate.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Governing Law
            </h3>
            <p>
              These Terms, including any policies referenced herein, shall be
              governed by and construed in accordance with the laws of India and
              the courts of Bengaluru shall have exclusive jurisdiction.
            </p>
          </div>
        </div>
      ),
    },
    "/security": {
      title: "Security",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            Your security is paramount to the Murgdur experience. We employ
            state-of-the-art measures to ensure your data remains protected.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Secure Transactions
            </h3>
            <p>
              All transactions are processed through secure gateways encrypted
              with 256-bit SSL technology. We do not store your credit card or
              banking information on our servers.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Data Protection
            </h3>
            <p>
              We maintain rigorous physical, electronic, and procedural
              safeguards to protect your personal information against
              unauthorized access or disclosure.
            </p>
          </div>
        </div>
      ),
    },
    "/privacy": {
      title: "Privacy Policy",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            Murgdur is committed to respecting your privacy. This policy
            outlines how your personal information is collected, used, and
            treated.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Information We Collect
            </h3>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, make a purchase, or sign up for our
              newsletter. This includes your name, email, shipping address, and
              phone number.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Use of Information
            </h3>
            <p>
              We use your information solely to expedite your orders, improve
              your shopping experience, and communicate with you about our
              products. We <strong>never</strong> sell or share your data with
              third parties for marketing purposes.
            </p>
          </div>
        </div>
      ),
    },
    "/sitemap": {
      title: "Sitemap",
      content: (
        <div className="text-left max-w-lg mx-auto text-gray-700">
          <div className="grid grid-cols-2 gap-8 text-gray-600 font-light">
            <div>
              <h3 className="text-royal-gold font-bold mb-4 uppercase text-xs tracking-widest">
                Main
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-royal-gold">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-royal-gold">
                    Shop Collection
                  </Link>
                </li>
                <li>
                  <Link to="/heritage" className="hover:text-royal-gold">
                    Our Heritage
                  </Link>
                </li>
                <li>
                  <Link to="/royal-collection" className="hover:text-royal-gold">
                    Royal Collection
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-royal-gold font-bold mb-4 uppercase text-xs tracking-widest">
                Information
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-royal-gold">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-royal-gold">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-royal-gold">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="hover:text-royal-gold">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    "/grievance": {
      title: "Grievance Redressal",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            In accordance with the Information Technology Act, 2000 and rules
            made there under, the name and contact details of the Grievance
            Officer are provided below:
          </p>

          <div className="bg-gray-100 border border-gray-200 p-6 rounded text-sm">
            <p className="mb-2">
              <strong className="text-gray-900">Name:</strong> Mr. Arjun Rathore
            </p>
            <p className="mb-2">
              <strong className="text-gray-900">Designation:</strong> Grievance
              Officer
            </p>
            <p className="mb-2">
              <strong className="text-gray-900">Address:</strong> Murgdur Private
              Limited, Embassy Tech Village, Bengaluru, Karnataka-560103
            </p>
            <p className="mb-2">
              <strong className="text-gray-900">Phone:</strong> +91-80-1234-5678
              (Mon-Fri, 9:30 AM-6:30 PM)
            </p>
            <p>
              <strong className="text-gray-900">Email:</strong>{" "}
              grievance@murgdur.com
            </p>
          </div>

          <p>
            We are committed to resolving your concerns within 30 days of
            receipt of the grievance.
          </p>
        </div>
      ),
    },
    "/epr": {
      title: "EPR Compliance",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            As a responsible luxury brand, Murgdur is dedicated to environmental
            sustainability and complying with E-Waste (Management) Rules.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Our Commitment
            </h3>
            <p>
              We ensure that our electronic waste is channelized to authorized
              recyclers and dismantlers. We encourage our customers to return
              end-of-life electronic products to our designated collection
              centers.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">Packaging</h3>
            <p>
              Our packaging is designed to be minimal and recyclable. We are
              actively working towards eliminating single-use plastics from our
              supply chain by 2026.
            </p>
          </div>
        </div>
      ),
    },
    "/payments": {
      title: "Payment Methods",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            We offer a secure and seamless checkout experience with diverse
            payment options tailored for your convenience.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Accepted Methods
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Credit and Debit Cards (Visa, MasterCard, Rupay, Amex)</li>
              <li>Net Banking (All major Indian banks)</li>
              <li>UPI (GPay, PhonePe, Paytm, BHIM)</li>
              <li>
                Cash on Delivery (Available for select pin codes up to ₹20,000)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Security Assurance
            </h3>
            <p>
              All online transactions are processed through Razorpay's secure
              payment gateway, which is PCI-DSS Level 1 compliant. We practice
              best-in-class security standards to ensure your financial data is
              never compromised.
            </p>
          </div>
        </div>
      ),
    },
    "/shipping": {
      title: "Shipping Policy",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            Experience the joy of receiving your Murgdur treasure with our
            premium delivery service.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Dispatch & Delivery
            </h3>
            <p>
              We strive to dispatch all orders within 24-48 hours. Standard
              domestic delivery takes 3-5 business days. Expedited shipping
              options are available at checkout for urgent requests.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">Tracking</h3>
            <p>
              Once your order is shipped, you will receive a tracking link via
              email and SMS. You can also track your order status in real-time
              from your account dashboard.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              International Shipping
            </h3>
            <p>
              We ship globally to over 100 countries. International shipping
              rates vary by location and weight. Customs duties, if applicable,
              are borne by the customer.
            </p>
          </div>
        </div>
      ),
    },
    "/faq": {
      title: "Frequently Asked Questions",
      content: (
        <div className="text-left space-y-8 text-gray-600 font-light">
          <div>
            <h3 className="text-gray-900 font-serif text-lg mb-2">
              How do I determine the right size?
            </h3>
            <p>
              We provide detailed size guides on every product page. If you need
              personalized assistance, our stylists are available via chat or
              email to help you find the perfect fit.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-lg mb-2">
              Can I modify my order after placing it?
            </h3>
            <p>
              We process orders quickly, but if you contact us within 2 hours of
              placing your order, we may be able to make changes. Please reach
              out to{" "}
              <span className="text-royal-gold">support@murgdur.com</span>.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-serif text-lg mb-2">
              Do you offer gift packaging?
            </h3>
            <p>
              Yes, every Murgdur order comes in our signature luxury packaging.
              You can also add a personalized note at checkout for gifting.
            </p>
          </div>
          <div>
            <h3 className="text-gray-900 font-serif text-lg mb-2">
              Are your products made from genuine leather?
            </h3>
            <p>
              Yes, we use only the finest, ethically sourced full-grain leathers
              for our goods. Each piece comes with a certificate of
              authenticity.
            </p>
          </div>
        </div>
      ),
    },
    "/report": {
      title: "Report Infringement",
      content: (
        <div className="text-left space-y-6 text-gray-600 font-light">
          <p>
            Murgdur respects the intellectual property rights of others and
            expects its users to do the same.
          </p>

          <div>
            <h3 className="text-gray-900 font-serif text-xl mb-2">
              Reporting Process
            </h3>
            <p>
              If you believe that your intellectual property rights have been
              violated by any content on our website, please provide the
              following information to our Legal Department:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>
                Description of the copyrighted work/IP claimed to be infringed.
              </li>
              <li>URL or location of the infringing material on our site.</li>
              <li>Your contact information (Address, Email, Phone).</li>
              <li>
                A statement that you have a good faith belief that the use is
                not authorized.
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <p>Please send your notice to:</p>
            <p className="mt-2 text-gray-900 font-bold">Legal Department</p>
            <p>Murgdur Private Limited</p>
            <p>legal@murgdur.com</p>
          </div>
        </div>
      ),
    },
  };

  // Use Sanity data if available, otherwise fallback
  const currentData = sanityData
    ? {
        title: sanityData.title,
        content: sanityData.content ? (
          <div className="text-left space-y-2">
            <PortableText value={sanityData.content} components={portableComponents} />
          </div>
        ) : null,
      }
    : pageContent[path] || { title: defaultTitle, content: null };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <SEO
        title={`${currentData.title} | Murgdur Information`}
        description={`Read about Murgdur's ${currentData.title}. Essential information regarding our policies, services, and commitment to excellence.`}
        url={`https://murugdur1.vercel.app${path}`}
      />
      <div className="container mx-auto max-w-4xl text-center">
        <span className="text-royal-gold uppercase tracking-widest text-sm font-bold">
          Murgdur Heritage
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mt-4 mb-8">
          {currentData.title}
        </h1>

        <div className="w-24 h-1 bg-royal-gold mx-auto mb-12"></div>

        <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 rounded-lg shadow-sm">
          {currentData.content ? (
            currentData.content
          ) : (
            <div className="text-center">
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
                Our digital artisans are currently crafting this section of the
                Royal Experience. The {currentData.title} page will be unveiled
                shortly.
              </p>
              <Link to="/shop">
                <button className="bg-royal-gold text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            to="/"
            className="text-gray-500 hover:text-royal-gold text-sm uppercase tracking-widest transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
