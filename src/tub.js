/*
 * tub.js
 *
 * @author leejim 利俊
 * a simple JavaScript notification system without jQuery 简单的弹框/提示(不依赖jQuery)
 * 2016.1.12
 */

(function(global) {

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

	var extend;
	extend = function(destination, obj) {
		for( i in obj) {
			if(obj.hasOwnProperty(i) && i in destination) {
				destination[i] = obj[i];
			}
		}
	}

	var dom = {
		'shade' : '<div id="tub-shade"></div>',
		'head' : '<div class="tub-header"><h3 class="tub-title"></h3></div>',
		'body' : '<div class="tub-body"><p class="tub-message"></p></div>',
		'foot' : '<div class="tub-footer"><h3 class="tub-title"></h3></div>',
		'close' : '<a href="javascript:;" class="tub-close">X</a>',
		'btn' : '<button class="tub-button"></button>'
	};

	var shade;
	var i = function(id) { return document.getElementById(id); };


	function shadeTrigger() {
		if(tub.config['shade']===0) return;
		shade.style.display = shade.style.display === 'none' ? '' : 'none';
	}

	function Tub() {
		create();
	}

	Tub.prototype.config = {
		shade : 0.5,
		timeout : 0,
		skin : 'default',
		btn : 'none',
		textAlign: 'center'
	};

	Tub.prototype.set = function(obj) {
		extend(this.config, obj);
	};

	Tub.prototype.alert = function(message) {
		var bone = fill();
		var p = bone.querySelector('p.tub-message');
		
		p.style.cssText = 'text-align:' + this.config['textAlign'];
		p.innerHTML = message;
		shadeTrigger();
		if(tub.config['timeout']) {
			boom(bone);
		}
		else {
			var a = bone.querySelector('a.tub-close');
			on(a, 'click', handleClose);
		}
	};

	function boom(ele) {
		setTimeout(function() {
			shadeTrigger();
			document.body.removeChild(ele);
		},tub.config['timeout']);
	}

	function fill() {
		var bone = document.createElement('div');
		bone.className = 'tub-dialog tub-skin-' + tub.config['skin'];
		bone.innerHTML = (tub.config['timeout'] ? '' : dom['close']) + dom['body'];
		document.body.appendChild(bone);
		return bone;
	}

	function create() {
		shade = document.createElement('div');
		shade.className = 'tub-shade';
		shade.style.display = 'none';
		document.body.appendChild(shade);
		return shade;
	}

	function handleClose(e) {
		var e = e || window.event,
			t = e.target || e.srcElement;
		shadeTrigger();
		document.body.removeChild(t.parentNode);
	}

	if(typeof define === 'function') {
		define( [], function() {
			return new Tub();
		})
	}
	else if(typeof global.tub === 'undefined') {
		global.tub = new Tub();
	}
}(this))
