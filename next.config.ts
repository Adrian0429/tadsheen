import { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "ar"], 
    defaultLocale: "en",  
    localeDetection: false,
  },
};

export default nextConfig;
