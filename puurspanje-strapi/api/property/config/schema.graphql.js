module.exports = {
	query: `propertyCount(where: JSON): Int!`,
	resolver: {
		Query: {
			propertyCount: {
				description: 'Return the count of properties',
				resolverOf: 'application::property.property.count',
				resolver: async (obj, options, ctx) => {
					return await strapi.api.property.services.property.count(options.where || {});
				},
			},
		},
	},
};