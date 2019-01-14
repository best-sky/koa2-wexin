const Xml2Js = require('xml2js');
const Template = require('./tpl');

const ParseXML = xml => {
    return new Promise((resolve, reject)=>{
        Xml2Js.parseString(xml, {
            trim: true,
        }, (err, content)=>{
            if(err){
                reject(err);
            }else{
                resolve(content);
            }
        });
    });
};

const FormatMessage = content =>{
    let message = {};
    if("object" === typeof content){
        const Keys = Object.keys(content);
        for(let i = 0; i < Keys.length; i++){
            let key = Keys[i];
            let item = content[key];
            if(!(item instanceof Array) || 0===item.length){
                continue;
            }
            if(1===item.length){
                let val = item[0];
                if("object" === typeof val){
                    message[key] = FormatMessage(val);
                }else{
                    message[key] = (val || '').trim();
                }
            }else{
                message[key] = [];
                for(let j=0;j<item.length;j++){
                    message[key].push(FormatMessage(item[j]));
                }
            }
        }
    }
    return message;
};

const Tpl = (content, message)=>{
    let type = "text";
    if(Array.isArray(content)){
        type = 'news';
    }
    if(!content){
        content = "Empty News";
    }
    if(content && content.type){
        type = content.type;
    }
    let info = Object.assign({}, {
        content: content,
        msgType: type,
        createTime: new Date().getTime(),
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
    });
    return Template(info);
};

module.exports = {
    ParseXML,
    FormatMessage,
    Tpl,
};