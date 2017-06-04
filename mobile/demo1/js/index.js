/**
 * 通过id获取对象
 * @param id       id
 * @returns {HTMLElement}
 */
function id(id){
    return document.getElementById(id);
}

/**
 *
 * @param obj       绑定事件的元素
 * @param ev        绑定的事件 event ,如click
 * @param fn        回调函数
 */
function bind(obj, ev, fn){
    if(obj.addEventListener){
        obj.addEventListener(ev,fn, false);
    }else{
        obj.attachEvent('on'+ev, function(){
            fn.call(obj);
        });
    }
}

/**
 * 获取视口区的宽度和高度
 */
function view(){
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    }
}

/**
 * 添加class
 * @param obj       Dom元素
 * @param sClass    类名
 */
function addClass(obj, sClass){
    var aClass = obj.className.split(' ');
    if(!obj.className){
        obj.className = sClass;
        return ;
    }
    for(var i = 0, len = aClass.length; i< len; i++){
        if(aClass[i] === sClass){
            return;
        }
    }
    obj.className += ' ' + sClass;
}


function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function fnLoad(){

    var iTIme = new Date().getTime(); // 获取当前毫秒数

    var oW = id('welcome');
    var arr = [""]; // 图片地址的一个数组
    // 图片加载的时间 和 进场动画的执行时间  bTime bImgLoad
    var oTimer = null;

    // 用来判断所有图片是否加载完毕
    var bImgLoad = true;
    var bTime = false;

    bind(oW, "webkitTransitionEnd", end);
    bind(oW, "transitionend", end);

    // setInterval() 动画
    oTimer = setInterval(function(){
        // 当前时间 - 开始时间
        if(new Date().getTime() - iTIme >= 5000){
            bTime = true;
        }

        if(bTime && bImgLoad){
            clearInterval(oTimer); // 清除定时器
            //alert('执行跳转了');

            oW.style.opacity = 0; // 隐藏欢迎页面
        }
    },1000);

    function end(){
        //alert('动画执行完毕');
        //console.log(1212);
        removeClass(oW, 'pageShow')
    }

    /*for(var i = 0; i < arr.length; i++){
        var oImg = new Image();
        oImg.src = arr[i];
        oImg.onload = function(){
            bImgLoad = true; // 图片加载完毕，设置true
        };
    }*/
}


/*
* 图片轮播图切换
*
* */
function fnTab(){
    var oTab = id('tabPic');
    var oList = id('picList');

    var aNav = oTab.getElementsByTagName('nav')[0].children;

    var iNow = 0; // 当前选中的
    var iX = 0;   // 移动的位移 宽度x个数
    var iW = view().w; // 屏幕宽度

    var oTimer = 0;

    var iStartTouchX = 0;
    var iStartX  = 0;

    bind(oTab, "touchstart", fnStart);
    bind(oTab, "touchmove", fnMove);
    bind(oTab, "touchend", fnEnd);

    bind(document, "touchmove", function(ev){
        ev.preventDefault(); // 去掉默认事件
    });
    auto();
    function auto(){
        oTimer = setInterval(function(){
            iNow ++;
            // 过界处理
            iNow = iNow % aNav.length;
            tab();
        },2000);
    }

    function fnStart(ev){
        oList.style.transition = "none";
        ev = ev.changedTouches[0];
        iStartTouchX = ev.pageX;
        iStartX = iX;

        clearInterval(oTimer); // 清除定时器

    }

    function fnMove(ev){
        // 获取当前最表
        ev = ev.changedTouches[0];
        var iDis = ev.pageX - iStartTouchX; // 获取差值
        iX = iStartX + iDis;
        oList.style.transform = oList.style.WebkitTransform = "translateX("+iX+"px)";
    }
    function fnEnd(){
        iNow = iX/iW; // Math.abs() 取整
        iNow = -Math.round(iNow);
        if(iNow < 0){
            iNow = 0;
        }
        if(iNow > aNav.length - 1){
            iNow = aNav.length -1;
        }
        tab();
        auto();

    }
    function tab(){
        iX = -iNow*iW;
        oList.style.transition = ".5s";

        // 去掉了 - ，需要大写 WebkitTransform
        oList.style.transform = oList.style.WebkitTransform = "translateX("+iX+"px)";

        /*
        * for循环，去掉所有的 active类
        * */
        for(var i = 0; i < aNav.length; i++){
            removeClass(aNav[i], "active");
        }
        // 给当前的添加active类
        addClass(aNav[iNow], 'active');
    }

}

