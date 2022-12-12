// This syntax was given by NextJS: https://nextjs.org/docs/messages/next-image-unconfigured-host

const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
                pathname: '**'
            },
        ],
    },
}

export default nextConfig
