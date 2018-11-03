/**
 * TimeLine is the class to build animations base on a time basis, which is very flexible. 
 * Think of the timeline as a timer that you an stop, pause and play. From which you can extract a value
 * of a small window of time, which is 0 before the window, 1 after, 0-1 in the middle.
 * @class
 * @param {number} duration The duration of the timeline in milliseconds
 * @property {string}  status         - The current status of the timeline
 * @property {string}  position       - The current time (position) of the timeline
 * @property {string}  direction      - When 1 timeline will run forward (from position to duration) when -1 i'll run backward  (from position to 0)
*	@example <caption>Moves an element from 0 to 500px in 2 seconds with a button to toggle the animation direction. You need to click the button to start animation.</caption>
*	var timeLine = new TimeLine(600);
*	// Start with direction -1 so when the button is press we get the direction to 1 at the first click
*	timeLine.direction = -1;
*	timeLine.addEventListener(Event.CHANGE, 'render', timeLine);
*	// This element has style position to absolute;
*	var element = document.getElementById('ball');
*	var button = document.getElementById('button');
*	button.onmousedown = function()
*	{
*		// Toggle direction of the timeLine and plays it
*		timeLine.direction = (timeLine.direction == 1) ? -1 : 1;
*		timeLine.play();
*	}
*	timeLine.render = function()
*	{
*		element.style.paddingTop = 300 * timeLine.getTime(100, 400) + 'px';
*	}
*   @fires Event:CHANGE When there has been a change in the timeline and therefore rendering needs to be performed
*   @fires Event:COMPLETE When the timeline is complete
*	@see {@link https://jsfiddle.net/ovu6u4hm/6/} Online Sample
*/

function TimeLine(duration, interval)
{
	this.duration = duration;
	this.direction = 1;
	this._position = 0;
	this.status = "STOP";
	this.startTime = 0;
	this.interval = interval;
	
	this.intervalObj;
	
	this.data = {};
	this.events = {}
	this.effects = {};
	
	
	ADD_EVENT_DISPATCHER(this);
	
	var self = this;
	var iFrame = 0;
	this.REQ_ANIMATION = function(timeStamp){self.update();/*console.log(timeStamp, iFrame);iFrame++;*/}
}

/**
* Makes the timeline start running
* 
*/
TimeLine.prototype.play = function ()
{
	if (((this.direction == 1) && (this._position == this.duration)) || ((this.direction == -1) && (this._position == 0)))
	{
	}
	else
	{
		this.startTime = new Date().getTime() - this._position;
		if (this.status != 'PLAY')
		{
			var self = this;
			var doAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
			
			if (doAnimation)
			{
				doAnimation(this.REQ_ANIMATION);
			}
			else
			{
				var self = this;
				this.intervalObj = setInterval(function(){self.update()}, this.interval);
			}
		}
		this.status = 'PLAY';
	}
}
/**
* Makes the timeline pause running
* 
*/
TimeLine.prototype.pause = function ()
{
	this.status = 'PAUSE';
	clearInterval(this.intervalObj);
}
/**
* Makes the timeline stop running
* 
*/
TimeLine.prototype.stop = function ()
{
	this.status = 'STOP';
	clearInterval(this.intervalObj);
}

Object.defineProperty(TimeLine.prototype, 'position', {
		get:function(){
			return this._position
		},
		set:function(value){
			this._position = value;
			this.startTime = new Date().getTime() - this._position;
		},
	configurable:true});



TimeLine.prototype.update = function ()
{
	if (!Date.now)
	{
		Date.now = function()
		{
			return new Date().getTime();
		};
	}
	if (this.status != 'PLAY')
	{
		return false;
	}
	var TIME = Date.now();
	if (this.direction == 1)
	{
		this._position =  TIME - this.startTime;
		this._position = Math.min(this.duration, this._position);
		if (this._position == this.duration)
		{
			this.status = 'STOP';
			clearInterval(this.intervalObj);
			this.dispatchEvent(Event.COMPLETE);
			
			if (this.onComplete)
			{
				this.onComplete();
			}
		}
		else if (this.status == 'PLAY')
		{
			var doAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
			
			if (doAnimation)
			{
				doAnimation(this.REQ_ANIMATION);
			}
		}
	}
	else
	{
		this._position = Math.max((2 * this._position) - (TIME - this.startTime), 0);
		this.startTime = TIME - this._position;
		if (this._position == 0)
		{
			this.status = 'STOP';
			clearInterval(this.intervalObj);
			this.dispatchEvent(Event.COMPLETE);
			
			if (this.onComplete)
			{
				this.onComplete();
			}
		}
		else if (this.status == 'PLAY')
		{
			var doAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
			
			if (doAnimation)
			{
				doAnimation(this.REQ_ANIMATION);
			}
		}
	}
	
	this.dispatchEvent(Event.CHANGE);
}


