// ==UserScript==
// @name        雀魂麻将脚本
// @description 用于雀魂麻将的简易脚本
// @namespace   game.maj-soul.com
// @match       *://game.maj-soul.com/1/
// @icon        https://game.maj-soul.com/1/favicon.ico
// @grant       none
// @version     1.0
// @author      bin
// ==/UserScript==

/**
 * @param {any}object 
 * @param {string|number}field
 * @param {Function}callback
 */
const hook = (object, field, callback) => {
  if (object == null || field == null || callback == null) {
    return console.log(`参数不能为空`);
  }
  let orgin = object[field];
  object[field] = function (...args) {
    callback(...args);
    orgin.call(this, ...args)
  }
}
const runner = () => {
  //使用steam服务器
  hook(app.NetAgent, "init", () => {
    console.log("加入steam服务器");
    GameMgr.config_data.ip[0].region_urls.unshift("http://47.114.218.120:4201/api/v0/recommend_list")
  })
}


new Promise((res) => {
  let interval = setInterval(() => {
    if (window.game != undefined) {
      clearInterval(interval);
      console.log("游戏已加载");
      res();
    }
  }, 1000);
}).then(() => runner());