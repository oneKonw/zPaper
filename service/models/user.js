/**
 * Created by wyf on 2017/1/13.
 */
let mongoose =  require('mongoose');
let Schema = mongoose.Schema;

// 数据模型
let userSchema = new Schema({
    username: String,
    password: String,
    salt: String,
	admin: Boolean
});

/**
 *here can add same methods or statics
 */
userSchema.statics.findByUserName=function(username, cb){
    // 这里的this 指的是model
    // RegExp（字符串，匹配模式），g:查找所有匹配，i：不区分大小写，m：多行匹配
    // cb为返回的查询到的值
    return this.find({username:new RegExp(username, 'i')}, cb);
};

module.exports = mongoose.model('User', userSchema);