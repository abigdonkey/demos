# 主要为移动端项目的学习

## 1.animation-fill-mode
```
1.规定对象动画之外的状态
2.四个值
    a. none         不改变默认行为
    b. forwards     动画完成后，保留最后一个属性值（在最后一个关键帧中定义）
    c. backwards    在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）
    d. both         向前和向后填充模式都被应用
3.动画结束之后保持什么样的状态
    none        表示不设置结束之后的状态，默认情况下回到动画初始状态
    forwards    表示将动画元素设置成动画结束时的状态
    backwards   明确表示设定动画结束后回到初始状态

```

## 2. transform-origin
```
变形 原点
默认是元素中心点

```

## 3. animation
```
animation-name
animation-duration      持续时间
animation-delay         延迟时间
animation-fill-mode
animation-direction     下一周期内是否应该轮流反向播放动画
                        normal      动画正常播放
                        alternate   轮流反向播放
animation-iteration-count       播放次数
                                    infinite    无限次播放
                                     n          播放次数

```

## 4.webkitTransitionEnd transitionEnd

```

```

## 5.渐变
```
-webkit-linear-gradient: 



```
## 移动端 事件
```
touchstart
touchmove
touchend

ev.changedTouches[0]


```