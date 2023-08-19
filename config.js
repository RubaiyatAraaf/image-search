module.exports = {
    cseId: process.env.GOOGLE_CSE_ID,
    apiKey: process.env.GOOGLE_API_KEY,
    port: process.env.PORT || 8080,
    mongoDBUri: process.env.MONGODB_URI || 'mongodb://localhost/image-search'
}