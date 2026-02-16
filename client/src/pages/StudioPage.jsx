import React from "react";
import { Studio } from "sanity";
import { config } from "../sanity.config"; // Adjust path as needed
import { createGlobalStyle } from "styled-components";

// Reset styles for Sanity Studio to prevent conflicts with Tailwind
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    /* Ensure Sanity's font stack takes precedence inside the studio */
  }
`;

const StudioPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* Simple style reset for the studio container */}
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;
