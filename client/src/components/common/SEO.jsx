import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  image,
  url,
  type = "website",
  keywords,
}) => {
  const siteTitle = "Murgdur | Royal Heritage & Luxury";
  const siteName = "Murgdur";
  const metaTitle = title || siteTitle;
  const metaDescription =
    description ||
    "Discover the epitome of luxury tailored for the elite. Timeless fashion, royal aesthetics, and signature collections crafted for modern royalty. Shop premium royal attire, luxury accessories, and bespoke heritage items.";
  const metaImage = image || "https://murugdur1.vercel.app/images/branding/logo.jpeg";
  const metaUrl = url || window.location.href;
  const metaKeywords =
    keywords ||
    "luxury fashion, royal heritage, premium clothing, bespoke accessories, royal attire, murgdur, heritage fashion, luxury lifestyle, royal collection, premium fashion india";

  // Enhanced Schema.org data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Murgdur",
    alternateName: "Murgdur Royal Heritage",
    url: "https://murugdur1.vercel.app/",
    logo: {
      "@type": "ImageObject",
      url: "https://murugdur1.vercel.app/images/branding/logo.jpeg",
    },
    description: metaDescription,
    sameAs: [
      "https://www.facebook.com/murgdur",
      "https://www.instagram.com/murgdur",
      "https://twitter.com/murgdur",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Murgdur",
    url: "https://murugdur1.vercel.app/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://murugdur1.vercel.app/shop?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Murgdur" />
      <link rel="canonical" href={metaUrl} />

      {/* Robots */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@murgdur" />
      <meta name="twitter:creator" content="@murgdur" />

      {/* Mobile & PWA */}
      <meta name="theme-color" content="#000000" />
      <meta name="application-name" content="Murgdur" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Murgdur" />
      <meta name="format-detection" content="telephone=no, address=no, email=no" />

      {/* Schema.org JSON-LD-Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Schema.org JSON-LD-WebSite */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