/*

function fnTab()
{
    if(!window.BfnScore)
    {
        fnScore();
        window.BfnScore=true;
    }


}
function fnScore()
{
    var oScore=id("score");
    var aLi=oScore.getElementsByTagName("li");
    var arr=["好失望","没有想象的那么差","很一般","良好","棒极了"];
    for(var i=0;i<aLi.length;i++)
    {
        fn(aLi[i]);
    }
    function fn(oLi)
    {
        var aNav=oLi.getElementsByTagName("a");
        var oInput=oLi.getElementsByTagName("input")[0];
        for(var i=0;i<aNav.length;i++)
        {
            aNav[i].index=i;
            bind(aNav[i],"touchstart",function(){
                for(var i=0;i<aNav.length;i++)
                {
                    if(i<=this.index)
                    {
                        addClass(aNav[i],"active");
                    }
                    else
                    {
                        removeClass(aNav[i],"active");
                    }
                }
                oInput.value=arr[this.index];
            });
        }
    }

    fnIndex();
}
function fnInfo(oInfo,sInfo)
{
    oInfo.innerHTML=sInfo;
    oInfo.style.WebkitTransform="scale(1)";
    oInfo.style.opacity=1;
    setTimeout(function(){
        oInfo.style.WebkitTransform="scale(0)";
        oInfo.style.opacity=0;
    },1000);
}
function fnIndex()
{
    var oIndex=id("index");
    var oBtn=oIndex.getElementsByClassName("btn")[0];
    var oInfo=oIndex.getElementsByClassName("info")[0];
    var bScore=false;
    bind(oBtn,"touchend",fnEnd);
    function fnEnd()
    {
        bScore=fnScoreChecked();
        if(bScore)
        {
            if(bTag())
            {
                fnIndexOut();
            }
            else
            {
                fnInfo(oInfo,"给景区添加标签");
            }
        }
        else
        {
            fnInfo(oInfo,"给景区评分");
        }
    }
    function fnScoreChecked()
    {
        var oScore=id("score");
        var aInput=oScore.getElementsByTagName("input");
        for(var i=0;i<aInput.length;i++)
        {
            if(aInput[i].value==0)
            {
                return false;
            }
        }
        return true;
    }
    function bTag()
    {
        var oTag=id("indexTag");
        var aInput=oTag.getElementsByTagName("input");
        for(var i=0;i<aInput.length;i++)
        {
            if(aInput[i].checked)
            {
                return true;
            }
        }
        return false;
    }
}
function fnIndexOut()
{
    var oMask=id("mask");
    var oIndex=id("index");
    var oNew=id("news");
    addClass(oMask,"pageShow");
    addClass(oNew,"pageShow");
    fnNews();
    setTimeout(function(){
        oMask.style.opacity=1;
        oIndex.style.WebkitFilter=oIndex.style.filter="blur(5px)";
    },14);
    setTimeout(function(){
        oNew.style.transition="0.5s";
        oMask.style.opacity=0;
        oIndex.style.WebkitFilter=oIndex.style.filter="blur(0px)";
        oNew.style.opacity=1;
        removeClass(oMask,"pageShow");
    },3000);
}
function fnNews()
{
    var oNews=id("news");
    var oInfo=oNews.getElementsByClassName("info")[0];
    var aInput=oNews.getElementsByTagName("input");
    aInput[0].onchange=function()
    {
        if(this.files[0].type.split("/")[0]=="video")
        {
            fnNewsOut();
            this.value="";
        }
        else
        {
            fnInfo(oInfo,"请上传视频");
        }
    };
    aInput[1].onchange=function()
    {
        if(this.files[0].type.split("/")[0]=="image")
        {
            fnNewsOut();
            this.value="";
        }
        else
        {
            fnInfo(oInfo,"请上传图片");
        }
    };
}
function fnNewsOut()
{
    var oNews=id("news");
    var oForm=id("form");
    addClass(oForm,"pageShow");
    oNews.style.cssText="";
    removeClass(oNews,"pageShow");
    formIn();
}
function formIn()
{
    var oForm=id("form");
    var oOver=id("over");
    var aFormTag=id("formTag").getElementsByTagName("label");
    var oBtn=oForm.getElementsByClassName("btn")[0];
    var bOff=false;
    for(var i=0;i<aFormTag.length;i++)
    {
        bind(aFormTag[i],"touchend",function(){
            bOff=true;
            addClass(oBtn,"submit");
        });
    }
    bind(oBtn,"touchend",function(){
        if(bOff)
        {
            for(var i=0;i<aFormTag.length;i++)
            {
                aFormTag[i].getElementsByTagName("input")[0].checked=false;
            }
            bOff=false;
            addClass(oOver,"pageShow");
            removeClass(oForm,"pageShow");
            removeClass(oBtn,"submit");
            over();
        }
    });
}
function over()
{
    var oOver=id("over");
    var oBtn=oOver.getElementsByClassName("btn")[0];
    bind(oBtn,"touchend",function()
    {
        removeClass(oOver,"pageShow");
    });
}*/
