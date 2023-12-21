module.exports = {
  query: `blogCount(where: JSON): Int!`,
  resolver: {
    Query: {
      blogCount: {
        description: "Return the count of blog posts",
        resolverOf: "application::blog.blog.count",
        resolver: async (obj, options, ctx) => {
          return await strapi.api.blog.services.blog.count(options.where || {});
        },
      },
    },
  },
};
