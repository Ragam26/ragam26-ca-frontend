/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			/**
			 * Proxy ALL API requests to backend
			 * Example:
			 * localhost:3000/api/users
			 * → https://api.ca.ragam.co.in/api/users
			 */
			{
				source: '/api/:path*',
				destination: `${process.env.API_BASE_URL}/api/:path*`,
			},
		]
	},
}

module.exports = nextConfig
