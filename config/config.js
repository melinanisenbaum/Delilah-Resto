module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || '3000',
    DB_DATABASE: process.env.DB_DATABASE || 'delilahResto',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'rootserver',
    DB_DIALECT: 'mysql',
    DB_PORT: process.env.PORT || '3300',
    TOKENSECRET: process.env.TOKENSECRET || 'xZ+WxZW<\6r%h(:Q'
}
