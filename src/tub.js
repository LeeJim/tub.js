/*
 * tub.js
 *
 * @author leejim 利俊
 * a simple JavaScript notification system.简单的弹框/提示
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

	var dom = {
		'shade' : '<div id="tub-shade"></div>',
		'head' : '<div id="tub-header"><h3 id="tub-title"></h3></div>',
		'body' : '<div id="tub-body"><p id="tub-message"></p></div>',
		'foot' : '<div id="tub-footer"><h3 id="tub-title"></h3></div>',
		'close' : '<a href="javascript:;" id="tub-close">X</a>',
		'btn' : '<button id="tub-button"></button>'
	};

	var bone,shade;
	var i = function(id) { return document.getElementById(id); };

	function css(ele, decorate) {
		ele.style.cssText = decorate;
	}

	function show() {
		shade.style.display = '';
		return bone ? bone.style.display = '' : '';
	}

	function hide() {
		shade.style.display = 'none';
		return bone ? bone.style.display = 'none' : '';
	}

	function Tub() {
		this.create();
	}

	Tub.prototype.create = function() {
		bone = document.createElement('div');
		bone.id = 'tub-dialog';
		css(bone, 'position:fixed; top:50%; left:50%; width:300px; height:70px; margin-top:-35px; margin-left:-150px; background-color:#fff; z-index:20160111; display:none;');
		shade = document.createElement('div');
		shade.id = 'tub-shade';
		css(shade, 'position:fixed; width:100%; top:0; bottom:0; background-color:rgba(0,0,0,.4); z-index:20150111; display:none;');
		document.body.appendChild(shade);
		document.body.appendChild(bone);
	};

	Tub.prototype.alert = function(message) {
		bone.innerHTML = dom['close'] + dom['body'];

		var p = i('tub-message'),
			a = i('tub-close');

		p.innerHTML = message;
		css(a, 'text-decoration:none; color:#d5d5d5; display:block; position:absolute; top:10px; right:10px;');
		css(p, 'padding-left:24px;  line-height:70px; margin:0;');
		show();
		on(a, 'click', handleClose);
	}

	function handleClose() {
		hide();
		bone.innerHTML = '';
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
