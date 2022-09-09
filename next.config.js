/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["cdn.chec.io"],
	},
	experimental: {
		images: {
			allowFutureImage: true,
		},
	},
};
