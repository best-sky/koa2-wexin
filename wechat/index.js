const WeChat = require('../wechat-lib');
const Config = require('../config');
const Mongoose = require('mongoose');

const Token = Mongoose.model('Token');

const WeChatConfig = {
    weChat: {
        appID: Config.WECHAT.AppID,
        appSecret: Config.WECHAT.AppSecret,
        token: Config.WECHAT.Token,
        async getAccessToken(){
            const Res = await Token.getAccessToken();
            return Res;
        },
        async saveAccessToken(data){
            const Res = await Token.saveAccessToken(data);
            return Res;
        },
    },
};

exports.getWeChat = () => new WeChat(WeChatConfig.weChat);