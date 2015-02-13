/**
*author: richieli <richieli0615@gmail.com>
*iOSBounce0.1.0 | https://github.com/richieli/iOSBounce.js
*/

/**
 * @description iOSBounce
 * @param {root} context
 * @param {factory} function
 * @return {function} fix
 */
;(function(root, factory) {
    root["iOSBounce"] = factory();
}(this, function() {

    /**
     * @description {DOMElement} 滚动元素dom节点
     * @field
     */
    var fixedEle;

    /**
     * @description {boolean} 标志是否阻塞滚动元素touchmove默认行为
     * @field
     */
    var isFrozen = false;

    /**
     * @description 标志滚动元素开始时是否可以滚动
     * @return {boolean} 是否可以滚动
     */
    function isScrollable() {
        return fixedEle.scrollHeight > fixedEle.offsetHeight;
    }

    /**
     * @description 限制滚动元素边缘
     */
    function edgeDetection() {
        var scrollTop = fixedEle.scrollTop,
            scrollHeight = fixedEle.scrollHeight,
            offsetHeight = fixedEle.offsetHeight;
        if(scrollTop <= 0) {
            fixedEle.scrollTop = 1;
        }
        if(scrollTop >= scrollHeight - offsetHeight) {
            fixedEle.scrollTop = scrollHeight - offsetHeight - 1;
        }
    }

    /**
     * @description 禁止事件默认行为以及冒泡
     * @param {event} e
     */
    var touchFreeze = function(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    /**
     * @description touchstart事件处理逻辑
     * @param {event} e
     */
    var touchStart = function(e) {
        if(isScrollable()) {
            edgeDetection();
        }
        else {
            if(!isFrozen) {
                this.addEventListener("touchmove", touchFreeze, false);
                isFrozen = true;
            }
        }
    };

    /**
     * @description 绑定事件
     * @param {array} otherIDs 需要固定的元素的id
     */
    function initFixedEvent(otherIDs) {
        if(!!otherIDs) {
            var len = otherIDs.length;
            for(var i=0; i<len; i++) {
                document.getElementById(otherIDs[i]).addEventListener("touchmove", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }, false);
            }
        }
        fixedEle.addEventListener("touchstart", touchStart, false);
    }

    /**
     * @description 主方法
     * @param {string} id 滚动元素的id
     * @param {array} otherIDs 需要固定的元素的id
     * @throws {string} 滚动元素id不能为空，否则抛出异常
     */
    function fix(id, otherIDs) {
        if (!id) {
            throw new Error('"id" argument is required');
        }
        fixedEle = document.getElementById(id);
        initFixedEvent(otherIDs);
    }
    return {
        fix: fix
    };
}));