/**
*	Extracts the time from the timeline, the value is between 0-1, 0 when the position is timeOffset and 1 when the 
*	position is timeOffset + duration. Additionally you can an easeFuncion to create easing effects
*	@param {number} timeOffset The time you are considering as the start
*	@param {number} duration The time to be added to timeOffset which will be considered the end
*	@param {function} easeFunction A function that can modify the easing effect by default an Sine.easeInOut is apply
*   @returns {Number} [0-1] Returns the time of the timeLine relative to timeOffset and (timeOffset + duration)
*	@example <caption>Extract time between 100ms and 500ms, to add paddingTop  from 0 to 300</caption>
*	var timeLine = new TimeLine(1000);
*	timeLine.addEventListener(Event.CHANGE, 'render', this);
*	var element = document.getElementById('ball');
*	function render()
*	{
*		element.style.paddingTop = 300 * timeLine.getTime(100, 400) + 'px';
*	}
*	timeLine.play();
*/

TimeLine.prototype.getTime = function(timeOffset, duration, easeFunction)
{
	var time = Math.min(Math.max(this._position - timeOffset, 0), duration);
	if (easeFunction != null)
	{
		return easeFunction(time, 0, 1, duration);
	}
	return this.easeInOut(time, 0, 1, duration);
}
TimeLine.prototype.setEffect = function(id, data)
{
	this.effects[id] = (data);
}
TimeLine.prototype.setEffects = function(effects)
{
	for (var property in effects)
	{
		this.setEffect(property, effects[property]);
	}
}
TimeLine.prototype.getEffect = function(id, index)
{
	if (!this.effects[id])
	{
		return {};
	}
	var effects = {};
	for (var iEffect = 0; iEffect < this.effects[id].length; iEffect++)
	{
		var effect= this.effects[id][iEffect];
		var time = effect.time;
		time = (time.constructor === Function ? time(index) : time);
		if (time.duration)
		{
			time.end = time.start + time.duration;
		}
		if (effects.hasOwnProperty(effect.property) && time.start > this.position)
		{
			break;
		}
		var value = effect.value;
		value = (value.constructor === Function ? value(index) : value);

		if (value.constructor === Object)
		{
			time = this.getTime(time.start, time.end - time.start, effect.ease);
			value = value.start + (value.end - value.start) * time;
			effects[effect.property] = value;
		}
		else if (value.constructor === Array && time.constructor === Number)
		{
			effects[effect.property] = (this.position < time ? value[0] : value[1]);
		}
	}
	return effects;
}
TimeLine.prototype.easeInOut = function (t, b, c, d)
{
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}


TimeLine.prototype.easeInOutPos = function (pos, b, c, d)
{
	return  Math.acos(-(pos - b) * (2 / c)  + 1) * d / Math.PI;
}

TimeLine.easeInSine = function (t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}
TimeLine.easeOutSine = function (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
}
TimeLine.easeInOutSine = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}
TimeLine.easeInElastic = function (t, b, c, d) 
{
	var s=1.70158;var p=0;var a=c;
	if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/(2*Math.PI) * Math.asin (c/a);
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}
TimeLine.easeOutElastic = function (t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/(2*Math.PI) * Math.asin (c/a);
	return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
}
TimeLine.easeInOutElastic = function (t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t===0) return b;  if ((t/=d/2)===2) return b+c;  if (!p) p=d*(.3*1.5);
	if (a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/(2*Math.PI) * Math.asin (c/a);
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}
TimeLine.easeInBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
}
TimeLine.easeOutBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}
TimeLine.easeInOutBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158; 
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}
TimeLine.easeOutBounce = function (t, b, c, d) {
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
}

