import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split chunks for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate Three.js into its own bundle
            three: {
              test: /[\\/]node_modules[\\/](three)[\\/]/,
              name: 'three',
              priority: 10,
              reuseExistingChunk: true,
            },
            // Separate URDF loader
            urdf: {
              test: /[\\/]node_modules[\\/](urdf-loader)[\\/]/,
              name: 'urdf-loader',
              priority: 10,
              reuseExistingChunk: true,
            },
            // Common vendor bundle
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Ignore certain large dependencies that aren't needed client-side
      config.resolve.alias = {
        ...config.resolve.alias,
        // Prevent bundling of certain server-only modules
        'fs': false,
        'path': false,
      };
    }
    
    return config;
  },

  // Enable experimental features for better performance
  experimental: {
    // optimizeCss requires 'critters' package which is not installed
    optimizePackageImports: ['three'],
  },
};

export default nextConfig;