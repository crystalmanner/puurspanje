const imageDomain = process.env.NEXT_PUBLIC_STRAPI_API_URL && process.env.NEXT_PUBLIC_STRAPI_API_URL.replace(/.*\:\/\/?([^\/|:]+).*/g, '$1') || "";

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{
                loader: "@svgr/webpack",
                options: {
                    svgoConfig: {
                        plugins: {
                            removeViewBox: false
                        }
                    }
                }
            }]
        });
        return config;
    },
    images: {
        domains: ["res.cloudinary.com", imageDomain],
    },
}