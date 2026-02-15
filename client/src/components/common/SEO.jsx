import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = "website" }) => {
    const siteTitle = "Murgdur | Royal Heritage & Luxury";
    const metaTitle = title ? `${title} | Murgdur` : siteTitle;
    const metaDescription = description || "Discover the epitome of luxury tailored for the elite. Timeless fashion, royal aesthetics, and signature collections crafted for modern royalty.";
    const metaImage = image || "https://murugdur1.vercel.app/images/logo.jpeg";
    const metaUrl = url || "https://murugdur1.vercel.app/";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Murgdur",
        "url": "https://murugdur1.vercel.app/",
        "logo": "https://murugdur1.vercel.app/images/logo.jpeg",
        "sameAs": [
            "https://www.facebook.com/murgdur",
            "https://www.instagram.com/murgdur",
            "https://twitter.com/murgdur"
        ]
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={metaTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
