/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["kuvdmztnxdacvqvwccwm.supabase.co"], // Add your Supabase storage hostname here
  },
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.cache = false; // Disable Webpack caching in development
    } else {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        store: 'pack',
        cacheLocation: 'node_modules/.cache/webpack',
        managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
      };
    }

    return config;
  },
};

module.exports = nextConfig;
