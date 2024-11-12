/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure splitChunks is an object before modifying
      if (typeof config.optimization.splitChunks === 'object') {
        // Modify existing splitChunks configuration
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          maxInitialRequests: Math.max(25, config.optimization.splitChunks.maxInitialRequests || 0),
          maxAsyncRequests: Math.max(25, config.optimization.splitChunks.maxAsyncRequests || 0),
          minSize: Math.min(20000, config.optimization.splitChunks.minSize || Infinity),
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            default: false,
          },
        };
      } else {
        // If splitChunks is not an object, create a new configuration
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
          },
        };
      }
    }
    return config;
  },
  onDemandEntries: {
    // Increase the timeout for page compilation
    maxInactiveAge: 60 * 60 * 1000,
    // Increase the number of pages that should be kept simultaneously in memory
    pagesBufferLength: 5,
  },
    // Add async rewrites function for custom routing
  async rewrites() {
    return [
      {
        source: '/catalog/:category',
        destination: '/catalog?category=:category',
      },
      // Add more rewrite rules as needed
    ];
  }
};

export default nextConfig;