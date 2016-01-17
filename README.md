# tub.js
简易弹窗/信息提示(不依赖jQuery) JavaScript Alert/Notification System without jQuery
[demo戳我](www.4szu.com/tub)
- alert方法 (最常用)

```javascript
	tub.alert('感谢使用tub.js');
```

- confirm方法 

```javascript
	tub.confirm({
	    title:'感谢信', //弹出框的标题 @string
	    content: '谢谢你使用tub.js', //弹出框的内容 @string
	    btn:['不客气','加油'] //按钮的文本信息 @string
	})(function() { //点击确定后触发的函数
	    tub.alert('感谢你'); 
	})
```

- prompt方法

```javascript
	tub.prompt({
	    title:'感谢信', //弹出框的标题 @string
	    content: '谢谢你使用tub.js', //弹出框的内容 @string
	    btn:['确定输入','加油'] //按钮的文本信息 @string
	})(function(value, input) { //value就是输入框的值，input则是输入框的引用
	    tub.alert('你输入的值是'+value);
	    input.value = '';
	})
```

2016/1/15更新

- tips方法

```javascript
	tub.tips({
		content:'lalalalallala', //tips的内容 @string 
		from:'target0', //绑定的对象 [id/DOM] @string / @DOMElement
		method: 'hover', //绑定的方法 ['click'/'hover'] @string
		position: 'top', //绑定元素的位置 ['top'/'right'/'bottom'/'left'] @string
		color:'blue' //显示的颜色 ['blue'/'#123456'/'rgb(0,1,2)'] @string
	})
```

其他方法陆续开发中。。。