"use strict";
//js :  基于原型的动态解释性脚本语言

/*1.动态生成dom元素 初始化
        1.生成几个 num
        2.创建气球
            1.createElement() 创建div标签
            2.添加属性类名
            3.添加到哪里去 哪里.appendChild（气球）
        3.创建多个气球
            1.for循环
            2.文档节点片段 fragment
            3.初始化函数
        4.完善属性
            1.纵向 top： wH  DTD对js的影响
            2.横向 0~wW 伪随机数 Math.random() 0-1 包括0不包括1
            3.边界限制
   2.气球向上移动
        1.获取所有气球 querySelector querySelectorAll
        2.循环每个气球
        3.改变top值 当前的top值-动量
        4.定时器 循环执行move setInterval setTimeout
            setInterval 会有丢帧的问题
            浏览器刷新频率是每秒60帧
            可能会不稳定 因为函数执行也需要时间 所以不适合非常精准的动画效果

            setTimeout 延迟函数
         5.自定义属性
         offsetTop offset

   3.点击气球 气球做动画 消失
        如果为每个气球设置一个click事件  气球很多的话很浪费性能
        所以 监听整个页面 事件委托
        3.气球消失 节点 删除而不是隐藏
        4.从数组中将该气球删除
        获得下标
        indexof lastindexof

   4. 气球动画
        1.速度增加
        2.宽高减少
        3.摇摆

        this

        setInterval 内置工具方法 浏览器创建 window.setInterval
        IIFE 的this也是window


 */
var num =10;//初始化个数
var wH=window.innerHeight;//获取浏览器的高度
var wW=window.innerWidth; //获取浏览器的宽度
var bz=160;  //balloon 的size
var timer=null;//初始化定时器
var balloons=[]; //把气球预存起来
init(20);
move();
//每过60毫秒执行一次move函数
timer=setInterval(move,60);

//为dom设置一个监听 click
document.addEventListener('click',function (e) {
    //把当前事件的所有信息的集合对象event对象
    if (e.target.className==='balloon'){
        //如果点击的是气球 找到父节点移除自己
        // e.target.parentNode.removeChild(e.target);

        //this  call apply    bind
        boom.call(e.target); //.call 用 e.target替换 boom函数里面的this
        init(1);
        //获得在数组中的下标
        var index=balloons.lastIndexOf(e.target);
        //从数组中删除
        balloons.splice(index,1);
    }

});

//气球爆炸的动画
function boom() {
    var rotate=[30,80];
    var index = 0;
    this.timer = setInterval(function () {
        //这里面的this 是window 因为setInterval 是浏览器执行的 也不能用call 因为没有权限 可以用bind
        index++;
        index %=2;  //求模取余 即吧index 在0 1 0 1 之间变换
        this.speed++;
        this.style.top = this.offsetTop - this.speed + 'px';
        this.style.width = this.offsetWidth - 10 + 'px';
        this.style.height = this.offsetHeight - 10 + 'px';
        this.style.transform = 'rotate('+ rotate[index] + 'deg';

    }.bind(this),1000/60)


}

function init(num) {
    var fragment=document.createDocumentFragment();//创建文档节点片段
    for(var i=0;i<num;i++) //for if 不是块级作用域 所以i可以在for循环外访问
    {
        var randomX=~~(Math.random()*wW)-bz; //位运算取整
        randomX=Math.max(0,randomX);//边界限制
        var oBalloon=document.createElement('div');
        oBalloon.className="balloon";
        oBalloon.style.top= wH-bz +'px';
        oBalloon.style.left=randomX +'px';
        //自定义速度设置随机速度1-7
        oBalloon.speed=~~(Math.random()*7)+1;
        balloons.push(oBalloon);//存放到数组中
        fragment.appendChild(oBalloon);//先添加到节点中

    }
//    for循环之后再添加到body中 因为渲染回流 没添加一个要重新加载一次
    document.body.appendChild(fragment);

}

//气球移动
function move() {
    // var  aBallons = document.querySelectorAll('.ballon');  每隔6毫秒就要获取所有的气球 太不节约性能了
    for(var i=0,len=balloons.length;i<len;i++){
    //    循环所有气球节点 改变top值
        balloons[i].style.top= balloons[i].offsetTop - balloons[i].speed -1 + 'px';

        //如果top值<-160 即超出了屏幕 从底下再次出现
        if(balloons[i].offsetTop< -bz){
            balloons[i].style.top=wH-bz + 'px';
        }


    }
}





