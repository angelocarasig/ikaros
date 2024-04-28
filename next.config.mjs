/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'hfropubpkskramopdzbl.supabase.co',
				port: '',
				pathname: '**'
			}
		]
	}
};

export default nextConfig;
