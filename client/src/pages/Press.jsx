import React, { useEffect, useState } from "react";
import { fetchPressPage } from "../utils/sanity";

import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

const Press = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchPressPage();
      if (result) setData(result);
    };
    load();
  }, []);

  const releases =
    data?.releases && data.releases.length > 0
      ? data.releases
      : [
          {
            date: "October 15, 2025",
            title:
              "Murgdur Unveils ' The Sovereign Winter' Collection in Paris",
            summary:
              "The luxury house marks its debut at Paris Fashion Week with a collection inspired by the royal durbars of 19th century India.",
          },
          {
            date: "August 02, 2025",
            title: "House of Murgdur Appoints New Creative Director",
            summary:
              "Visionary designer Aarav Mehta takes the helm, promising to blend traditional craftsmanship with futuristic silhouettes.",
          },
          {
            date: "June 10, 2025",
            title: "Murgdur Sustainability Report 2024-25",
            summary:
              "Achieving 100% ethical sourcing for all leather goods and launching the 'Green Gold' initiative.",
          },
        ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <SEO
        title={`${data?.heading || "Press & Media"} | Murgdur`}
        description={
          data?.intro ||
          "Latest news, press releases, and media resources from the House of Murgdur."
        }
        url="https://murugdur1.vercel.app/press"
      />

      <div className="pt-32 pb-20 px-6 container mx-auto relative">
        <div className="mb-8">
          <BackButton className="text-gray-400 hover:text-royal-gold" />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-8 text-center">
          {data?.heading || "Press Room"}
        </h1>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-16 text-lg font-light">
          {data?.intro ||
            "Latest news, press releases, and media resources from the House of Murgdur."}
        </p>

        <div className="max-w-5xl mx-auto space-y-8">
          {releases.map((release, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden hover:border-royal-gold/30 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row">
                {release.image && (
                  <div className="md:w-56 shrink-0">
                    <img src={`${release.image}?auto=format&q=80&w=400`} alt={release.title}
                      className="w-full h-48 md:h-full object-cover" />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <span className="text-royal-gold text-xs font-bold uppercase tracking-widest mb-2 block">{release.date}</span>
                    <h2 className="text-2xl font-serif text-gray-900 mb-3">{release.title}</h2>
                    <p className="text-gray-500 font-light text-sm">{release.summary}</p>
                  </div>
                  {release.pdfUrl && (
                    <div className="shrink-0 flex items-start">
                      <a href={release.pdfUrl} target="_blank" rel="noopener noreferrer"
                        className="px-6 py-3 border border-gray-400 text-gray-700 text-xs uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all inline-block">
                        Download PDF
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Downloadable Assets */}
        {data?.downloadableAssets?.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16">
            <h3 className="text-2xl font-serif text-gray-900 mb-6">Media Kit Downloads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.downloadableAssets.map((asset, i) => (
                <a key={i} href={asset.fileUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-lg hover:border-royal-gold/40 transition-all">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{asset.label}</p>
                    {asset.fileType && <p className="text-xs text-gray-400">{asset.fileType}</p>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 text-center pt-20 border-t border-gray-200">
          <h3 className="text-xl font-serif text-gray-900 mb-4">Media Enquiries</h3>
          <p className="text-gray-500 font-light mb-6">
            {data?.mediaContactNote || "For press kits, high-resolution imagery, and interview requests."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <a href={`mailto:${data?.mediaContactEmail || "press@murgdur.com"}`}
              className="text-royal-gold text-lg border-b border-royal-gold/50 hover:border-royal-gold pb-1 transition-all">
              {data?.mediaContactEmail || "press@murgdur.com"}
            </a>
            {data?.mediaContactPhone && (
              <a href={`tel:${data.mediaContactPhone}`}
                className="text-gray-600 text-base hover:text-royal-gold transition-colors">
                {data.mediaContactPhone}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
