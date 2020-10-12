const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'

    console.log(`isDev:${isDev}  isProd:${isProd} `)

    const env = {
        SERVER_URL: (() => {
            if (isDev) return 'http://localhost:3001/'
            if (isProd) {
                return 'http://localhost:3001/'
            }
            return 'BAD URL'
        })(),
    }

    return {
        env,
    }
}