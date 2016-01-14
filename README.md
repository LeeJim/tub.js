# tub.js
简易弹窗/信息提示 JavaScript Alert/Notification System

1. alert方法 (最常用)

```javascript
	tub.alert('正在加油中')({
			timeout : 4000
		});
```

2. confirm方法 

```javascript
	tub.confirm({
		title:'感谢信',
		content: '谢谢你使用tub.js',
		btn:['哈哈','加油']
	})(function() {
		console.log('感谢你');
	})
```

3. prompt方法

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

其他方法陆续开发中。。。