const Mongoose = require('mongoose');
const { resolve } = require('path');
const glob = require('glob');

Mongoose.Promise = global.Promise;

exports.Connect = (db)=>{
    let maxConnectTimes = 0;
    return new Promise((reslove)=>{
        if(process.env.NODE_ENV !== 'production'){
            Mongoose.set('debug', true);
        }
        Mongoose.connect(db,{useNewUrlParser: true});
        Mongoose.connection.on('disconnect', ()=>{
            maxConnectTimes++;
            if(maxConnectTimes < 5){
                Mongoose.connect(db);
            }else{
                throw new Error("数据库挂了~");
            }
        });
        Mongoose.connection.on('error', (err)=>{
            maxConnectTimes++;
            if(maxConnectTimes < 5){
                Mongoose.connect(db);
            }else{
                throw new Error("数据库连接出错了~");
            }
        });
        Mongoose.connection.on('open', ()=>{
            console.log('MongoDB connected');
            reslove();
        });
    });
};

exports.InitSchemas = ()=>{
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
};