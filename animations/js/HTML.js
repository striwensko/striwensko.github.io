/*
 *	STRIWENSKO LIBRARY HTML ELEMENT CLASS
 *  v 1.2
 */
Object.extend = function(destination, source)
{
    for (var property in source)
        destination[property] = source[property];
    return destination;
};
Object.merge = function(obj, src)
{
    for (var property in src)
    {
        if (obj[property] &&
            obj[property].constructor == Object && src[property].constructor == Object)
        {
            Object.merge(obj[property], src[property]);
        }
        else
        {
            obj[property] = src[property];
        }
    }
    return obj;
}


Event = {};

/**
*	@event Event#ERROR
*	@type {object}
*	@property {string} type The value of the type is Event.ERROR
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.ERROR = 'error';
/**
*	@event Event#CANCEL
*	@type {object}
*	@property {string} type The value of the type is Event.CANCEL
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.CANCEL = "cancel";
/**
*	@event Event#OPEN
*	@type {object}
*	@property {string} type The value of the type is Event.OPEN
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.OPEN = "open";
/**
*	@event Event#CLOSE
*	@type {object}
*	@property {string} type The value of the type is Event.CLOSE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.CLOSE = 'close';
/**
*	@event Event#COMPLETE
*	@type {object}
*	@property {string} type The value of the type is Event.COMPLETE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.COMPLETE = "onComplete";
/**
*	@event Event#CHANGE
*	@type {object}
*	@property {string} type The value of the type is Event.CHANGE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.CHANGE = "onChange";
/**
*	@event Event#MOVE
*	@type {object}
*	@property {string} type The value of the type is Event.MOVE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.MOVE = "MOVE";
/**
*	@event Event#START
*	@type {object}
*	@property {string} type The value of the type is Event.START
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.START = "START";
/**
*	@event Event#STOP
*	@type {object}
*	@property {string} type The value of the type is Event.STOP
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.STOP = "STOP";
/**
*	@event Event#RESIZE
*	@type {object}
*	@property {string} type The value of the type is Event.RESIZE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.RESIZE = "resize";
/**
*	@event Event#SELECT
*	@type {object}
*	@property {string} type The value of the type is Event.SELECT
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.SELECT = "select";
/**
*	@event Event#RENDER
*	@type {object}
*	@property {string} type The value of the type is Event.RENDER
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.RENDER = "render";
/**
*	@event Event#REFRESH
*	@type {object}
*	@property {string} type The value of the type is Event.REFRESH
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.REFRESH = "refresh";
/**
*	@event Event#STATE_CHANGE
*	@type {object}
*	@property {string} type The value of the type is Event.STATE_CHANGE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.STATE_CHANGE = "stateChange";
/**
*	@event Event#SOUND_COMPLETE
*	@type {object}
*	@property {string} type The value of the type is Event.SOUND_COMPLETE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.SOUND_COMPLETE = "soundComplete";
/**
*	@event Event#FOCUS_OUT
*	@type {object}
*	@property {string} type The value of the type is Event.FOCUS_OUT
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.FOCUS_OUT = "focusOut";
/**
*	@event Event#FOCUS_IN
*	@type {object}
*	@property {string} type The value of the type is Event.FOCUS_IN
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.FOCUS_IN = "focusIn";
/**
*	@event Event#ADD
*	@type {object}
*	@property {string} type The value of the type is Event.REMOVE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.ADD = 'add';
/**
*	@event Event#REMOVE
*	@type {object}
*	@property {string} type The value of the type is Event.REMOVE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.REMOVE = 'remove';
/**
*	@event Event#PROGRESS
*	@type {object}
*	@property {string} type The value of the type is Event.PROGRESS
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.PROGRESS = 'progress';
/**
*	@event Event#UPLOAD
*	@type {object}
*	@property {string} type The value of the type is Event.UPLOAD
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.UPLOAD = 'upload';
Event.REMOVE = 'remove';
Event.DELETE = 'delete';

/*
 *	DOCUMENT SIZE 
 */


