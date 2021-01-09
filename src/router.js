import Vue from  'vue'
import Router from  'vue-router'
import routes from "./comon/config/router";

// 重复点击报错
const originalPush = Router.prototype.push

Router.prototype.push = function push (localtion) { 
    return originalPush.call(this,localtion).catch(err => err)
}

Vue.use(Router)

export default new Router(
    {
        routes
    }
)
