// This syntax was given by NextJS: https://nextjs.org/docs/messages/next-image-unconfigured-host

const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
                pathname: '**'
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '**',
            }
        ],
    },
}

export default nextConfig
