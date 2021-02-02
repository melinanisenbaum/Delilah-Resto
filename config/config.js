module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || '3300',
    DB_DATABASE: 'delilahResto',
    DB_USERNAME: 'rootserver',
    DB_PASSWORD: 'rootserver',
    DB_DIALECT: 'mysql',
    DB_PORT: process.env.PORT || '3306'
}
