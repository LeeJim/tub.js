# tub.js
简易弹窗/信息提示(不依赖jQuery) JavaScript Alert/Notification System without jQuery

*[demo戳我](http://www.4szu.com/tub)*

- alert方法 (最常用)

```javascript
	tub.alert('正在加油中')({
			timeout : 4000
	});
```

- confirm方法 

```javascript
	tub.confirm({
		title:'感谢信',
		content: '谢谢你使用tub.js',
		btn:['哈哈','加油']
	})(function() {
		console.log('感谢你');
	})
```

- prompt方法

```javascript
	tub.prompt({
		title:'感谢信',
		content: '谢谢你使用tub.js',
		btn:['哈哈','加油']
	})(function(value, input) {
		console.log(value);
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