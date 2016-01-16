/*
 * tub.js
 *
 * @author leejim 利俊
 * a simple JavaScript notification system without jQuery 简单的弹框/提示(不依赖jQuery)
 * 2016.1.12
 */

(function(global) {

	var slice = Array.prototype.slice;
	var on,off,stop;

	if(document.addEventListener) {
		on = function(ele, event, fn) {
			ele.addEventListener(event, fn, false);
		}
		off = function(ele, event, fn) {
			ele.removeEventLister(event, fn, false);
		}
	}
	else {
		on = function(ele, event, fn) {
			ele.attachEvent('on'+event, fn);
		}
		off = function(ele, event, fn) {
			ele.detachEvent('on'+event, fn);
		}
	}

	stop = function(e) {
		var e = e || global.event;
		if(e.preventDefault) {
			e.preventDefault();
		}
		else {
			e.returnValue = false;
		}
	}

	var ready,extend,append,css;
	ready = function(fn) { //类似jQuery.ready()
		if (document.readyState != 'loading')
			return fn();
		document.onreadystatechange = function() {
		  return (document.readyState == "interactive" ? fn() : '');
		}  
	};
	extend = function(destination, obj) { //deep extend 深层复制
		for(var i in obj) {
			if(obj.hasOwnProperty(i) && i in destination) {
				if(typeof obj[i] === 'object') {
					extend(destination[i], obj[i]);
				}
				else
					destination[i] = obj[i];
			}
		}
	};
	append = function(parent, childHTML) {
		var pre = parent.innerHTML;
		parent.innerHTML = pre + (typeof childHTML === 'string' ? childHTML : '');
		return parent;
	};
	css = function( ele ) {
		if (document.defaultView)
			return document.defaultView.getComputedStyle(ele,null);
		return ele.currentStyle;
	};

	var dom = {
		'shade' : '<div id="tub-shade"></div>',
		'frame' : '<div class="tub-dialog tub-ui"></div>',
		'title' : '<div class="tub-title">%title%</div>',
		'content' : '<div class="tub-content">%content%</div>',
		'message' : '<div class="tub-message">%message%</div>',
		'tipMsg' : '<div class="tub-tips-message">%message%</div>',
		'footer' : '<div class="tub-footer">%footer%</div>',
		'close' : '<a href="javascript:;" class="tub-close">x</a>',
		'input' : '<input type="text" class="tub-input" id="tub-input">',
		'tips' : '<div class="tub-tips-message">%tips%</div>',
		'btn0' : '<a class="tub-button tub-btn-blue" id="tub-btn-confirm">%name%</a>',
		'btn1' : '<a class="tub-button tub-btn-grey" id="tub-btn-cancel">%name%</a>'
	};

	var shade;
	var i = function(id) { return document.getElementById(id); };

	function showShade() { shade.style.display=''; }
	function hideShade() { shade.style.display='none'; }

	function Tub() {
		create();
	}

	Tub.prototype.config = {
		shade : 0.6,
		timeout : 1500,
		skin : 'black',
		btn : ['确定', '取消'],
		textAlign: 'center'
	};

	Tub.prototype.set = function(obj) {
		extend(this.config, obj);
	};

	Tub.prototype.alert = function(message) {
		var that = this;
		var bone = build('alert',message);
		boom(bone);
		return function (config) {
			if(typeof config !== 'undefined')
				that.set(config);
		}	
	};

	Tub.prototype.confirm = function(config) {

		if(typeof config !== 'object') config = {};
		this.set(config);
		var	bone = build('confirm', config);
		
		showShade();

		var close = bone.querySelector('a.tub-close'),
			cancel = i('tub-btn-cancel');

		on(close, 'click', function(){boom(bone,true)} );
		on(cancel, 'click', function(){boom(bone,true)} );
		return function (confirmFunc, context) {
			var btn = i('tub-btn-confirm');
			on(btn, 'click', function(){
				boom(bone,true);
				if(typeof confirmFunc === 'function')
				confirmFunc.call(context);
			});
		}
	};

	Tub.prototype.prompt = function(config) {

		if(typeof config !== 'object') config = {};
		this.set(config);
		var	bone = build('prompt', config);
		
		showShade();

		var close = bone.querySelector('a.tub-close'),
			cancel = i('tub-btn-cancel'),
			input = i('tub-input');

		on(close, 'click', function(){boom(bone,true)} );
		on(cancel, 'click', function(){boom(bone,true)} );
		return function (confirmFunc, trigger, context) {
			var btn = i('tub-btn-confirm');
			on(btn, 'click', function(){
				if(typeof trigger === 'undefined') boom(bone,true);
				if(typeof confirmFunc === 'function')
				confirmFunc.call(context, input.value, input);
			});
		}
	};

	Tub.prototype.tips = function(config) {

		if(typeof config !== 'object') config = {};
		config.color = config.color || '#ccc';
		this.set(config);
		var	bone = build('tips', config);
		var triangle = bone.getElementsByTagName('i')[0];
		var target = typeof config.from === 'string' ? i(config.from) : config.from;
		var targetStyle = target.getBoundingClientRect();
		var w = parseInt(css(bone).width) || bone.offsetWidth,
			h = parseInt(css(bone).height) || bone.offsetHeight;

		var setPosition = function() {
			switch(config.position) {
				case 'top':
					return ' left:' + (targetStyle.left-w+22) + 'px; top:' + (targetStyle.top-h-15) + 'px; ' + 'background-color:' + config.color +'; ' ;
				case 'bottom':
					return ' left:' + (targetStyle.left-w+22) + 'px; top:' + (targetStyle.top+h+15) + 'px; ' + 'background-color:' + config.color +'; ' ;
				case 'left' :
					return ' left:' + (targetStyle.left-w-15) + 'px; top:' + (targetStyle.top) + 'px; ' + 'background-color:' + config.color +'; ' ;
				case 'right' :
					return ' left:' + (targetStyle.right+12) + 'px; top:' + (targetStyle.top) + 'px; ' + 'background-color:' + config.color + '; ' ;
			}
		}
		triangle.style.cssText = 'border-' + (config.position == 'right' || config.position == 'left' ? 'bottom' : 'right' )+ '-color:' + config.color + ';';
		bone.style.cssText += setPosition();
		
		if(config.method === 'click') {
			on(target, config.method, function() {
				if(bone.className.indexOf('tub-visibility-hide')>0)
					bone.className = bone.className.replace('hide','show');
				else 
					bone.className =  bone.className.replace('show','hide');
			});
		}
		
		else if(config.method === 'hover') {
			on(target, 'mouseenter', function() {
				bone.className = bone.className.replace('hide','show');
			});
			on(target, 'mouseleave', function() {
				bone.className =  bone.className.replace('show','hide');
			});
		}

	}
	function boom(ele, trigger) {
		setTimeout(function() {
			hideShade();
			document.documentElement.removeChild(ele);
		}, trigger ? 10 : tub.config['timeout']);
	}

	function build(type, config) {

		var frame = document.createElement('div');
		frame.className = 'tub-dialog tub-ui ';

		switch(type) {
			case 'alert':
				frame.innerHTML = dom['message'].replace('%message%', config);
				frame.className += 'tub-alert tub-skin-' + tub.config['skin'];
				break;
			case 'confirm':
				var btn0 = dom['btn0'].replace('%name%', tub.config.btn[0]);
				var btn1 = dom['btn1'].replace('%name%', tub.config.btn[1]);

				frame.innerHTML = dom['close'] + dom['title'].replace('%title%', config.title || '信息')
								+ dom['content'].replace('%content%', config.content || 'content为空')
								+ dom['footer'].replace('%footer%', btn0 + btn1 );
				frame.className += 'tub-confirm';
				break;
			case 'prompt':
				var btn0 = dom['btn0'].replace('%name%', tub.config.btn[0]);
				var btn1 = dom['btn1'].replace('%name%', tub.config.btn[1]);

				frame.innerHTML = dom['close'] + dom['title'].replace('%title%', config.title || '信息')
								+ dom['content'].replace('%content%', dom['input'])
								+ dom['footer'].replace('%footer%', btn0 + btn1 );
				frame.className += 'tub-prompt';
				break;
			case 'msg':
				break;
			case 'tips':
				frame.innerHTML = dom['tips'].replace('%tips%',config.content) + '<i class="tub-tips-' + config.position + '"></i>';
				frame.className += 'tub-tips ' + 'tub-tips-' + config.position + ' tub-visibility-hide' + ' tub-tips-' + config.color;	
				break;
			case 'load':
				break;
			case 'login':
				break;
		}

		document.documentElement.appendChild(frame);
		var _ = css(frame);

		if(type !== 'tips') {
			frame.style.cssText = 'margin-left:-' + (parseInt(_.width) || frame.offsetWidth)/2
								+ 'px; margin-top:-' + (parseInt(_.height) || frame.offsetHeight)/2 + 'px';
		}
		
		return frame;
	}

	function create() {
		shade = document.createElement('div');
		shade.className = 'tub-shade';
		shade.style.display = 'none';
		document.documentElement.appendChild(shade);
		return shade;
	}

	function handleClose(e) {
		var e = e || window.event,
			t = e.target || e.srcElement;
		shadeTrigger();
		document.documentElement.removeChild(t.parentNode);
	}

	

	if(typeof define === 'function') {
		define( [], function() {
			return new Tub();
		})
	}
	else if(typeof global.tub === 'undefined') {
		ready(function(){
			global.tub = new Tub();
		});
	}
}(this))