var DIMS = {};

function readSize()
{
    var myWidth = 0,
        myHeight = 0;
    if (typeof(window.innerWidth) == 'number')
    {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }
    else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
    {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    }
    else if (document.body && (document.body.clientWidth || document.body.clientHeight))
    {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    //alert( 'Width = ' + myWidth + ', Height = ' + myHeight + "." + f_clientWidth() + "." + f_clientHeight());
    DIMS.width = myWidth;
    DIMS.height = myHeight;
    //alert(DIMS.width + "x" + DIMS.height);
}


function easing(startVal, endVal, speed, maxVal, minVal, round)
{
    if (startVal == endVal)
    {
        return 0;
    }
    minVal = isNaN(minVal) ? 1 : minVal;
    var easingVal = (endVal - startVal) / speed;
    if (round)
    {
        easingVal = (startVal < endVal) ? Math.ceil(easingVal) : Math.floor(easingVal);
    }

    if (Math.abs(easingVal) < minVal)
    {
        if (Math.abs(startVal - endVal) > minVal)
        {
            return (endVal > startVal) ? minVal : -minVal;
        }
        else
        {
            return (endVal - startVal);
        }
    }
    return (startVal < endVal) ? Math.min(easingVal, maxVal) : Math.max(easingVal, -maxVal);
}


function addEvent(obj, evt, fn)
{
    if (obj.addEventListener)
    {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent)
    {
        obj.attachEvent('on' + evt, fn);
    }
}

function removeEvent(obj, evt, fn)
{
    if (obj.removeEventListener)
    {
        obj.removeEventListener(evt, fn, false);
    }
    else if (obj.detachEvent)
    {
        obj.detachEvent('on' + evt, fn);
    }
}
addEventSimple = addEvent;
removeEventSimple = removeEvent;

function RESIZE_DIMS(width, height, areaWidth, areaHeigth, mode, align, resizeSmallImages)
{
    var c_w = width;
    var c_h = height;

    // Desired Width and Heigth 
    var d_w = areaWidth;
    var d_h = areaHeigth;

    // New Width and Height
    var n_h = c_h;
    var n_w = c_w;

    if (mode == "VIEW_ALL")
    {
        //Code to place image to the maximum size to view all
        n_h = d_h;
        n_w = c_w * d_h / c_h;
        if (n_w > d_w)
        {
            n_h = c_h * d_w / c_w;
            n_w = d_w;
        }
    }
    if (mode == "FILL_ALL")
    {
        //Code to make image cover all size
        n_h = d_h;
        n_w = c_w * d_h / c_h;
        if (n_w < d_w)
        {
            n_h = c_h * d_w / c_w;
            n_w = d_w;
        }
    }

    if (resizeSmallImages == false)
    {
        if ((n_w > c_w) || (n_h > c_h))
        {
            n_h = c_h;
            n_w = c_w;
        }
    }

    n_w = Math.round(n_w);
    n_h = Math.round(n_h);

    var n_x = -Math.round((n_w - d_w) / 2);
    var n_y = -Math.round((n_h - d_h) / 2);

    var pos_str = align || 'C';
    if (pos_str.slice(0, 1) == "T")
    {
        n_y = 0;
    }
    if (pos_str.slice(0, 1) == "B")
    {
        n_y = d_h - n_h;
    }
    if (pos_str.slice(0, 1) == "L" || pos_str.slice(1, 2) == "L")
    {
        n_x = 0;
    }
    if (pos_str.slice(0, 1) == "R" || pos_str.slice(1, 2) == "R")
    {
        n_x = d_w - n_w;
    }

    return {
        width: n_w,
        height: n_h,
        x: n_x,
        y: n_y
    };
}

/**
 *	EVENT DISPATCHER, this class implements an event dispatcher which can be added to any object via ADD_EVENT_DISPATCHER(object) global function
 *	@class
 *	@see {@link https://jsfiddle.net/oxmtu5hn/2/} Tabs Bar demo
 *	@see {@link https://jsfiddle.net/k1v4g5rw/3/} Slider Demo
*	@see {@link https://jsfiddle.net/7hsq25n1/}   Checkbox
 *  @see {@link https://jsfiddle.net/3fvc6u0h/2/} Dropdown Demo
 *	@see {@link https://jsfiddle.net/skx8px2z/8/} Radio Button Demo
 *  @see {@link https://jsfiddle.net/gantp3pv/4/} TextField
 *  @see {@link https://jsfiddle.net/ktahn5ww/1/} Numeric Input
 */
//Label, ImageUploader, Calendar, Hidden, TextArea 
var Event_Dispatcher = {}
//https://jsfiddle.net/xkn7xhfn/
/**
*	This function Implements the event dispatcher functions on any object you send in.
*	YOu can call this inside a class you create so all instances of that class are able to dispatchEvents.
*	This is how is currently set up on the JSON_Loader, TimeLine and DragTouch class.
*	@see {Event_Dispatcher}
*/
function ADD_EVENT_DISPATCHER(element)
{
    Object.extend(element, Event_Dispatcher);
}
Event_Dispatcher.all = function(array)
{
	
}

var StateManager = {};
StateManager.setState = function(data)
{
    var self = this;
    if (!this.state)
    {
        this.state = {};
    }
    //console.log("setState", data)
    if (!this.__stateManager)
    {
        this.__stateManager = {pending: [], onState: function(){
            var pipe = self.__stateManager.pending;
            //console.log(JSON.stringify(pipe))
            var new_data  = {};
            while (pipe.length > 0)
            {
                new_data = Object.merge(new_data, pipe.shift());
            }
            self.state = Object.merge({}, self.state);
            self.state = Object.merge(self.state, new_data);
            self.__stateManager.requestUpdate = false;
            
            self.onState && self.onState(new_data);
            
        }}
    }
    this.__stateManager.pending.push(data);

    if (this.__stateManager.requestUpdate)
    {
        return true;
    }
    this.__stateManager.requestUpdate = true;
    //this.state = Object.merge({}, this.state);
    //this.state = Object.merge(this.state, data);
    
    var doAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
			
    if (doAnimation)
    {
        doAnimation(this.requestStateUpdate);
    }
    else
    {
        var self = this;
        setTimeout(function(){self.requestStateUpdate()}, 33);
    }
}

function ADD_STATE_MANAGER(element)
{
    Object.extend(element, StateManager);
    if (!element.state)
    {
        element.state = {};
    }
    element.requestStateUpdate = function(timeStamp){element.__stateManager.onState()};
}
/**
*	Adds an event listener to the object
*	@param {string} type The type of event you want to listen to.
*	@param {function | string} listener The function or name of the function you want to call when the event you are listening is dispatched
*	@param {object} scope The object on which the listener function will be called
*/
Event_Dispatcher.addEventListener = function(type, listener, scope)
{
    if (!this.events)
    {
        this.events = {};
    }
    if (!this.events[type])
    {
        this.events[type] = new Array();
    }
	//scope = (scope ? scope : this);
    this.events[type].push(
    {
        listener: listener,
        scope: scope
    });
}

/**
*	Dispatchs and event, which means that listener that were added for the type being dispatched will fire
*	@param {string} type The type of event to fire
*	@param {object} data The data that will be attached to the event, the objects listening will get this data via event.data
*/
Event_Dispatcher.dispatchEvent = function(type, data)
{
    if (!this.events)
    {
        this.events = {};
    }
    if (this.events[type])
    {
        var events = this.events[type];
        for (var iEvent = 0; iEvent < events.length; iEvent++)
        {
            var listener = events[iEvent].listener;
            var scope = events[iEvent].scope;

            if ((typeof listener).toString() == "function")
            {
                if (scope)
                {
                    scope.eventRecieverFunction = listener;
                    scope.eventRecieverFunction(
                    {
                        currentTarget: this,
                        type: type,
                        data: data
                    });
                }
                else
                {
                    listener(
                    {
                        currentTarget: this,
                        type: type,
                        data: data
                    });
                }
            }
            else
            {
                scope[listener](
                {
                    currentTarget: this,
                    type: type,
                    data: data
                });
            }
        }
    }
}
/**
*	Removes an event listener to the object
*	@param {string} type The type of event you want to stop listening to.
*	@param {function | string} listener The function or name of the function you were to call when the event is dispatched
*	@param {object} scope The object on which the listener function was being called
*/
Event_Dispatcher.removeEventListener = function(type, listener, scope)
{
    if (!this.events)
    {
        return false;
    }
    if (!this.events[type])
    {
        return false;
    }

    var events = this.events[type];
    for (var iEvent = 0; iEvent < events.length; iEvent++)
    {
        if ((listener == events[iEvent].listener) && (scope == events[iEvent].scope))
        {
            events.splice(iEvent, 1);
        }
    }
}


Event_Dispatcher._addEventListener = Event_Dispatcher.addEventListener;

Event_Dispatcher._dispatchEvent = Event_Dispatcher.dispatchEvent;

Event_Dispatcher._removeEventListener = Event_Dispatcher.removeEventListener;

Browser = {};
Browser.DOM = function (html, scope) {
    var node = document.createElement('div');
    node.innerHTML = html;

    var _scope = scope || {};

    function toScope(node, scope) {
        var children = node.children;
        for (var iChild = 0; iChild < children.length; iChild++) {
            if (children[iChild].getAttribute('var')) {

                var names = children[iChild].getAttribute('var').split('.');
                var obj = scope;
                while (names.length > 0)
                {
                    var _property = names.shift();
                    if (names.length == 0)
                    {
                        obj[_property] = children[iChild];
                    }
                    else
                    {
                        obj = obj[_property];
                    }
                }
            }
            toScope(children[iChild], scope);
        }
    }
    toScope(node, _scope);

    if (node.childNodes.length == 1) {
        if (!scope) {
            node.childNodes[0].nodes = _scope;
        }
        return node.childNodes[0];
    }

    var fragment = document.createDocumentFragment();
    var children = node.childNodes;
    while (children.length > 0) {
        fragment.append(children[0]);
    }
    fragment.nodes = _scope;
    return fragment;
}
Browser.urlParams = function(url)
{
    var href = url || window.location.href;
    if (href.split('?').length == '1')
    {
        return {};
    }
    var params = href.split('?').pop().split('&');
    var object = {};
    for (var iParam = 0; iParam < params.length; iParam++)
    {
        var param = params[iParam].split('=');
        object[param[0]] = param[1];
    }
    return object;
}
Browser.urlUpdate = function(data){
    var href = window.location.href;
    var object = {};
    if (href.split('?').length == '2')
    {
        var params = href.split('?').pop().split('&');
        
        for (var iParam = 0; iParam < params.length; iParam++)
        {
            var param = params[iParam].split('=');
            object[param[0]] = param[1];
        }
    }
    for (var property in data)
    {
        object[property] = data[property];
    }
    var url = href.split('?')[0] + '?';
    var params = '';
    for (var property in object)
    {
        params += (params == '' ? '' : '&') + property + '=' + object[property];
    }
    return (url + params)
}
Browser.Router = {};
Browser.Router.url = null;
Browser.Router.routes = [];
Browser.Router.optionalParam = /\((.*?)\)/gim;
Browser.Router.namedParam    = /(\(\?)?:\w+;/gim;
Browser.Router.splatParam    = /\*\w+/gim;
Browser.Router.escapeRegExp =  /[\-{}\[\]+?.,\\\^$|#\s]/gim;

ADD_EVENT_DISPATCHER(Browser.Router);
Browser.Router.start = function()
{
    var self = this;
    window.onpopstate = function(){self.onRoute();}
	this.onRoute();
}
Browser.Router.onRoute = function()
{
    var location = document.location.toString(); 
    if (this.url != location)
	{
        var route = location.split('#');
		route = (route.length > 1) ? route.pop() : '';
        
        this.url = location;
        this.detectRoute(route);
    }
}
Browser.Router.supportSlashHistory = function()
{
	return !!(window.history && (typeof window.history.pushState != "undefined"));
}
Browser.Router.navigate = function(path, data, makeHistory)
{
    if (this.supportSlashHistory())
	{
		var location = window.location.toString().split('#')[0];
		if (path.split('=').length == 1 || true)
        {
            location = location + '#' + path;
        }
        else
        {
            location = location + '?' + path;
        }

		if ((this.url != location))
		{
			this.url = location;
			
            if (makeHistory == false)
            {
                window.history.replaceState(data, "", location);
            }
            else
            {
                window.history.pushState(data, "", location);
            }
		}
        
        this.detectRoute(path);
	}
}
Browser.Router.detectRoute = function(route)
{
    for (var iRoute = 0; iRoute < this.routes.length; iRoute++)
    {
        var doMatch = route.match(this.routes[iRoute].regExp);
        
        if (doMatch)
        {
            var values = this.routes[iRoute].regExp.exec(route).slice(1);
            var params = this.routes[iRoute].paramNames;
            var data = {};
            
            if (params)
            {
                for (var iParam = 0; iParam < params.length; iParam++)
                {
                    var vars = params[iParam].split(':');
                    if (vars.length == 2)
                    {
                        
                        data[vars[0]] || (data[vars[0]] = {});
                        data[vars[0]][vars[1]] = values[iParam];
                    }
                    else
                    {
                        data[params[iParam]] = values[iParam];
                    }
                }
            }
            this.dispatchEvent(Event.CHANGE, {path:route, data:this.routes[iRoute].data, params:data});
            //HYDRA.PAGE.Loader(this.routes[iRoute].page, data);
            break;
        }
    }
}
Browser.Router.addRoute = function(path, data)
{ 
    var route = {};
    route.path = path;
    route.data = data;
    
    path = path.replace(/\:/gim, '___');
	path = path.replace(/\{/gim, ':').replace(/\}/gim, ';');
    
	var paramNames = path.match(Browser.Router.namedParam);
    route.paramNames = paramNames;
    
	if (paramNames)
	{
		for (var iParam = 0; iParam < paramNames.length; iParam++)
		{
			paramNames[iParam] = paramNames[iParam].replace(':', '').replace(';', '');
			paramNames[iParam] = paramNames[iParam].replace('___', ':');
		}
	}
    
    
    route.regExp = this.translatePathToRegExp(path);
    if (path.split('{').length > 1)
	{
        this.routes.push(route);
    }
    else
    {
        this.routes.unshift(route);
    }
}
Browser.Router.translatePathToRegExp = function(route)
{
    route = route.replace(Browser.Router.escapeRegExp, '\\$&');
    route = route.replace(Browser.Router.optionalParam, '(?:$1)?');
    route = route.replace(Browser.Router.namedParam, function(match, optional) {return optional ? match : '([^\/]+)';});
	route = route.replace(Browser.Router.splatParam, '(.*?)');
	return new RegExp('^' + route + '$');
}


Browser.getSize = function()
{
    var myWidth = 0,
        myHeight = 0;
    if (typeof(window.innerWidth) == 'number')
    {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }
    else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
    {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    }
    else if (document.body && (document.body.clientWidth || document.body.clientHeight))
    {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    //alert( 'Width = ' + myWidth + ', Height = ' + myHeight + "." + f_clientWidth() + "." + f_clientHeight());
    Browser.width = myWidth;
    Browser.height = myHeight;
    return {width:myWidth, height:myHeight};
}
Browser.Message = function ()
{
	this.holder = document.createElement('div');
	this.holder.className = 'messageSystem';

	this.items = {};
	document.body.appendChild(this.holder);

	this.timeLine = new TimeLine(Infinity, 33);
	this.timeLine.addEventListener(Event.CHANGE, 'update', this);
	this.timeLine.play();
}
Browser.Message.prototype.update = function(event)
{
	for (var property in this.items)
	{
		var item = this.items[property];
		if (!item)
		{
			continue;
		}
		item.style.opacity = 1 * this.timeLine.getTime(item.startTime, 300);
        item.style.marginBottom = 35 * (1 - this.timeLine.getTime(item.startTime, 300)) + 'px'
        //console.log(item.style.marginTop);
		if (item.endTime && this.timeLine.position > item.endTime)
		{
			item.style.opacity = 1 - this.timeLine.getTime(item.endTime, 300);
			//item.style.marginTop = -10 * (this.timeLine.getTime(item.endTime, 300)) + 'px'
			if (this.timeLine.position > item.endTime + 300)
			{
				item.parentNode.removeChild(item);
				this.items[item.id] = null;
			}
		}
	}

}
Browser.Message.prototype.hide = function (id, no_animation)
{
    var item;
    if (this.items[id]) {
        item = this.items[id];
        item.endTime = this.timeLine.position + (no_animation == true ? -300 : 0);
    }
    this.update();
}
Browser.Message.prototype.show = function(message, delay, id)
{
	var id = (id) ? id : ('msg_' + (new Date()).getTime() + "_" + Math.floor(1000 * Math.random()) );
	var items = this.items;
	var item;

	if (this.items[id])
	{
		item = this.items[id];
	}
	else
	{
		item = document.createElement('div');
		item.id = id;
		item.style.opacity = 0.5;
        item.startTime = this.timeLine.position;
        if (this.holder.children.length > 0)
        {
            this.holder.insertBefore(item, this.holder.children[0]);
        }
        else
        {
            this.holder.appendChild(item);
        }
		

		items[id] = item;
	}

	item.innerHTML = message;

	if (delay)
	{
		item.endTime = this.timeLine.position + delay;
	}
	else
	{
	    item.endTime = null;
	}
	return id;
}
Browser.Message.show = function(message, delay, id)
{
  if (!this.instance)
  {
    this.instance = new Browser.Message();

  }
  this.instance.show(message, delay, id);
}

Browser.DOM = function (html, scope) {
    var node = document.createElement('div');
    node.innerHTML = html;

    var _scope = scope || {};

    function toScope(node, scope) {
        var children = node.children;
        for (var iChild = 0; iChild < children.length; iChild++) {
            if (children[iChild].getAttribute('var')) {

                var names = children[iChild].getAttribute('var').split('.');
                var obj = scope;
                while (names.length > 0)
                {
                    var _property = names.shift();
                    if (names.length == 0)
                    {
                        obj[_property] = children[iChild];
                    }
                    else
                    {
                        obj = obj[_property];
                    }
                }
            }
            toScope(children[iChild], scope);
        }
    }
    toScope(node, _scope);

    if (node.childNodes.length == 1) {
        if (!scope) {
            node.childNodes[0].nodes = _scope;
        }
        return node.childNodes[0];
    }

    var fragment = document.createDocumentFragment();
    var children = node.childNodes;
    while (children.length > 0) {
        fragment.append(children[0]);
    }
    fragment.nodes = _scope;
    return fragment;
}
Browser.UI = {};
Browser.UI.collapse = function (button, panel, isExpanded, classes) {
    var height = 0;
    button.collapse = {};
    var timeLine = new TimeLine(500, 33);
    timeLine.position = isExpanded ? 500 : 0;
    timeLine.direction = isExpanded ? 1 : -1;
    timeLine.addEventListener(Event.CHANGE, 'render', timeLine);
    timeLine.render = function () {
        panel.style.height = (height * this.getTime(0, 500)) + 'px';
        panel.style.display = (this.position == 0 ? 'none' : '');
        panel.style.overflow = (this.position == this.duration ? '' : 'hidden');

    }
    button.collapse.toggle = function (event) {
        timeLine.direction = ((timeLine.direction == 1) ? -1 : 1);
        var overflow = panel.style.overflow;
        var display = panel.style.display;

        panel.style.height = '';
        panel.style.display = 'block';
        panel.style.overflow = 'visible';

        height = panel.offsetHeight;
        console.log(height);

        panel.style.display = display;
        panel.style.overflow = overflow;

        timeLine.play();

        if (classes)
        {
            (classes.toggleButton || button).className = (timeLine.direction == 1 ? classes.open : classes.close);
        }
    }
    button.onclick = button.collapse.toggle;
}
Browser.UI.popupize = function(button, popup, open_classname)
{
    button.popup = {};
    button.popup.mouseDownFN = function (event)
    {
        var target = event.target;
        while (target)
        {
            if (target == button || target == popup)
            {
                return true;
            }
            target = target.parentNode;
        }
        popup.style.display = 'none';
        open_classname && button.classList.remove(open_classname);
        removeEventSimple(document, 'mousedown', button.popup.mouseDownFN);
    }
    button.popup.close = function()
    {
        popup.style.display = 'none';
        open_classname && button.classList.remove(open_classname);
        removeEventSimple(document, 'mousedown', button.popup.mouseDownFN);
    }
    button.popup.toggle = function (event)
    {
        var target = event.target;
        while (target)
        {
            if (target == popup)
            {
                return true;
            }
            target = target.parentNode;
        }
        popup.style.display = ((popup.style.display == 'none') ? '' : 'none');
        if (popup.style.display == '')
        {
            if (open_classname && !button.classList.contains(open_classname))
            {
                open_classname && button.classList.add(open_classname);
            }
            addEventSimple(document, 'mousedown', button.popup.mouseDownFN);
        }
        else {
            open_classname && button.classList.remove(open_classname)
            removeEventSimple(document, 'mousedown', button.popup.mouseDownFN);
        }
    }
    button.onclick = button.popup.toggle;
}
Browser.UI.reorder = function (item, event, callback) {
	var holder = item.parentNode;
	var children = item.parentNode.children;
	var bottom = children[children.length - 1].getBoundingClientRect().bottom - item.parentNode.getBoundingClientRect().top - item.getBoundingClientRect().height;

	var clone_item = item.cloneNode(true);
	clone_item.style.position = 'absolute';
	clone_item.style.opacity = 0.7;
	
	clone_item.style.backgroundColor = '#fff';
	clone_item.style.top = (item.getBoundingClientRect().top - item.parentNode.getBoundingClientRect().top) + 'px';
	item.parentNode.appendChild(clone_item);
	var drag_touch = new DragTouch();
	var has_moved = false;
	drag_touch.addEventListener(Event.MOVE, function () {
		has_moved = true;
		if (clone_item.style.display == 'none')
		{
			clone_item.style.display = '';
		}
		item.style.opacity = 0;

		var top = clone_item.offsetTop + holder.getBoundingClientRect().top;
		var bottom = clone_item.offsetTop + clone_item.offsetHeight + holder.getBoundingClientRect().top;
		var children = holder.children;

		for (var iChild = 0; iChild < children.length; iChild++) {
			var child = children[iChild];
			var rect = child.getBoundingClientRect();
			if (child == clone_item) {
				break;
			}
			if (top <= rect.top + rect.height / 2 && top >= rect.top) {
				if (child != item) {
					holder.insertBefore(item, child);
					//console.log('a', iChild, top, rect.top, rect.height)
					return true;
				}
			}
			if (bottom <= rect.top + rect.height && bottom >= rect.top + rect.height / 2) {
				if (child != item) {
					holder.insertBefore(child, item);
					//console.log('b', iChild, top, rect.top, rect.height)
					return true;
				}
			}
		}
	});
	drag_touch.addEventListener(Event.STOP, function () {
		item.style.opacity = '';
		item.parentNode.removeChild(clone_item);
		has_moved && callback(item);
	});
	drag_touch.startDrag(event, clone_item, { top: 0, bottom: bottom });
	clone_item.style.display = 'none';
}
    
/**
*	This class helps you load an image from the computer or phone of the user
*	@class
*   @fires Event:CHANGE Fires when a new image was selected by the user and is available
*/
ImageUploader = function(settings)
{
    this.fileInput = document.createElement("input");
    this.fileInput.setAttribute("type", "file");
	this.fileInput.setAttribute("accept", "image/*");
    this.fileInput.setAttribute("onchange", "this.dragUploader.processFiles(this.files)");
    this.fileInput.dragUploader = this;
    //this.fileInput.style.display = 'none';

    document.body.appendChild(this.fileInput);
    this.fileInput.style.position = 'fixed';
    this.fileInput.style.top = '-300px';

    this.upload = settings && settings.upload;

    ADD_EVENT_DISPATCHER(this);
}
/**
*	Call this to open dialog for selecting a file from the computer or the phone
*	@param {event} event This event must be a dom click event to work on all browsers and devices
*/
ImageUploader.prototype.browse = function(event)
{
    console.log(event);
    this.fileInput.setAttribute("multiple", "multiple");
    this.fileInput.click(event);
}

ImageUploader.prototype.imageReady = function(fileData, fileName)
{
    this.data = fileData;
    console.log("fileName", fileName);
    this.dispatchEvent(Event.COMPLETE,
    {
        fileName: fileName
    });

    this.fileInput.setAttribute("onchange", "");
    this.fileInput.dragUploader = null;
    document.body.removeChild(this.fileInput);

    this.fileInput = document.createElement("input");
    this.fileInput.setAttribute("type", "file");
    this.fileInput.setAttribute("onchange", "this.dragUploader.processFiles(this.files)");
    this.fileInput.dragUploader = this;

    document.body.appendChild(this.fileInput);
    this.fileInput.style.position = 'fixed';
    this.fileInput.style.top = '-300px';
}
ImageUploader.prototype.onProgress = function(event)
{
    this.progress = event.loaded / event.total;
    this.dispatchEvent(Event.PROGRESS)
}
ImageUploader.prototype.startUpload = function(f)
{
    if (this.upload)
    {
        var self = this;
        var data = new FormData();
        data.append('file', f);
        var request = new XMLHttpRequest();
        request.onreadystatechange = function()
        {
            if (request.readyState == 4)
            {
                if (request.status == 200)
                {
                    try
                    {
                        var json = JSON.parse(this.responseText);
                        self.dispatchEvent(Event.UPLOAD, json);
                    }
                    catch (e)
                    {
                        self.dispatchEvent(Event.UPLOAD);
                    }
                }

            }
        };
        request.upload.addEventListener('progress', function(event)
        {
            self.onProgress(event);
        }, false);
        request.open('POST', this.upload);
        request.send(data);
    }
}
ImageUploader.prototype.processFiles = function (files, index)
{
    //console.log('file:', this.fileInput);
    // files is a FileList of File objects. List some properties.
    index = (index ? index : 0);
    var f = files[index];
    //console.log(files);
    if (f)
    {

        //console.log(f);
        var fileName = f.name;
        var ext = fileName.split(/\./).pop().toLowerCase();

        var self = this;
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = function(e)
        {
            self.startUpload(f);
            self.imageReady(e.target.result, fileName);
            index++;
            if (index < files.length) {
                self.processFiles(files, index);
            }
        };

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
    //document.getElementById('msg').innerHTML = ;
}