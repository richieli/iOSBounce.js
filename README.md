# iOSBounce
移动端web开发中，滚动事件对象通常是window，但在ios下，这一事件会引起绝对定位元素（顶部栏、底部栏）失效，即：当滚动到页面的上下边缘时，绝对定位元素会随touchmove事件发生偏移。
解决ios下这一缺陷的关键在于将滚动事件对象改为某一元素，并做相应的逻辑处理，该框架使用简短的代码来改善此缺陷。

# 使用说明
_____________________________________
|                                   |
|             #top                  |
|          固定在顶部                |
—————————————————————————————————————
|                                   |
|                                   |             iOSBounce.fix(id, otherIDs);
|                                   |
|                                   |             参数说明：
|                                   |             id: {string} 滚动元素id 如(center);
|           #center                 |             otherIDs: {array} 固定元素id 如(top,bottom);
|           滚动元素                 |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
—————————————————————————————————————
|                                   |
|               #bottom             |
|              固定在底部            |
—————————————————————————————————————

# 示例

html结构：

<div id="top" class="top">xxx</div>//固定在屏幕顶部
<div id="center" class="center">xxx</div>//滚动
<div id="bottom" class="bottom">xxx</div>//固定在屏幕底部

css样式：

.top {
  position: fixed;
  top: 0px;
  height:35px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-bottom: 1px solid #E2E2E6;
  line-height:35px;
  background-color: #eee;
  z-index: 10;
}
.center {
  /*需要通过js对ios以及android做适配*/
  width: 100%;
  height: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling : touch;
}
.bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 44px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  color: #00a5e0;
  line-height: 44px;
  vertical-align: middle;
  text-align: center;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#f9f9f9), to(#e0e0e0));
  z-index: 99;
}

js逻辑:

//对ios滚动元素做适配
if($.os.ios){
    $('#center').css({'position': 'absolute', "top": "0", "bottom": "44px"});
    iOSBounce.fix("center", ["top", "bottom"]);
} else {//android
    $('#center').css({"padding-bottom": "44px"});
}

#期待大家提出宝贵建议

