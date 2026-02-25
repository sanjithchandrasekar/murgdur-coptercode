import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPage } from "../utils/sanity";
import PageSections from "../components/sections/PageSections";
import { motion } from "framer-motion";

const GenericPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(false);
      const data = await fetchPage(slug);
      if (data) {
        setPageData(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-gray-900">
        <div className="animate-pulse text-xl font-serif">Loading...</div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white text-gray-900">
        <h1 className="text-4xl font-serif mb-4">404</h1>
        <p className="text-gray-500">Page not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-20" // Add padding top for navbar
    >
      <PageSections sections={pageData.pageBuilder} />
    </motion.div>
  );
};

export default GenericPage;
