module.exports = {
  webpack: (config, webpack) => {
    // Add your variable using the DefinePlugin
    config.plugins.push(
      new webpack.DefinePlugin({
        //All your custom ENVs that you want to use in frontend
        ENV: {
          GOOGLE_MAPS_TOKEN: JSON.stringify(process.env.GOOGLE_MAPS_TOKEN),
        },
      })
    );
    // Important: return the modified config
    return config;
  },
};