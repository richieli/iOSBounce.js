/**
*author: richieli <richieli0615@gmail.com>
*iOSBounce0.1.0 | https://github.com/richieli/iOSBounce.js
*/

!function(a,b){a.iOSBounce=b()}(this,function(){function a(){return e.scrollHeight>e.offsetHeight}function b(){var a=e.scrollTop,b=e.scrollHeight,c=e.offsetHeight;0>=a&&(e.scrollTop=1),a>=b-c&&(e.scrollTop=b-c-1)}function c(a){if(a)for(var b=a.length,c=0;b>c;c++)document.getElementById(a[c]).addEventListener("touchmove",function(a){a.stopPropagation(),a.preventDefault()},!1);e.addEventListener("touchstart",h,!1)}function d(a,b){if(!a)throw new Error('"id" argument is required');e=document.getElementById(a),c(b)}var e,f=!1,g=function(a){a.stopPropagation(),a.preventDefault()},h=function(){a()?b():f||(this.addEventListener("touchmove",g,!1),f=!0)};return{fix:d}});