TimeLine.applyMatrix = function(elements, matrix)
{
	elements = (elements.constructor == Array) ? elements : [elements];
	if (!matrix)
	{
		for (var iElem = 0; iElem < elements.length; iElem++)
		{
			var element = elements[iElem];
			element.style.transform = "";
			element.style.MozTransform = "";
			element.style.WebkitTransform = "";
			element.style.msTransform = "";
			element.style.OTransform = "";
		}
		return false;
	}
	
	var properties = ['scale', 'scaleX', 'scaleY', 'rotation', 'x', 'y', 'radius', 'angle', 'opacity'];
	var scale = (matrix.hasOwnProperty('scale') ? matrix.scale : 1);
	var scaleX = (matrix.hasOwnProperty('scaleX') ? matrix.scaleX * scale : scale);
	var scaleY = (matrix.hasOwnProperty('scaleY') ? matrix.scaleY * scale : scale);
	var rotation = (matrix.hasOwnProperty('rotation') ? matrix.rotation : 0) * (Math.PI / 180);
	var x = (matrix.hasOwnProperty('x') ? matrix.x : 0);
	var y = (matrix.hasOwnProperty('y') ? matrix.y : 0);
	var opacity = (matrix.hasOwnProperty('opacity') ? matrix.opacity : 1);
	
	if (matrix.hasOwnProperty('radius') && matrix.hasOwnProperty('angle'))
	{
		var radius = matrix.radius;
		var angle = matrix.angle;
		
		x = Math.round(radius * Math.cos(angle * Math.PI / 180) * 100) / 100 + x;
		y = Math.round(radius * Math.sin(angle * Math.PI / 180) * 100) / 100 + y;
		
	}
	
	
	var data = [scaleX * Math.cos(rotation), -scaleY * Math.sin(rotation)       ,
			    scaleY * Math.sin(rotation)        , scaleX * Math.cos(rotation), x, y];
	
	
	var transform = 'matrix(' + data.join(',') + ')';
	
	for (var iElem = 0; iElem < elements.length; iElem++)
	{
		var element = elements[iElem];
		if (matrix.hasOwnProperty('opacity'))
		{
			element.style.opacity = opacity;
		}
		
		element.style.transform = transform;
		element.style.MozTransform = transform;
		element.style.WebkitTransform = transform;
		element.style.msTransform = transform;
		element.style.OTransform = transform;

		for (var property in matrix)
		{
			var propertyMatch = false;
			for (var iProp = 0; iProp < properties.length; iProp++)
			{
				if (properties[iProp] === property)
				{
					propertyMatch = true;
				}
			}
			if (!propertyMatch)
			{
				element.style[property] = matrix[property];
			}
		}
	}
	
		
	return false;
	for (var iElem = 0; iElem < elements.length; iElem++)
	{
		var enableTransform = false;
		var element = elements[iElem];
		if (!element.animation)
		{
			element.animation = {};
		}
		if (element.animation.x != x)
		{
			element.animation.x = x;
			enableTransform = true;
		}
		if (element.animation.y != y)
		{
			element.animation.y = y;
			enableTransform = true;
		}
		if (element.animation.scaleX != scaleX)
		{
			element.animation.scaleX = scaleX;
			enableTransform = true;
		}
		if (element.animation.scaleY != scaleY)
		{
			element.animation.scaleY = scaleY;
			enableTransform = true;
		}
		if (element.animation.rotation != matrix.rotation)
		{
			element.animation.rotation = matrix.rotation;
			enableTransform = true;
		}
		if (matrix.hasOwnProperty('opacity'))
		{
			if (element.animation.opacity != opacity)
			{
				element.style.opacity = opacity;
				element.animation.opacity = opacity;
			}
		}
		if (enableTransform)
		{
			element.style.transform = transform;
			element.style.MozTransform = transform;
			element.style.WebkitTransform = transform;
			element.style.msTransform = transform;
			element.style.OTransform = transform;
		}
		
	}
}















/**
 * This is a static class which only purpose is to scroll to y position the current page. You dont need to create an
 * instance to use it
 * @static
 * @class
 * @see {@link https://jsfiddle.net/12ew84gc/} Online Demo
 */
var Scroll = {};
Scroll.end;
Scroll.timeLine = new TimeLine(500, 33);
Scroll.timeLine.addEventListener(Event.CHANGE, 'refresh', Scroll);
/**
*	Makes the page scroll to the specify position
*	@param {number} position The y position at which you want to scroll
*	@example <caption>Scrolls the page to scrollTop at 600px when the div is click</caption>
*	<div onclick="Scroll.go(600)">Scroll to 600px</div>
*/
Scroll.go = function(position, element, scrollTop)
{
    Scroll.element = element;
	Scroll.start = (Scroll.element ? element.scrollTop : (scrollTop || document.body.scrollTop || document.documentElement.scrollTop));
	if (position.nodeType)
	{
		position = position.getBoundingClientRect().top + Scroll.start;
	}
	
	Scroll.end = position;
	console.log(Scroll.start, Scroll.end)
	Scroll.timeLine.duration = Math.min(Math.max(200, Math.abs(Scroll.end - Scroll.start) * 1.5), 1500);
	Scroll.timeLine.position = 0;
	Scroll.timeLine.play();
}

Scroll.refresh = function()
{
	var position = Scroll.start + (Scroll.end - Scroll.start) * Scroll.timeLine.getTime(0, Scroll.timeLine.duration);
    if (Scroll.element)
    {
        Scroll.element.scrollTop = position
    }
    else
    {
        document.body.scrollTop = position
        document.documentElement.scrollTop = position;
    }
	
}
