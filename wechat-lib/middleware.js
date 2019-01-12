const Sha1 = require('sha1');
const GetRawBody = require('raw-body');
const Util = require('./util');

module.exports = (opts, reply)=>{
    return async (context, next)=>{
        let {
            signature,
            timestamp,
            nonce,
            echostr
        } = context.query;
        console.log(context.query)
        const Token = opts.Token;
        let str = [Token, timestamp, nonce].sort().join('');
        const Sha = Sha1(str); 
        if("GET" === context.method){
            if(Sha === signature){
                context.body = echostr;
            }else{
                context.body = "Falied";
            }            
        }else if("POST" === context.method){
            if(Sha !== signature){
                return (context.body = "Falied");
            }
            const Data = await GetRawBody(context.req, {
                length: context.length,
                limit: '1mb',
                encoding: context.charset,
            });
            const Content = await Util.ParseXML(Data);
            const Message = Util.FormatMessage(Content.xml);
            context.weixin = Message;
            await reply.apply(context, [context, next]);
            const ReplyBody = context.body;
            const Msg = context.weixin;
            const Xml = Util.Tpl(ReplyBody, Msg);
            console.log(Xml)
            context.status = 200;
            context.type = "application/xml";
            context.body = Xml;
        }
    };
};
