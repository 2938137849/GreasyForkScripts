// ==UserScript==
// @name        雀魂麻将脚本
// @description 用于雀魂麻将的简易脚本
// @namespace   game.maj-soul.com
// @match       *://game.maj-soul.com/1/
// @icon        https://game.maj-soul.com/1/favicon.ico
// @grant       none
// @version     1.1
// @author      bin
// ==/UserScript==

// 不需要的功能只需要在对应的大括号前加上`/*`
const runner = () => {
  { //js弹出框替换完成
    /**
     * 提示框
     * @param {(text:string)=>void} text "sometext"
     * @param {boolean} short 为true时表示弹出框是否需要手动关闭(item get)
     */
    window.alert = (text, short) => {
      if (!short) uiscript.UI_InfoLite.Inst.show(text);
      else uiscript.UI_LightTips.Inst.show(text);
    };
    /**
     * 确认框
     * @param {string} text 内容
     * @param {()=>void} fix 确定按钮回调函数
     * @param {()=>void} cancel 取消按钮回调函数
     */
    window.confirm = (text, fix, cancel) => {
      text == undefined && (text = null);
      fix == undefined && (fix = null);
      cancel == undefined && (cancel = null);
      let a = new uiscript.UI_SecondConfirm();
      a.onCreate();
      uiscript.UIMgr.Inst.AddLobbyUI(a);
      Laya.timer.frameOnce(5, this, () => {
        a.show(text, new Laya.Handler(window, fix), new Laya.Handler(window, cancel));
      })
    };
    /**
     * 输入框
     * @param {string} title 标题 
     * @param {string} tipsText 输入提示
     * @param {(text:string)=>boolean} fix 确定按钮回调函数,参数为文本框中的内容,返回true时防止关闭UI
     * @param {()=>boolean} cancel 取消按钮回调函数,返回true时防止关闭UI
     * @param {string} fixText 确认按钮显示的文本,默认为确认
     * @param {string} cancelText 取消按钮显示的文本,默认为取消
     */
    window.prompt = (title, tipsText, fix, cancel, fixText, cancelText) => {
      title == undefined && (title = null);
      tipsText == undefined && (tipsText = null);
      typeof fix == "function" || (fix = e => false);
      typeof cancel == "function" || (cancel = e => false);
      fixText == undefined && (fixText = "取消");
      cancelText == undefined && (cancelText = "确定");
      let a = new uiscript.UI_Nickname();
      // a.onCreate();
      uiscript.UIMgr.Inst.AddLobbyUI(a);
      Laya.timer.frameOnce(5, this, () => {
        a.root._childs[2]._$set_text(title);
        a.root._childs[4]._$set_text(tipsText);
        a.root._childs[10]._childs[0]._$set_text(fixText);
        a.root._childs[10].clickHandler = new Laya.Handler(window, e => !cancel() && a.destroy())
        a.root._childs[8]._childs[0]._$set_text(cancelText);
        a.root._childs[8].clickHandler = new Laya.Handler(window, e => !fix(a.input.text) && a.destroy());
        a.show();
      });

    };
    /**
     * 数字输入框,最大支持输入10位数
     * @param {string} text 内容
     * @param {(num:number)=>void} fix 确定按钮回调函数,参数为输入的数字
     * @param {()=>void} cancel 取消按钮回调函数
     */
    window.numberPrompt = (text, fix, cancel) => {
      text == undefined && (text = null);
      fix == undefined && (fix = null);
      cancel == undefined && (cancel = null);
      let a = new uiscript.UI_NumberInput();
      uiscript.UIMgr.Inst.AddLobbyUI(a);
      Laya.timer.frameOnce(5, this, () => {
        a.show(text, new Laya.Handler(window, fix), new Laya.Handler(window, cancel));
      })
    }
    console.log("js弹出框替换完成")
  } //*/
  { //副露占位
    let color = new Laya.Vector4(1, 1, 1, .4);
    view.Block_QiPai.prototype.QiPaiNoPass = function () {
      this.last_pai.lastColor = color;
      this.last_pai.model.meshRender.sharedMaterial.blend = 2;
      this.last_pai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, this.last_pai.lastColor);
      this.last_pai.val.type += 10;
      this.QiPaiPass();
    }

    const OnChoosedPai = view.ViewPai.prototype.OnChoosedPai;
    view.ViewPai.prototype.OnChoosedPai = function () {
      if (this.lastColor !== undefined) {
        this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, this.lastColor);
      } else {
        OnChoosedPai.call(this);
      }
    }
    console.log("副露占位 开");
  } //*/
}



new Promise((res) => {
  let interval = setInterval(() => {
    if (window.game === undefined) return;
    clearInterval(interval);
    console.log("游戏已加载");
    res();
  }, 100);
}).then(() => runner());