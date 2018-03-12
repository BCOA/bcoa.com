module.exports = {
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-netlify-cms`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/src/pages/`,
			},
		},
	]
}
