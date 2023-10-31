/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env: {
        title: 'Linkinbio App Ni Ozy',
        description: 'Welcome to my Link In Bio application.'
    }
}

module.exports = nextConfig
