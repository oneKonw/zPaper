let express = require('express');
let router = express.Router();

const routerAuth = function (req, res, next) {
    // 对业务数据路由进行拦截
    console.log(req.url);
    // 检查路劲是否符合正则表达式 /\/api\// ，符合返回true
    if (/\/api\//.test(req.url)) {
        let currentUser = req.session.userInfo;
        if (currentUser && currentUser._id && currentUser.username) {
            next();
        } else {
            res.send({
                isAuth: false,
            });
        }
    } else {
        next();
    }
};

module.exports = routerAuth;
