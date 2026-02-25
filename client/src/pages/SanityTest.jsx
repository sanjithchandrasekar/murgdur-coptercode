import React, { useState, useEffect } from "react";
import {
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Server,
  Image as ImageIcon,
  Box,
} from "lucide-react";
import { client } from "../utils/sanity";

const HealthIndicator = ({ status, label, details }) => {
  let color = "text-gray-400";
  let bgColor = "bg-gray-200/50";
  let icon = <RefreshCw className="animate-spin" size={20} />;

  if (status === "success") {
    color = "text-green-500";
    bgColor = "bg-green-500/10 border-green-500/30";
    icon = <CheckCircle size={20} />;
  } else if (status === "error") {
    color = "text-red-500";
    bgColor = "bg-red-500/10 border-red-500/30";
    icon = <XCircle size={20} />;
  } else if (status === "warning") {
    color = "text-yellow-500";
    bgColor = "bg-yellow-500/10 border-yellow-500/30";
    icon = <AlertTriangle size={20} />;
  }

  return (
    <div
      className={`p-4 rounded-lg border ${bgColor} flex items-start gap-4 mb-4 transition-all duration-300`}
    >
      <div className={`mt-1 ${color}`}>{icon}</div>
      <div className="flex-1">
        <h3 className={`font-bold ${color}`}>{label}</h3>
        <p className="text-sm text-gray-300 mt-1 font-mono whitespace-pre-wrap">
          {details}
        </p>
      </div>
    </div>
  );
};

const SanityHealthCheck = () => {
  const [mongoStatus, setMongoStatus] = useState({
    status: "loading",
    message: "Connecting...",
  });
  const [sanityStatus, setSanityStatus] = useState({
    status: "loading",
    message: "Connecting...",
  });
  const [assetStatus, setAssetStatus] = useState({
    status: "loading",
    message: "Checking assets...",
  });

  // Test MongoDB Connection via Backend API
  const testMongo = async () => {
    setMongoStatus({ status: "loading", message: "Pinging Backend API..." });
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const res = await fetch(`${apiUrl}/test-db`);

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error(
          `Invalid JSON response (${res.status} ${res.statusText})`,
        );
      }

      if (!res.ok)
        throw new Error(data.error || data.message || res.statusText);

      if (data.success) {
        setMongoStatus({
          status: "success",
          message: "Connected to MongoDB Atlas successfully.",
        });
      } else {
        setMongoStatus({
          status: "error",
          message: data.error || "Unknown database error",
        });
      }
    } catch (err) {
      setMongoStatus({ status: "error", message: `Failed: ${err.message}` });
    }
  };

  // Test Sanity CMS Connectivity
  const testSanity = async () => {
    setSanityStatus({
      status: "loading",
      message: "Verifying Content Lake...",
    });
    try {
      // Fetch Site Settings as a connectivity check
      const settings = await client.fetch(
        '*[_type == "siteSettings"][0]{title}',
      );
      const productCount = await client.fetch('count(*[_type == "product"])');

      if (settings) {
        setSanityStatus({
          status: "success",
          message: `Connected to Sanity.io.\nProject ID: Verified\nTotal Products: ${productCount}`,
        });
      } else {
        setSanityStatus({
          status: "warning",
          message: `Connected, but 'siteSettings' document is missing.\nTotal Products: ${productCount}`,
        });
      }
    } catch (err) {
      console.error(err);
      setSanityStatus({
        status: "error",
        message: `Sanity Connection Failed: ${err.message}\nCheck your Project ID and permissions.`,
      });
    }
  };

  // Test Asset Loading (Image Pipeline)
  const testAssets = async () => {
    setAssetStatus({
      status: "loading",
      message: "Verifying Image Pipeline...",
    });
    try {
      // Fetch the first product image to verify CDN
      const product = await client.fetch(
        '*[_type == "product" && defined(mainImage)][0]{ "url": mainImage.asset->url }',
      );

      if (product && product.url) {
        setAssetStatus({
          status: "success",
          message: `Image Delivery Network is Operational.\nSample: ${product.url.substring(0, 40)}...`,
        });
      } else {
        setAssetStatus({
          status: "warning",
          message:
            "No product images found to test. Add products with images in CMS.",
        });
      }
    } catch (err) {
      setAssetStatus({
        status: "error",
        message: `Asset Check Failed: ${err.message}`,
      });
    }
  };

  useEffect(() => {
    testMongo();
    testSanity();
    testAssets();
  }, []);

  const runAllTests = () => {
    testMongo();
    testSanity();
    testAssets();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 pt-32 flex flex-col items-center font-sans">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif text-royal-gold mb-2">
            System Diagnostic Dashboard
          </h1>
          <p className="text-gray-400">
            Real-time health check for all application services
          </p>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">Service Status</h2>
            <button
              onClick={runAllTests}
              className="flex items-center gap-2 px-4 py-2 bg-royal-gold/20 text-royal-gold hover:bg-royal-gold/30 rounded-lg transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} /> Run Diagnostics
            </button>
          </div>

          <div className="grid gap-2">
            {/* Database Check */}
            <HealthIndicator
              status={mongoStatus.status}
              label="User Database (MongoDB)"
              details={mongoStatus.message}
              icon={<Database />}
            />

            {/* CMS Check */}
            <HealthIndicator
              status={sanityStatus.status}
              label="Content Management System (Sanity)"
              details={sanityStatus.message}
              icon={<Server />}
            />

            {/* Asset Check */}
            <HealthIndicator
              status={assetStatus.status}
              label="Media & Asset Delivery"
              details={assetStatus.message}
              icon={<ImageIcon />}
            />
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-200 text-xs text-gray-500 font-mono">
            <p className="mb-2 uppercase tracking-wider font-bold text-gray-600">
              Environment Details
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                API_URL: {import.meta.env.VITE_API_URL || "(default local)"}
              </div>
              <div>MODE: {import.meta.env.MODE}</div>
              <div>PLATFORM: Web</div>
              <div>BUILD: {new Date().toISOString().split("T")[0]}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Designed for easy verification by administrative staff.</p>
        </div>
      </div>
    </div>
  );
};

export default SanityHealthCheck;
