const PORT = 3000;
const WECHAT = {
    AppID: 'wx930d8776d1651bba',
    AppSecret: 'c9023528601289ef457d2e8f61ef6413',
    Token: 'wohuizhenxini21',    
};
const MONGO_HOST = '127.0.0.1';
const MONGO_PORT = 27017;
const MONGO_DB = 'wechat';
const MONGODB = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = {
    PORT,
    WECHAT,
    MONGODB,
};
