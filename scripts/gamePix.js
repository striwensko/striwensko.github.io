(function(){
    Object.extend=function(e,t){for(var n in t)e[n]=t[n];return e},Object.merge=function(e,t){for(var n in t)null===t[n]?e[n]=null:e[n]&&e[n].constructor==Object&&t[n].constructor==Object?Object.merge(e[n],t[n]):e[n]=t[n];return e},EVENT={},EVENT.ERROR="error",EVENT.CANCEL="cancel",EVENT.OPEN="open",EVENT.CLOSE="close",EVENT.COMPLETE="onComplete",EVENT.CHANGE="onChange",EVENT.MOVE="MOVE",EVENT.START="START",EVENT.STOP="STOP",EVENT.RESIZE="resize",EVENT.SELECT="select",EVENT.RENDER="render",EVENT.REFRESH="refresh",EVENT.STATE_CHANGE="stateChange",EVENT.SOUND_COMPLETE="soundComplete",EVENT.FOCUS_OUT="focusOut",EVENT.FOCUS_IN="focusIn",EVENT.ADD="add",EVENT.REMOVE="remove",EVENT.PROGRESS="progress",EVENT.UPLOAD="upload",EVENT.REMOVE="remove",EVENT.DELETE="delete";var DIMS={};function readSize(){var e=0,t=0;"number"==typeof window.innerWidth?(e=window.innerWidth,t=window.innerHeight):document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?(e=document.documentElement.clientWidth,t=document.documentElement.clientHeight):document.body&&(document.body.clientWidth||document.body.clientHeight)&&(e=document.body.clientWidth,t=document.body.clientHeight),DIMS.width=e,DIMS.height=t}function easing(e,t,n,i,o,r){if(e==t)return 0;o=isNaN(o)?1:o;var s=(t-e)/n;return r&&(s=e<t?Math.ceil(s):Math.floor(s)),Math.abs(s)<o?Math.abs(e-t)>o?t>e?o:-o:t-e:e<t?Math.min(s,i):Math.max(s,-i)}function addEvent(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function removeEvent(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)}function RESIZE_DIMS(e,t,n,i,o,r,s){var a=n,l=i,d=t,p=e;"VIEW_ALL"==o&&(d=l,(p=e*l/t)>a&&(d=t*a/e,p=a)),"FILL_ALL"==o&&(d=l,(p=e*l/t)<a&&(d=t*a/e,p=a)),0==s&&(p>e||d>t)&&(d=t,p=e),p=Math.round(p),d=Math.round(d);var h=-Math.round((p-a)/2),u=-Math.round((d-l)/2),c=r||"C";return"T"==c.slice(0,1)&&(u=0),"B"==c.slice(0,1)&&(u=l-d),"L"!=c.slice(0,1)&&"L"!=c.slice(1,2)||(h=0),"R"!=c.slice(0,1)&&"R"!=c.slice(1,2)||(h=a-p),{width:p,height:d,x:h,y:u}}addEventSimple=addEvent,removeEventSimple=removeEvent;var Event_Dispatcher={};function ADD_EVENT_DISPATCHER(e){Object.extend(e,Event_Dispatcher)}Event_Dispatcher.all=function(e){};var StateManager={};function ADD_STATE_MANAGER(e){Object.extend(e,StateManager),e.state||(e.state={}),e.requestStateUpdate=function(t){e.__stateManager.onState()}}StateManager.setState=function(e,t){var n=this;if(this.state||(this.state={}),this.__stateManager||(this.__stateManager={pending:[],onState:function(){for(var e=n.__stateManager.pending,t=[],i={};e.length>0;){var o=e.shift();t.push(o),i=Object.merge(i,o.data)}n.state=Object.merge({},n.state),n.state=Object.merge(n.state,i),n.__stateManager.requestUpdate=!1,i.findAction=function(e){for(var n=[],i=0;i<t.length;i++)t[i].data.hasOwnProperty(e)&&t[i].action&&n.push(t[i].action);return n},n.onState&&n.onState(i)}}),this.__stateManager.pending.push({data:e,action:t}),this.__stateManager.requestUpdate)return!0;this.__stateManager.requestUpdate=!0;var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame;if(i)i(this.requestStateUpdate);else{n=this;setTimeout(function(){n.requestStateUpdate()},33)}},Event_Dispatcher.addEventListener=function(e,t,n){this.events||(this.events={}),this.events[e]||(this.events[e]=new Array),this.events[e].push({listener:t,scope:n})},Event_Dispatcher.dispatchEvent=function(e,t){if(this.events||(this.events={}),this.events[e])for(var n=this.events[e],i=0;i<n.length;i++){var o=n[i].listener,r=n[i].scope;"function"==(typeof o).toString()?r?(r.eventRecieverFunction=o,r.eventRecieverFunction({currentTarget:this,type:e,data:t})):o({currentTarget:this,type:e,data:t}):r[o]({currentTarget:this,type:e,data:t})}},Event_Dispatcher.removeEventListener=function(e,t,n){if(!this.events)return!1;if(!this.events[e])return!1;for(var i=this.events[e],o=0;o<i.length;o++)t==i[o].listener&&n==i[o].scope&&i.splice(o,1)},Event_Dispatcher._addEventListener=Event_Dispatcher.addEventListener,Event_Dispatcher._dispatchEvent=Event_Dispatcher.dispatchEvent,Event_Dispatcher._removeEventListener=Event_Dispatcher.removeEventListener,Browser={},Browser.nodeParse=function(e,t){for(var n=e.children,i=0;i<n.length;i++){if(n[i].getAttribute("var"))for(var o=n[i].getAttribute("var").split("."),r=t;o.length>0;){var s=o.shift();0==o.length?r[s]=n[i]:(r.hasOwnProperty(s)||(r[s]={}),r=r[s])}Browser.nodeParse(n[i],t)}},Browser.DOM=function(e,t){var n;e.constructor===String?(n=document.createElement("div")).innerHTML=e:n=e;var i=t||{};if(function e(t,n){for(var i=t.children,o=0;o<i.length;o++){if(i[o].getAttribute("var"))for(var r=i[o].getAttribute("var").split("."),s=n;r.length>0;){var a=r.shift();0==r.length?s[a]=i[o]:(s.hasOwnProperty(a)||(s[a]={}),s=s[a])}e(i[o],n)}}(n,i),e.constructor!=String)return!1;if(1==n.childNodes.length)return t||(n.childNodes[0].nodes=i),n.childNodes[0];for(var o=document.createDocumentFragment(),r=n.childNodes;r.length>0;)o.append(r[0]);return o.nodes=i,o},Browser.urlParams=function(e){var t={},n=e||window.location.href;if(1==n.split("?").length&&1==n.split("#").length)return t;if(n.split("?").length>1)for(var i=n.split("?").pop().split("&"),o=0;o<i.length;o++){t[(r=i[o].split("="))[0]]=r[1]}if(n.split("#").length>1)for(i=n.split("#").pop().split("&"),o=0;o<i.length;o++){var r;t[(r=i[o].split("="))[0]]=r[1]}return t},Browser.urlUpdate=function(e){var t=window.location.href,n={};if("2"==t.split("?").length)for(var i=t.split("?").pop().split("&"),o=0;o<i.length;o++){var r=i[o].split("=");n[r[0]]=r[1]}for(var s in e)n[s]=e[s];var a=t.split("?")[0]+"?";i="";for(var s in n)i+=(""==i?"":"&")+s+"="+n[s];return a+i},Browser.Router={},Browser.Router.url=null,Browser.Router.routes=[],Browser.Router.optionalParam=/\((.*?)\)/gim,Browser.Router.namedParam=/(\(\?)?:\w+;/gim,Browser.Router.splatParam=/\*\w+/gim,Browser.Router.escapeRegExp=/[\-{}\[\]+?.,\\\^$|#\s]/gim,ADD_EVENT_DISPATCHER(Browser.Router),Browser.Router.start=function(){var e=this;window.onpopstate=function(){e.onRoute()},this.onRoute()},Browser.Router.onRoute=function(){var e=document.location.toString();if(this.url!=e){var t=e.split("#");t=t.length>1?t.pop():"",this.url=e,this.detectRoute(t)}},Browser.Router.supportSlashHistory=function(){return!(!window.history||void 0===window.history.pushState)},Browser.Router.navigate=function(e,t,n){if(this.supportSlashHistory()){var i=window.location.toString().split("#")[0];e.split("=").length,i=i+"#"+e,this.url!=i&&(this.url=i,0==n?window.history.replaceState(t,"",i):window.history.pushState(t,"",i)),this.detectRoute(e)}},Browser.Router.detectRoute=function(e){for(var t=0;t<this.routes.length;t++){if(e.match(this.routes[t].regExp)){var n=this.routes[t].regExp.exec(e).slice(1),i=this.routes[t].paramNames,o={};if(i)for(var r=0;r<i.length;r++){var s=i[r].split(":");2==s.length?(o[s[0]]||(o[s[0]]={}),o[s[0]][s[1]]=n[r]):o[i[r]]=n[r]}this.dispatchEvent(EVENT.CHANGE,{path:e,data:this.routes[t].data,params:o});break}}},Browser.Router.addRoute=function(e,t){var n={};n.path=e,n.data=t;var i=(e=(e=e.replace(/\:/gim,"___")).replace(/\{/gim,":").replace(/\}/gim,";")).match(Browser.Router.namedParam);if(n.paramNames=i,i)for(var o=0;o<i.length;o++)i[o]=i[o].replace(":","").replace(";",""),i[o]=i[o].replace("___",":");n.regExp=this.translatePathToRegExp(e),e.split("{").length>1?this.routes.push(n):this.routes.unshift(n)},Browser.Router.translatePathToRegExp=function(e){return e=(e=(e=(e=e.replace(Browser.Router.escapeRegExp,"\\$&")).replace(Browser.Router.optionalParam,"(?:$1)?")).replace(Browser.Router.namedParam,function(e,t){return t?e:"([^/]+)"})).replace(Browser.Router.splatParam,"(.*?)"),new RegExp("^"+e+"$")},Browser.getSize=function(){var e=0,t=0;return"number"==typeof window.innerWidth?(e=window.innerWidth,t=window.innerHeight):document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?(e=document.documentElement.clientWidth,t=document.documentElement.clientHeight):document.body&&(document.body.clientWidth||document.body.clientHeight)&&(e=document.body.clientWidth,t=document.body.clientHeight),Browser.width=e,Browser.height=t,{width:e,height:t}},Browser.Message=function(){this.holder=document.createElement("div"),this.holder.className="messageSystem",this.items={},document.body.appendChild(this.holder),this.timeLine=new TimeLine(1/0,33),this.timeLine.addEventListener(EVENT.CHANGE,"update",this),this.timeLine.play()},Browser.Message.prototype.update=function(e){for(var t in this.items){var n=this.items[t];n&&(n.style.opacity=1*this.timeLine.getTime(n.startTime,300),n.style.marginBottom=35*(1-this.timeLine.getTime(n.startTime,300))+"px",n.endTime&&this.timeLine.position>n.endTime&&(n.style.opacity=1-this.timeLine.getTime(n.endTime,300),this.timeLine.position>n.endTime+300&&(n.parentNode.removeChild(n),this.items[n.id]=null)))}},Browser.Message.prototype.hide=function(e,t){this.items[e]&&(this.items[e].endTime=this.timeLine.position+(1==t?-300:0)),this.update()},Browser.Message.prototype.show=function(e,t,n){n=n||"msg_"+(new Date).getTime()+"_"+Math.floor(1e3*Math.random());var i,o=this.items;return this.items[n]?i=this.items[n]:((i=document.createElement("div")).id=n,i.style.opacity=.5,i.startTime=this.timeLine.position,this.holder.children.length>0?this.holder.insertBefore(i,this.holder.children[0]):this.holder.appendChild(i),o[n]=i),i.innerHTML=e,i.endTime=t?this.timeLine.position+t:null,n},Browser.Message.show=function(e,t,n){this.instance||(this.instance=new Browser.Message),this.instance.show(e,t,n)},Browser.UI={},Browser.UI.collapse=function(e,t,n,i){var o=0;e.collapse={};var r=new TimeLine(500,33);r.position=n?500:0,r.direction=n?1:-1,r.addEventListener(EVENT.CHANGE,"render",r),r.render=function(){t.style.height=o*this.getTime(0,500)+"px",t.style.display=0==this.position?"none":"",t.style.overflow=this.position==this.duration?"":"hidden"},e.collapse.toggle=function(n){r.direction=1==r.direction?-1:1;var s=t.style.overflow,a=t.style.display;t.style.height="",t.style.display="block",t.style.overflow="visible",o=t.offsetHeight,console.log(o),t.style.display=a,t.style.overflow=s,r.play(),i&&((i.toggleButton||e).className=1==r.direction?i.open:i.close)},e.onclick=e.collapse.toggle},Browser.UI.popupize=function(e,t,n){e.popup={},e.popup.mouseDownFN=function(i){for(var o=i.target;o;){if(o==e||o==t)return!0;o=o.parentNode}t.style.display="none",n&&e.classList.remove(n),removeEventSimple(document,"mousedown",e.popup.mouseDownFN)},e.popup.close=function(){t.style.display="none",n&&e.classList.remove(n),removeEventSimple(document,"mousedown",e.popup.mouseDownFN)},e.popup.toggle=function(i){for(var o=i.target;o;){if(o==t)return!0;o=o.parentNode}t.style.display="none"==t.style.display?"":"none",""==t.style.display?(n&&!e.classList.contains(n)&&n&&e.classList.add(n),addEventSimple(document,"mousedown",e.popup.mouseDownFN)):(n&&e.classList.remove(n),removeEventSimple(document,"mousedown",e.popup.mouseDownFN))},e.onclick=e.popup.toggle},Browser.UI.reorder=function(e,t,n){var i=e.parentNode,o=e.parentNode.children,r=o[o.length-1].getBoundingClientRect().bottom-e.parentNode.getBoundingClientRect().top-e.getBoundingClientRect().height,s=e.cloneNode(!0);s.style.position="absolute",s.style.opacity=.7,s.style.backgroundColor="#fff",s.style.top=e.getBoundingClientRect().top-e.parentNode.getBoundingClientRect().top+"px",e.parentNode.appendChild(s);var a=new DragTouch,l=!1;a.addEventListener(EVENT.MOVE,function(){l=!0,"none"==s.style.display&&(s.style.display=""),e.style.opacity=0;for(var t=s.offsetTop+i.getBoundingClientRect().top,n=s.offsetTop+s.offsetHeight+i.getBoundingClientRect().top,o=i.children,r=0;r<o.length;r++){var a=o[r],d=a.getBoundingClientRect();if(a==s)break;if(t<=d.top+d.height/2&&t>=d.top&&a!=e)return i.insertBefore(e,a),!0;if(n<=d.top+d.height&&n>=d.top+d.height/2&&a!=e)return i.insertBefore(a,e),!0}}),a.addEventListener(EVENT.STOP,function(){e.style.opacity="",e.parentNode.removeChild(s),l&&n(e)}),a.startDrag(t,s,{top:0,bottom:r}),s.style.display="none"},ImageUploader=function(e){this.fileInput=document.createElement("input"),this.fileInput.setAttribute("type","file"),this.fileInput.setAttribute("accept","image/*"),this.fileInput.setAttribute("onchange","this.dragUploader.processFiles(this.files)"),this.fileInput.dragUploader=this,document.body.appendChild(this.fileInput),this.fileInput.style.position="fixed",this.fileInput.style.top="-300px",this.upload=e&&e.upload,ADD_EVENT_DISPATCHER(this)},ImageUploader.prototype.browse=function(e){console.log(e),this.fileInput.setAttribute("multiple","multiple"),this.fileInput.click(e)},ImageUploader.prototype.imageReady=function(e,t){this.data=e,console.log("fileName",t),this.dispatchEvent(EVENT.COMPLETE,{fileName:t}),this.fileInput.setAttribute("onchange",""),this.fileInput.dragUploader=null,document.body.removeChild(this.fileInput),this.fileInput=document.createElement("input"),this.fileInput.setAttribute("type","file"),this.fileInput.setAttribute("onchange","this.dragUploader.processFiles(this.files)"),this.fileInput.dragUploader=this,document.body.appendChild(this.fileInput),this.fileInput.style.position="fixed",this.fileInput.style.top="-300px"},ImageUploader.prototype.onProgress=function(e){this.progress=e.loaded/e.total,this.dispatchEvent(EVENT.PROGRESS)},ImageUploader.prototype.startUpload=function(e){if(this.upload){var t=this,n=new FormData;n.append("file",e);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status)try{var e=JSON.parse(this.responseText);t.dispatchEvent(EVENT.UPLOAD,e)}catch(e){t.dispatchEvent(EVENT.UPLOAD)}},i.upload.addEventListener("progress",function(e){t.onProgress(e)},!1),i.open("POST",this.upload),i.send(n)}},ImageUploader.prototype.processFiles=function(e,t){var n=e[t=t||0];if(n){var i=n.name,o=(i.split(/\./).pop().toLowerCase(),this),r=new FileReader;r.onload=function(r){o.startUpload(n),o.imageReady(r.target.result,i),++t<e.length&&o.processFiles(e,t)},r.readAsDataURL(n)}};
    function TimeLine(t,i){this.duration=t,this.direction=1,this._position=0,this.status="STOP",this.startTime=0,this.interval=i,this.intervalObj,this.data={},this.events={},ADD_EVENT_DISPATCHER(this);var e=this;this.REQ_ANIMATION=function(t){e.update()}}TimeLine.prototype.play=function(){if(1==this.direction&&this._position==this.duration||-1==this.direction&&0==this._position);else{if(this.startTime=(new Date).getTime()-this._position,"PLAY"!=this.status){var t=this,i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame;if(i)i(this.REQ_ANIMATION);else{t=this;this.intervalObj=setInterval(function(){t.update()},this.interval)}}this.status="PLAY"}},TimeLine.prototype.pause=function(){this.status="PAUSE",clearInterval(this.intervalObj)},TimeLine.prototype.stop=function(){this.status="STOP",clearInterval(this.intervalObj)},Object.defineProperty(TimeLine.prototype,"position",{get:function(){return this._position},set:function(t){this._position=t,this.startTime=(new Date).getTime()-this._position},configurable:!0}),TimeLine.prototype.update=function(){if(Date.now||(Date.now=function(){return(new Date).getTime()}),"PLAY"!=this.status)return!1;var t=Date.now();if(1==this.direction)this._position=t-this.startTime,this._position=Math.min(this.duration,this._position),this._position==this.duration?(this.status="STOP",clearInterval(this.intervalObj),this.dispatchEvent(EVENT.COMPLETE),this.onComplete&&this.onComplete()):"PLAY"==this.status&&(i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame)&&i(this.REQ_ANIMATION);else if(this._position=Math.max(2*this._position-(t-this.startTime),0),this.startTime=t-this._position,0==this._position)this.status="STOP",clearInterval(this.intervalObj),this.dispatchEvent(EVENT.COMPLETE),this.onComplete&&this.onComplete();else if("PLAY"==this.status){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame;i&&i(this.REQ_ANIMATION)}this.dispatchEvent(EVENT.CHANGE)},TimeLine.prototype.getTime=function(t,i,e){var n=Math.min(Math.max(this._position-t,0),i);return null!=e?e(n,0,1,i):this.easeInOut(n,0,1,i)},TimeLine.prototype.easeInOut=function(t,i,e,n){return-e/2*(Math.cos(Math.PI*t/n)-1)+i},TimeLine.prototype.easeInOutPos=function(t,i,e,n){return Math.acos(2/e*-(t-i)+1)*n/Math.PI},TimeLine.applyMatrix=function(t,i){if(t=t.constructor==Array?t:[t],!i){for(p=0;p<t.length;p++)(d=t[p]).style.transform="",d.style.MozTransform="",d.style.WebkitTransform="",d.style.msTransform="",d.style.OTransform="";return!1}var e=i.hasOwnProperty("scale")?i.scale:1,n=i.hasOwnProperty("scaleX")?i.scaleX*e:e,o=i.hasOwnProperty("scaleY")?i.scaleY*e:e,s=(i.hasOwnProperty("rotation")?i.rotation:0)*(Math.PI/180),a=i.hasOwnProperty("x")?i.x:0,r=i.hasOwnProperty("y")?i.y:0,l=i.hasOwnProperty("opacity")?i.opacity:1;if(i.hasOwnProperty("radius")&&i.hasOwnProperty("angle")){var h=i.radius,m=i.angle;a=Math.round(h*Math.cos(m*Math.PI/180)*100)/100+a,r=Math.round(h*Math.sin(m*Math.PI/180)*100)/100+r}for(var c="matrix("+[n*Math.cos(s),-o*Math.sin(s),o*Math.sin(s),o*Math.cos(s),a,r].join(",")+")",p=0;p<t.length;p++){var u=!1,d=t[p];d.animation||(d.animation={}),d.animation.x!=a&&(d.animation.x=a,u=!0),d.animation.y!=r&&(d.animation.y=r,u=!0),d.animation.scaleX!=n&&(d.animation.scaleX=n,u=!0),d.animation.scaleY!=o&&(d.animation.scaleY=o,u=!0),d.animation.rotation!=i.rotation&&(d.animation.rotation=i.rotation,u=!0),i.hasOwnProperty("opacity")&&d.animation.opacity!=l&&(d.style.opacity=l,d.animation.opacity=l),u&&(d.style.transform=c,d.style.MozTransform=c,d.style.WebkitTransform=c,d.style.msTransform=c,d.style.OTransform=c)}};var Scroll={};Scroll.end,Scroll.timeLine=new TimeLine(500,33),Scroll.timeLine.addEventListener(EVENT.CHANGE,"refresh",Scroll),Scroll.go=function(t,i,e){Scroll.element=i,Scroll.start=Scroll.element?i.scrollTop:e||document.body.scrollTop||document.documentElement.scrollTop,t.nodeType&&(t=t.getBoundingClientRect().top+Scroll.start),Scroll.end=t,console.log(Scroll.start,Scroll.end),Scroll.timeLine.duration=Math.min(Math.max(200,1.5*Math.abs(Scroll.end-Scroll.start)),1500),Scroll.timeLine.position=0,Scroll.timeLine.play()},Scroll.refresh=function(){var t=Scroll.start+(Scroll.end-Scroll.start)*Scroll.timeLine.getTime(0,Scroll.timeLine.duration);Scroll.element?Scroll.element.scrollTop=t:(document.body.scrollTop=t,document.documentElement.scrollTop=t)};
    function JSON_Loader(){this.request,this.url,this.isReady=!1,ADD_EVENT_DISPATCHER(this)}JSON_Loader.prototype.abort=function(){this.request&&this.request.abort()},JSON_Loader.prototype.send=function(e){this.load(e.url,e.data,e.contentType||null,e.requestMethod||null,e.headers||null)},JSON_Loader.prototype.load=function(e,t,s,r,i){this.url=e,this.data=null,this.isReady=!1;var a=this;if(this.request&&this.request.abort(),window.XMLHttpRequest)this.request=new XMLHttpRequest,this.request.overrideMimeType&&this.request.overrideMimeType("text/xml");else if(window.ActiveXObject)try{this.request=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{this.request=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}if(!this.request)return alert("Giving up :( Cannot create an XMLHTTP instance"),!1;if(this.request.onreadystatechange=function(e){var t=!1,s=e.target;if(4==s.readyState)if(400==s.status)try{r=unescape(escape(this.responseText).replace(/%0A/gim,"").replace(/%0D/gim,""));a.data=JSON.parse(r),a.dispatchEvent(EVENT.ERROR)}catch(e){console.log(e),a.dispatchEvent(EVENT.ERROR)}else if(200==s.status||"file:"===window.location.protocol&&0==s.status){try{var r=unescape(escape(this.responseText).replace(/%0A/gim,"").replace(/%0D/gim,""));a.data=JSON.parse(r)}catch(e){t=!0}t?(console.log("error:"+a.url+","+t),console.log("string:"+r),a.dispatchEvent(EVENT.CANCEL)):(a.isReady=!0,a.dispatchEvent(EVENT.COMPLETE))}},t){if(this.request.open(r||"POST",this.url,!0),s?this.request.setRequestHeader("Content-Type",s):this.request.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i)for(n=0;n<i.length;n++)console.log(i[n].name,i[n].value),this.request.setRequestHeader(i[n].name,i[n].value);this.request.send(t)}else{if(this.request.open(r||"GET",this.url,!0),s&&this.request.setRequestHeader("Content-Type",s),i)for(var n=0;n<i.length;n++)this.request.setRequestHeader(i[n].name,i[n].value);this.request.send(null)}};
    DragTouch=function(){this.startX=0,this.endY=0,ADD_EVENT_DISPATCHER(this);var t=this;this.__moveFN=function(i){t.moveFN(i),i.preventDefault()},this.__endFN=function(i){t.end(i),i.preventDefault()}},DragTouch.ZOOM="zoom",DragTouch.prototype.start=function(t){return this.startX=t.touches?t.touches[0].clientX:t.clientX,this.startY=t.touches?t.touches[0].clientY:t.clientY,this.moveX=0,this.moveY=0,this.endX=this.startX,this.endY=this.startY,this.zoom=null,this.dispatchEvent(EVENT.START),this.HTML_DIV=null,t.preventDefault(),"touchstart"==t.type?(addEventSimple(document,"touchmove",this.__moveFN),addEventSimple(document,"touchend",this.__endFN)):"mousedown"==t.type&&(addEventSimple(document,"mousemove",this.__moveFN),addEventSimple(document,"mouseup",this.__endFN)),!1},DragTouch.prototype.startDrag=function(t,i,e){return this.isActive?!1:(this.isActive=!0,this.hasMove=!1,this.start(t),e=e||{},i?(this.HTML_DIV=i,this.divX_Start=this.HTML_DIV.offsetLeft,this.divY_Start=this.HTML_DIV.offsetTop,this.position={x:this.divX_Start,y:this.divY_Start}):this.position={x:0,y:0},this.leftLimit=e.left!=e.undefined?e.left:null,this.topLimit=e.top!=e.undefined?e.top:null,this.rightLimit=e.right!=e.undefined?e.right:null,this.bottomLimit=e.bottom!=e.undefined?e.bottom:null,this.moveFree=null==this.leftLimit&&null==this.topLimit&&null==this.rightLimit&&null==this.bottomLimit,this.move={x:0,y:0},!0)},DragTouch.prototype.moveFN=function(t){if(t.touches){if(2==t.touches.length){var i;return this.zoom?i=Math.sqrt(Math.pow(t.touches[0].clientX-t.touches[1].clientX,2)+Math.pow(t.touches[0].clientY-t.touches[1].clientY,2)):(this.zoom=Math.sqrt(Math.pow(t.touches[0].clientX-t.touches[1].clientX,2)+Math.pow(t.touches[0].clientY-t.touches[1].clientY,2)),i=Math.sqrt(Math.pow(t.touches[0].clientX-t.touches[1].clientX,2)+Math.pow(t.touches[0].clientY-t.touches[1].clientY,2))),this.dispatchEvent(DragTouch.ZOOM,{zoom:i-this.zoom}),!1}t.touches.length>=2&&this.end(t)}if(!this.hasMove){var e=t.touches?t.touches[0].clientX:t.clientX,s=t.touches?t.touches[0].clientY:t.clientY;t.touches?(e-this.startX)*(e-this.startX)+(s-this.startY)*(s-this.startY)>100&&(this.startX=e,this.startY=s,this.moveX=0,this.moveY=0,this.endX=this.startX,this.endY=this.startY,this.hasMove=!0):(e!=this.startX||s!=this.startY)&&(this.hasMove=!0)}if(!this.hasMove)return!1;if(this.endX=t.touches?t.touches[0].clientX:t.clientX,this.endY=t.touches?t.touches[0].clientY:t.clientY,this.moveX=this.endX-this.startX,this.moveY=this.endY-this.startY,this.HTML_DIV){var h=this.divX_Start+this.moveX,o=this.divY_Start+this.moveY;1!=this.moveFree?(null!=this.rightLimit&&null!=this.leftLimit&&(h=Math.min(h,this.rightLimit),h=Math.max(h,this.leftLimit),this.HTML_DIV.style.left=h+"px"),null!=this.bottomLimit&&null!=this.topLimit&&(o=Math.min(o,this.bottomLimit),o=Math.max(o,this.topLimit),this.HTML_DIV.style.top=o+"px")):(this.HTML_DIV.style.left=h+"px",this.HTML_DIV.style.top=o+"px"),this.position={x:h,y:o},this.move={x:h-this.divX_Start,y:o-this.divY_Start}}else this.move={x:this.moveX,y:this.moveY},null!=this.rightLimit&&null!=this.leftLimit&&(this.move.x=Math.min(this.move.x,this.rightLimit),this.move.x=Math.max(this.move.x,this.leftLimit)),null!=this.bottomLimit&&null!=this.topLimit&&(this.move.y=Math.min(this.move.y,this.bottomLimit),this.move.y=Math.max(this.move.y,this.topLimit)),this.position=this.move;this.dispatchEvent(EVENT.MOVE,{clientX:this.endX,clientY:this.endY,move:this.move,position:this.position})},DragTouch.prototype.end=function(t){this.isActive=!1,"touchend"==t.type?(removeEventSimple(document,"touchmove",this.__moveFN),removeEventSimple(document,"touchend",this.__endFN)):"mouseup"==t.type&&(removeEventSimple(document,"mousemove",this.__moveFN),removeEventSimple(document,"mouseup",this.__endFN));var i=t.touches?t.touches.length>0?t.touches[0].clientX:this.endX:t.clientX,e=t.touches?t.touches.length>0?t.touches[0].clientY:this.endY:t.clientY;t={clientX:i,clientY:e,move:this.move,position:this.positionY},this.dispatchEvent(EVENT.STOP,t),document.getElementsByTagName("body")[0].style.userSelect="",document.getElementsByTagName("body")[0].style.webkitUserSelect="",document.getElementsByTagName("body")[0].style.MozUserSelect="",document.getElementsByTagName("body")[0].setAttribute("unselectable","off")};
    var Require=function(e,i,t,r){Require.addItem(e,i,t,r)};Require.length=0,Require.dictionary={},Require.queue=[],Require.loading=[],Require.loaded=0,Require.SIZE=3,Require.onReady=function(){},Require.images={},Require.start=function(){Require.loader||(Require.loader=document.createElement("div"),Require.loader.className="app-loader",Require.loader.barHolder=document.createElement("div"),Require.loader.barHolder.className="bar-holder",Require.loader.appendChild(Require.loader.barHolder),Require.loader.bar=document.createElement("div"),Require.loader.bar.className="bar",Require.loader.barHolder.appendChild(Require.loader.bar)),Require.next()},Require.updateLoader=function(){var e=Require.loaded/Require.length;Require.loader.bar.style.width=100*e+"%"},Require.next=function(){for(var e=0;e<this.queue.length;e++){for(var i=this.queue[e].items,t=i.length-1;t>=0;t--)if(!this.isLoading(i[t])&&!this.hasBranches(i[t]))return this.load(i[t]),this.loading.length<Require.SIZE&&this.next(),!0;if(0==i.length&&!this.isLoading(this.queue[e].url))return this.load(this.queue[e].url),this.loading.length<Require.SIZE&&this.next(),!0}return!1},Require.hasBranches=function(e){for(var i=0;i<this.queue.length;i++)if(this.queue[i].url==e)return!0;return!1},Require.isLoading=function(e){for(var i=0;i<this.loading.length;i++)if(this.loading[i]==e)return!0;return!1},Require.load=function(e){e.split(".png").length>1||e.split(".jpg").length>1||e.split(".jpeg").length>1||e.split(".gif").length>1||e.split(".svg").length>1?this.loadImage(e):e.split(".js").length>1?this.loadJs(e):e.split(".css").length>1&&this.loadCss(e)},Require.loadImage=function(e){console.log("image",e);var i=e;i.split("?").length>1?i+="&time="+(new Date).getTime():i+="?time="+(new Date).getTime();var t=new Image;t.src=i,t.onload=function(){console.log("load",e),Require.onload(this,e)},t.onerror=function(){Require.onload(this,e)},Require.images[e]=t,Require.loading.push(e)},Require.getImage=function(e){return Require.images[e]},Require.loadJs=function(e){var i=e;i.split("?").length>1?i+="&time="+(new Date).getTime():i+="?time="+(new Date).getTime();var t=document.createElement("script");t.setAttribute("src",i),t.setAttribute("type","text/javascript"),t.onload=function(){Require.onload(this,e)},t.onerror=function(){Require.onload(this,e)},document.head.appendChild(t),Require.loading.push(e)},Require.loadCss=function(e){var i=e;i.split("?").length>1?i+="&time="+(new Date).getTime():i+="?time="+(new Date).getTime();var t=document.createElement("link");t.setAttribute("href",i),t.setAttribute("rel","stylesheet"),t.onload=function(){Require.onload(this,e)},t.onerror=function(){Require.onload(this,e)},document.head.appendChild(t),Require.loading.push(e)},Require.onload=function(e,i){this.dictionary[i].load=!0;for(var t=this.loading.length-1;t>=0;t--)this.loading[t]==i&&this.loading.splice(t,1);for(var r=this.queue.length-1;r>=0;r--)if(this.queue[r].url==i)this.queue[r].fn&&this.queue[r].fn.constructor==Function&&(this.queue[r].loaded++,this.queue[r].progress&&this.queue[r].progress(this.queue[r].loaded/this.queue[r].length),this.queue[r].fn()),this.queue.splice(r,1);else{var u=this.queue[r].items;console.log(JSON.stringify(this.queue));for(var n=u.length-1;n>=0;n--)console.log(u[n],i),u[n]==i&&(this.queue[r].loaded++,this.queue[r].progress&&this.queue[r].progress(this.queue[r].loaded/this.queue[r].length),u.splice(n,1))}Require.next(),Require.loaded++,Require.updateLoader()},Require.addItem=function(e,i,t,r){i=i||[],this.dictionary[e]||Require.length++,this.dictionary[e]={load:!1,items:i,length:i.length+1};for(var u=0;u<i.length;u++)this.dictionary[i[u]]||(Require.length++,this.dictionary[i[u]]={load:!1,items:[]});Require.queue.push({url:e,items:i,fn:t,progress:r,loaded:0,length:i.length+1})};
    function Track(t){var a=this;this.settings=t,this.audio=document.createElement("audio"),this.gain=t.gain||1,this.time=0,this.duration=0,this.progress=0,this.audio.ontimeupdate=function(){isNaN(this.duration)||(a.duration=this.duration),a.time=this.currentTime,a.dispatchEvent(EVENT.CHANGE)},this.audio.oncanplaythrough=function(){a.progress=1,a.dispatchEvent("loadProgress")},this.audio.onprogress=function(t){isNaN(this.duration)||(a.duration=this.duration),this.buffered.length>0&&(a.progress=this.buffered.end(this.buffered.length-1)/this.duration),a.dispatchEvent("loadProgress")},this.loop=t.loop>0&&t.loop,this.m4a=!(!this.audio.canPlayType||!this.audio.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/,"")),this.mp3=!(!this.audio.canPlayType||!this.audio.canPlayType("audio/mpeg;").replace(/no/,"")),this.ogg=!(!this.audio.canPlayType||!this.audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/,"")),this.mp3&&t.mp3?this.audio.src=t.mp3:this.ogg&&t.ogg?this.audio.src=t.ogg:this.m4a&&t.m4a&&(this.audio.src=t.m4a),this.audio.src&&this.audio.load(),this.disable=!1,this.volume=(t.volume||.5)*this.gain,this.audio.volume=this.volume,this.status=Track.STOP,this.isReady=!1,addEvent(this.audio,"canplaythrough",function(t){a.ready(t)}),addEvent(this.audio,"ended",function(t){a.onEnd(t)}),ADD_EVENT_DISPATCHER(this)}Track.prototype.load=function(t){this.mp3&&t.mp3?this.audio.src=t.mp3:this.ogg&&t.ogg?this.audio.src=t.ogg:this.m4a&&t.m4a&&(this.audio.src=t.m4a),this.audio.load()},Track.prototype.cancel=function(){this.audio.src="",this.audio.load()},Track.prototype.getTimeString=function(){var t=Math.floor(this.time),a=t%60,i=Math.floor(t/60);return a=(a<10?"0":"")+a,(i=(i<10?"0":"")+i)+":"+a},Track.prototype.getTime=function(){return this.time},Track.PLAY="PLAY",Track.PAUSE="PAUSE",Track.STOP="STOP",Track.prototype.ready=function(t){this.isReady=!0,this.dispatchEvent("ready")},Track.prototype.onEnd=function(t){if(console.log(t),this.loop&&this.status==Track.PLAY){var a=this;this.timeout=setTimeout(function(){a.play()},this.loop)}else this.status=Track.STOP;this.dispatchEvent(EVENT.COMPLETE)},Track.prototype.getVolume=function(){return this.volume},Track.prototype.setVolume=function(t){this.volume=t,this.audio.volume=this.volume*this.gain},Track.prototype.play=function(){console.log("Track.Play()"),this.audio.play(),this.status=Track.PLAY,this.dispatchEvent(EVENT.STATE_CHANGE)},Track.prototype.pause=function(){this.audio.pause(),this.status=Track.PAUSE,this.dispatchEvent(EVENT.STATE_CHANGE)},Track.prototype.stop=function(){this.audio.pause(),this.isReady&&(this.audio.currentTime=0),clearTimeout(this.timeout),this.status=Track.STOP,this.dispatchEvent(EVENT.STATE_CHANGE)},Track.Buttons=[],Track.play=function(t,a,i){if(i.icon=i.getElementsByClassName("fa")[0],i.track||(i.track=new Track({mp3:t,autoPlay:!1,volume:a}),i.track.addEventListener(EVENT.COMPLETE,"onSoundComplete",i),i.track.addEventListener(EVENT.STATE_CHANGE,"onStatusChange",i),i.onSoundComplete=function(){for(var t=0;t<Track.Buttons.length;t++)Track.Buttons[t]==i&&Track.Buttons.splice(t,1);i.icon.className="PLAY"==i.track.status?"fa fa-pause":"fa fa-play"},i.onStatusChange=function(){i.icon.className="PLAY"==i.track.status?"fa fa-pause":"fa fa-play"}),"PLAY"==i.track.status)i.track.pause();else{for(i.track.play();Track.Buttons.length>0;)Track.Buttons.pop().track.stop();Track.Buttons.push(i)}};
    function easeOutElastic (t, b, c, d) {
        var s=0.70158;var p=0;var a=c;
        if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; s=p/4; }
        else s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    }
    function easeOutBack (t, b, c, d, s) {
        var s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    };

    var SID = (Browser.urlParams((document.currentScript && document.currentScript.src) || '')).SID || 110880;
    var debug = (Browser.urlParams((document.currentScript && document.currentScript.src) || '')).debug || false;

    var SVG = {};
    SVG.close = '<svg var="close-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -4 20 20" version="1.1"><defs><path d="M9.16666667,9.16666667 L9.16666667,3.3278314 C9.16666667,2.87063274 9.53655402,2.5 10,2.5 C10.4602373,2.5 10.8333333,2.87078857 10.8333333,3.3278314 L10.8333333,9.16666667 L16.6721686,9.16666667 C17.1293673,9.16666667 17.5,9.53655402 17.5,10 C17.5,10.4602373 17.1292114,10.8333333 16.6721686,10.8333333 L10.8333333,10.8333333 L10.8333333,16.6721686 C10.8333333,17.1293673 10.463446,17.5 10,17.5 C9.53976271,17.5 9.16666667,17.1292114 9.16666667,16.6721686 L9.16666667,10.8333333 L3.3278314,10.8333333 C2.87063274,10.8333333 2.5,10.463446 2.5,10 C2.5,9.53976271 2.87078857,9.16666667 3.3278314,9.16666667 L9.16666667,9.16666667 Z" id="path-1"/></defs><g id="Mobile" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Overlay" transform="translate(-314.000000, -326.000000)"><g id="Shape-/-Icon" transform="translate(300.000000, 310.000000)"><g id="Icon-/-Close" transform="translate(14.000000, 14.000000)"><mask id="mask-2" fill="white"><use xlink:href="#path-1"/></mask><use id="Close" fill-rule="evenodd" transform="translate(10.000000, 10.000000) rotate(45.000000) translate(-10.000000, -10.000000) " xlink:href="#path-1"/></g></g></g></g></svg>';
    SVG.plus = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1"><path d="M11,11 L11,6.00684547 C11,5.45078007 11.4438648,5 12,5 C12.5522847,5 13,5.44994876 13,6.00684547 L13,11 L17.9931545,11 C18.5492199,11 19,11.4438648 19,12 C19,12.5522847 18.5500512,13 17.9931545,13 L13,13 L13,17.9931545 C13,18.5492199 12.5561352,19 12,19 C11.4477153,19 11,18.5500512 11,17.9931545 L11,13 L6.00684547,13 C5.45078007,13 5,12.5561352 5,12 C5,11.4477153 5.44994876,11 6.00684547,11 L11,11 Z" id="path-1"/></svg>'
    SVG.girls = '<svg var="icon" width="24px" height="24px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M7.36019498,5.04841579 C7.32759155,3.31618827 7.01594469,3.05001387 5.28741855,2.58101985 C4.94899727,2.48919738 4.74908946,2.14041591 4.84091193,1.80199464 C4.9327344,1.46357337 5.28151587,1.26366555 5.61993714,1.35548802 C6.81289631,1.67916882 7.55031378,2.0250992 7.99668019,2.58596614 C8.44304661,2.0250992 9.18046407,1.67916882 10.3734232,1.35548802 C10.7118445,1.26366555 11.060626,1.46357337 11.1524485,1.80199464 C11.2442709,2.14041591 11.0443631,2.48919738 10.7059419,2.58101985 C8.97526826,3.05059653 8.6649967,3.31684932 8.63304521,5.05487874 C8.90096705,4.79813396 9.22234655,4.56047003 9.60683175,4.35149271 C11.4634508,3.34237647 13.7476445,4.30450757 13.7476445,4.30450757 C14.0816254,4.41074557 14.3492064,4.79089183 14.3492064,5.13993494 L14.3492064,7.68253968 C14.3492064,8.68246978 13.8645873,9.60900325 13.1956603,10.1324718 C13.1481492,10.1696513 12.6402032,10.6052132 12.0318476,10.7399358 C12.4379651,11.2253111 12.4167365,11.9506809 12.4379651,11.9443972 C12.4422603,12.0047019 12.4444445,12.0655886 12.4444445,12.1269841 C12.4444445,13.526758 11.3073905,14.6666667 9.90476191,14.6666667 C9.14724128,14.6666667 8.46582857,14.3336589 8,13.8057668 C7.53417143,14.3336589 6.85275872,14.6666667 6.09523809,14.6666667 C4.69260951,14.6666667 3.55555553,13.526758 3.55555553,12.1269841 C3.55555553,12.0655886 3.55773966,12.0047019 3.5620349,11.9443972 C3.58326347,11.9506809 3.5620349,11.2253111 3.96815236,10.7399358 C3.3597968,10.6052132 2.85185077,10.1696513 2.80433966,10.1324718 C2.13541267,9.60900325 1.65079362,8.68246978 1.65079362,7.68253968 L1.65079362,5.13993494 C1.65079362,4.79089183 1.91837457,4.41074557 2.25235553,4.30450757 C2.25235553,4.30450757 4.53654919,3.34237647 6.39316825,4.35149271 C6.77442526,4.55871544 7.0936318,4.79414507 7.36019498,5.04841579 Z M5.0308668,11.4350153 C4.89717263,11.6394217 4.82539681,11.8764153 4.82539681,12.1269841 C4.82539681,12.8266502 5.39512973,13.3968254 6.09523809,13.3968254 C6.79490418,13.3968254 7.36507936,12.8270925 7.36507936,12.1269841 L7.36507936,10.2222222 L7.36507936,8.30397448 C7.36507936,7.03895346 6.91885079,6.08250219 5.78676197,5.46718516 C5.60625344,5.36907451 5.41005306,5.29536145 5.19816185,5.24465665 C4.59254022,5.09973359 3.8943926,5.14838289 3.21515794,5.32601889 C2.98117277,5.38721158 2.9206349,5.41129556 2.9206349,5.41129556 L2.9206349,7.68253968 C2.9206349,8.5422668 3.4954509,9.28902172 4.31036971,9.51707677 L5.36761552,9.81294693 C5.7056897,9.90755696 5.82306372,10.2238173 5.63181085,10.5162259 L5.0308668,11.4350153 Z M10.9691332,11.4350153 L10.3681892,10.5162259 C10.1769363,10.2238173 10.2943103,9.90755696 10.6323845,9.81294693 L11.6896303,9.51707677 C12.5045491,9.28902172 13.0793651,8.5422668 13.0793651,7.68253968 L13.0793651,5.41129556 C13.0793651,5.41129556 13.0188272,5.38721158 12.7848421,5.32601889 C12.1056074,5.14838289 11.4074598,5.09973359 10.8018382,5.24465665 C10.5899469,5.29536145 10.3937466,5.36907451 10.213238,5.46718516 C9.08114921,6.08250219 8.63492064,7.03895346 8.63492064,8.30397448 L8.63492064,10.2222222 L8.63492064,12.1269841 C8.63492064,12.8270925 9.20509582,13.3968254 9.90476191,13.3968254 C10.6048703,13.3968254 11.1746032,12.8266502 11.1746032,12.1269841 C11.1746032,11.8764153 11.1028274,11.6394217 10.9691332,11.4350153 Z M5.14285713,8.31746032 C4.61687165,8.31746032 4.19047617,7.89106482 4.19047617,7.36507936 C4.19047617,6.83909389 4.61687165,6.4126984 5.14285713,6.4126984 C5.6688426,6.4126984 6.09523809,6.83909389 6.09523809,7.36507936 C6.09523809,7.89106482 5.6688426,8.31746032 5.14285713,8.31746032 Z M10.8571429,8.31746032 C10.3311574,8.31746032 9.90476191,7.89106482 9.90476191,7.36507936 C9.90476191,6.83909389 10.3311574,6.4126984 10.8571429,6.4126984 C11.3831283,6.4126984 11.8095238,6.83909389 11.8095238,7.36507936 C11.8095238,7.89106482 11.3831283,8.31746032 10.8571429,8.31746032 Z" id="path-3"></path></svg>';
    SVG.puzzles = '<svg var="icon" width="24px" height="24px" viewBox="0 -2 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M9.8639012,1.09677419 C9.6013106,2.19793878 8.56557115,3.01612903 7.33333333,3.01612903 C6.10102551,3.01612903 5.06513151,2.19780701 4.80267641,1.09677419 L3.15897436,1.09677419 L3.15897436,3.74731183 C3.15897436,4.05017766 2.90641704,4.29569892 2.59487179,4.29569892 C1.78135321,4.29569892 1.12820513,4.91301324 1.12820513,5.66666667 C1.12820513,6.42032009 1.78135321,7.03763441 2.59487179,7.03763441 C2.90641704,7.03763441 3.15897436,7.28315567 3.15897436,7.58602151 L3.15897436,10.2365591 L4.80267641,10.2365591 C5.06513151,9.13552632 6.10102551,8.3172043 7.33333333,8.3172043 C8.56564115,8.3172043 9.60153516,9.13552632 9.86399026,10.2365591 L11.5076923,10.2365591 L11.5076923,7.58602151 C11.5076923,7.28315567 11.7602496,7.03763441 12.0717949,7.03763441 C12.8853135,7.03763441 13.5384615,6.42032009 13.5384615,5.66666667 C13.5384615,4.91301324 12.8853135,4.29569892 12.0717949,4.29569892 C11.7602496,4.29569892 11.5076923,4.05017766 11.5076923,3.74731183 L11.5076923,1.09677419 L9.8639012,1.09677419 Z M2.03076923,3.25745781 L2.03076923,0.548387097 C2.03076923,0.245521266 2.28332655,0 2.59487179,0 L5.3025641,0 C5.61410935,0 5.86666667,0.245521266 5.86666667,0.548387097 C5.86666667,1.30204052 6.51981474,1.91935484 7.33333333,1.91935484 C8.14675825,1.91935484 8.79976986,1.30221136 8.79999986,0.548224476 C8.80009223,0.245422164 9.05262248,0 9.3641024,0 L12.0717949,0 C12.3833401,0 12.6358974,0.245521266 12.6358974,0.548387097 L12.6358974,3.25745781 C13.7956784,3.50212251 14.6666667,4.48532897 14.6666667,5.66666667 C14.6666667,6.84800437 13.7956784,7.83121083 12.6358974,8.07587552 L12.6358974,10.7849462 C12.6358974,11.0878121 12.3833401,11.3333333 12.0717949,11.3333333 L9.36410256,11.3333333 C9.05255732,11.3333333 8.8,11.0878121 8.8,10.7849462 C8.8,10.0312928 8.14685192,9.41397849 7.33333333,9.41397849 C6.51981474,9.41397849 5.86666667,10.0312928 5.86666667,10.7849462 C5.86666667,11.0878121 5.61410935,11.3333333 5.3025641,11.3333333 L2.59487179,11.3333333 C2.28332655,11.3333333 2.03076923,11.0878121 2.03076923,10.7849462 L2.03076923,8.07587552 C0.870988236,7.83121083 0,6.84800437 0,5.66666667 C0,4.48532897 0.870988236,3.50212251 2.03076923,3.25745781 Z" id="path-7"></path></svg>';
    SVG.casino = '<svg var="icon" width="24px" height="24px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M3.33333333,3.33333333 L3.33333333,12.6666667 L12.6666667,12.6666667 L12.6666667,3.33333333 L3.33333333,3.33333333 Z M3.33333333,2 L12.6666667,2 C13.4030463,2 14,2.59695367 14,3.33333333 L14,12.6666667 C14,13.4030463 13.4030463,14 12.6666667,14 L3.33333333,14 C2.59695367,14 2,13.4030463 2,12.6666667 L2,3.33333333 C2,2.59695367 2.59695367,2 3.33333333,2 Z M5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 C5.55228475,4 6,4.44771525 6,5 C6,5.55228475 5.55228475,6 5,6 Z M5,12 C4.44771525,12 4,11.5522847 4,11 C4,10.4477153 4.44771525,10 5,10 C5.55228475,10 6,10.4477153 6,11 C6,11.5522847 5.55228475,12 5,12 Z M11,6 C10.4477153,6 10,5.55228475 10,5 C10,4.44771525 10.4477153,4 11,4 C11.5522847,4 12,4.44771525 12,5 C12,5.55228475 11.5522847,6 11,6 Z M11,12 C10.4477153,12 10,11.5522847 10,11 C10,10.4477153 10.4477153,10 11,10 C11.5522847,10 12,10.4477153 12,11 C12,11.5522847 11.5522847,12 11,12 Z M8,9 C7.44771525,9 7,8.55228475 7,8 C7,7.44771525 7.44771525,7 8,7 C8.55228475,7 9,7.44771525 9,8 C9,8.55228475 8.55228475,9 8,9 Z" id="path-11"></path></svg>';
    SVG.classics = '<svg var="icon" width="24px" height="24px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M10.1428999,10.6715812 C11.180626,10.7441677 12,11.6116973 12,12.6666667 L12,13.9971566 C12,14.3669168 11.7009913,14.6666667 11.3316845,14.6666667 L4.66831553,14.6666667 C4.29921505,14.6666667 4,14.3660165 4,13.9971566 L4,12.6666667 C4,11.5892644 4.85095942,10.7108399 5.91705486,10.6682815 C5.85034232,10.1628403 5.74740198,9.72170615 5.62311052,9.32504329 C3.71425182,9.31832949 2.47541309,8.18338095 1.82395971,6.39004596 C1.6077237,5.7947868 1.47059854,5.16504016 1.39480383,4.53607799 C1.3489352,4.15544941 1.33353275,3.85308109 1.33377591,3.66575928 C1.3337768,3.66517522 1.33461612,3.69990533 1.33461612,3.69990533 C1.30605984,3.13174091 1.75796058,2.66666667 2.32183756,2.66666667 L4,2.66666667 L4,2 C4,1.63181017 4.29900874,1.33333333 4.66831553,1.33333333 L11.3316845,1.33333333 C11.7007849,1.33333333 12,1.63108897 12,2 L12,2.66666667 L13.6849875,2.66666667 C14.2488645,2.66666667 14.7007652,3.13174091 14.6722089,3.69990533 C14.6722089,3.69990533 14.6730483,3.66517522 14.6730492,3.66575928 C14.6732923,3.85308109 14.6578899,4.15544941 14.6120212,4.53607799 C14.5362265,5.16504016 14.3991014,5.7947868 14.1828654,6.39004596 C13.5364771,8.16943767 12.3118018,9.30064111 10.4281175,9.3246823 C10.3074295,9.72230141 10.2075185,10.1646066 10.1428999,10.6715812 Z M10.1428999,10.6715812 C10.0963213,10.6683232 10.0493028,10.6666667 10.0018986,10.6666667 L7.25858695,10.6666667 C7.25858561,10.6666667 6.97481046,8.80153028 6.19256959,7.23704854 C6.16511843,7.18214623 5.90009841,6.66051953 5.83054414,6.51831967 C5.4710467,5.78334714 5.33333333,5.30782405 5.33333333,4.66666667 L5.33333333,2.66666667 L10.6683155,2.66666667 C10.6683155,2.66666667 10.6666667,2 10.6666667,4.66666667 C10.6666667,5.3147247 10.5320041,5.79483409 10.1821529,6.53334405 C10.1147199,6.67569017 9.85799676,7.19741793 9.83146158,7.25221405 C9.26542741,8.42109529 8.92929248,9.42674816 8.79614257,10.6630978 C9.05171687,10.6630977 7.27503867,10.6666339 7.25869899,10.6666664 Z M5.04961004,7.93316109 C4.53363275,6.88792839 4,6.04411391 4,4.66666667 L4,4.00098729 L2.68251204,4.00504119 C2.68251204,4.00504119 2.7027843,4.24564526 2.71855996,4.37655534 C2.78302892,4.91153378 2.89911264,5.44464769 3.07716756,5.93480113 C3.4785128,7.03963299 4.10743894,7.73497297 5.04961004,7.93316109 Z M12,4.00096629 L12,4.66666667 C12,6.04132879 11.4852614,6.88451393 10.986478,7.92682336 C11.9124292,7.72048118 12.5324818,7.02815503 12.9296575,5.93480113 C13.1077124,5.44464769 13.2237961,4.91153378 13.2882651,4.37655534 C13.3040408,4.24564526 13.324313,4.00504119 13.324313,4.00504119 L12,4.00096629 Z M8,6.33333333 C7.26362033,6.33333333 6.66666667,5.73637967 6.66666667,5 C6.66666667,4.26362033 7.26362033,3.66666667 8,3.66666667 C8.73637967,3.66666667 9.33333333,4.26362033 9.33333333,5 C9.33333333,5.73637967 8.73637967,6.33333333 8,6.33333333 Z M5.34138997,13.3333333 L10.6666667,13.3395589 L10.6666667,12.6666667 C10.6666667,12.2994336 10.3677494,12 10.0018986,12 L5.99810135,12 C5.63115263,12 5.33333333,12.2981193 5.33333333,12.6666667 L5.34138997,13.3333333 Z" id="path-15"></path></svg>';
    SVG.strategy = '<svg var="icon" width="24px" height="24px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M5.36923502,12.9130082 C5.46854465,13.1636139 5.71209409,13.3333334 5.98766819,13.3333334 L7.31747813,13.3525391 L7.31747813,2.675981 L6.53991621,2.675981 C6.3126163,2.71429847 6.11984566,2.87261463 6.03471394,3.08557625 L6.37839131,3.49515499 C6.61481222,3.77691047 6.58038813,4.19502299 6.29712247,4.43271109 C6.01581802,4.66875356 5.59808465,4.63403878 5.35969777,4.34994036 L5.07932276,4.01580243 L5.00479444,4.03020667 C4.33458908,4.15973852 3.81753499,4.69010216 3.69055164,5.35038108 C3.78979923,5.3391188 3.89070239,5.33333332 3.99295324,5.33333332 C4.48453192,5.33333332 4.95802974,5.46788161 5.37010085,5.71831584 C5.684133,5.90916736 5.78439946,6.31913093 5.59405227,6.63399511 C5.40370509,6.94885926 4.99482485,7.0493914 4.6807927,6.85853993 C4.47513498,6.73355239 4.23975289,6.66666666 3.99295324,6.66666666 C3.25851947,6.66666666 2.66314327,7.26362033 2.66314327,8 C2.66314327,8.73637967 3.25851947,9.33333334 3.99295324,9.33333334 C4.23905851,9.33333334 4.47380968,9.26682527 4.67906943,9.14250561 C4.9933896,8.95213134 5.40211745,9.05328447 5.59198866,9.36843741 C5.78185987,9.68359041 5.68097406,10.0934012 5.36665389,10.2837755 C4.95536789,10.532879 4.48314226,10.6666667 3.99295324,10.6666667 C3.79257181,10.6666667 3.59736614,10.6444479 3.40965321,10.6023334 C3.35606009,10.7259733 3.32804826,10.859861 3.32804826,11 C3.32804826,11.516411 3.72093791,11.9471332 4.2284215,11.995426 L4.3903078,12.0108312 L4.6930311,11.6500596 C4.93141798,11.3659612 5.34915135,11.3312464 5.6304558,11.5672889 C5.91372146,11.804977 5.94814555,12.2230896 5.71172464,12.504845 L5.36923358,12.91301 L5.36923502,12.9130082 Z M11.584247,12.0098998 L11.7363448,11.995426 C12.2438284,11.9471332 12.636718,11.516411 12.636718,11 C12.636718,10.8625085 12.6097546,10.7310343 12.5581231,10.6093517 C12.3803275,10.6469125 12.195988,10.6666667 12.0070468,10.6666667 C11.5168578,10.6666667 11.0446321,10.532879 10.6333461,10.2837755 C10.3190259,10.0934012 10.2181401,9.68359041 10.4080113,9.36843741 C10.5978825,9.05328447 11.0066104,8.95213134 11.3209305,9.14250561 C11.5261904,9.26682527 11.7609415,9.33333334 12.0070468,9.33333334 C12.256407,9.33333334 12.4897369,9.26451727 12.6891759,9.14479294 L12.8551348,8.99672274 C13.1381748,8.7441914 13.301623,8.38686227 13.301623,8 C13.301623,7.58681433 13.1146728,7.20718893 12.7974292,6.95462893 L12.6314365,6.82248093 C12.4452618,6.72302933 12.232719,6.66666666 12.0070468,6.66666666 C11.7602471,6.66666666 11.524865,6.73355239 11.3192073,6.85853993 C11.0051751,7.0493914 10.5962949,6.94885926 10.4059477,6.63399511 C10.2156005,6.31913093 10.315867,5.90916736 10.6298991,5.71831584 C11.0419703,5.46788161 11.5154681,5.33333332 12.0070468,5.33333332 C12.0969674,5.33333332 12.1858458,5.33780761 12.2734725,5.34654625 C12.145228,4.68804935 11.6288792,4.15948766 10.9599719,4.03020667 L10.8945387,4.01756027 L10.6156386,4.34994036 C10.3772517,4.63403878 9.95951841,4.66875356 9.67821394,4.43271109 C9.39494827,4.19502299 9.36052421,3.77691047 9.59694507,3.49515499 L9.93341581,3.09416481 C9.85007961,2.87687817 9.65519521,2.71481181 9.42485007,2.675981 L8.64728814,2.675981 L8.64728814,13.3525391 L9.97709808,13.3333334 C10.2558173,13.3333334 10.5017768,13.1597178 10.598875,12.9043962 L10.2636117,12.504845 C10.0271909,12.2230896 10.0616149,11.804977 10.3448806,11.5672889 C10.6261851,11.3312464 11.0439184,11.3659612 11.2823053,11.6500596 L11.584247,12.0098998 Z M13.7494906,10.0147235 C13.8887535,10.3140495 13.966528,10.6479181 13.966528,11 C13.966528,12.2133712 13.0428147,13.210426 11.8619919,13.3227944 C11.5911497,14.1050895 10.8495323,14.6666667 9.97709808,14.6666667 L7.98301433,14.6666667 L5.98766819,14.6666667 C5.11523401,14.6666667 4.37361659,14.1050895 4.10277438,13.3227944 C2.92195157,13.210426 1.99823828,12.2133712 1.99823828,11 C1.99823828,10.6392945 2.07986935,10.2977054 2.2256191,9.99279161 C1.67817171,9.50435327 1.3333333,8.792554 1.3333333,8 C1.3333333,7.15338646 1.72681844,6.39891977 2.34042487,5.91042314 C2.33397706,5.83002395 2.33069078,5.7487301 2.33069078,5.66666666 C2.33069078,4.20512736 3.37307148,2.98769419 4.7530923,2.72097495 C4.97809591,2.01877734 5.57967627,1.48580767 6.31942828,1.36110271 L6.32012068,1.3333333 L7.98041533,1.3333333 C7.98172807,1.3333333 7.98303993,1.33333707 7.98435087,1.33334461 L9.64464561,1.3333333 L9.64533801,1.36110271 C10.38509,1.48580767 10.9866704,2.01877734 11.211674,2.72097495 C12.5916948,2.98769419 13.6340755,4.20512736 13.6340755,5.66666666 C13.6340755,5.73987764 13.63146,5.81247612 13.6263176,5.88437329 C14.2589273,6.37186159 14.6666667,7.13818833 14.6666667,8 C14.6666667,8.80449907 14.3113554,9.52579087 13.7494906,10.0147235 Z" id="path-19"></path></svg>';
    SVG.sports = '<svg var="icon" width="24px" height="24px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M7.29727864,7.75309548 L7.77209158,7.27828255 L7.29930377,6.80549473 C7.03595338,6.54214434 7.03321846,6.11790391 7.29727864,5.85384373 C7.55951059,5.59161179 7.98622043,5.59315964 8.24892964,5.85586886 L8.72171745,6.32865667 L8.96053405,6.08984007 C9.2219872,5.82838692 9.64468962,5.82719002 9.9087498,6.0912502 C10.1709817,6.35348215 10.1711994,6.77842649 9.91015993,7.03946595 L9.67134333,7.27828255 L10.1441311,7.75107036 C10.4074815,8.01442075 10.4102164,8.43866118 10.1461563,8.70272136 C9.88392432,8.9649533 9.45721448,8.96340545 9.19450527,8.70069623 L8.72171745,8.22790842 L8.24690452,8.70272136 L8.71969233,9.17550917 C8.98304272,9.43885956 8.98577763,9.8631 8.72171745,10.1271602 C8.45948551,10.3893921 8.03277567,10.3878443 7.77006645,10.125135 L7.29727864,9.65234724 L7.05846204,9.89116383 C6.79700889,10.152617 6.37430647,10.1538139 6.1102463,9.8897537 C5.84801435,9.62752176 5.84779671,9.20257741 6.10883617,8.94153796 L6.34765276,8.70272136 L5.87486495,8.22993355 C5.61151456,7.96658316 5.60877965,7.54234272 5.87283983,7.27828255 C6.13507177,7.0160506 6.56178161,7.01759846 6.82449083,7.28030767 L7.29727864,7.75309548 L7.29727864,7.75309548 Z M9.2048813,2.88421488 C7.81335589,3.23407791 6.30861097,3.99363378 5.16062042,5.14162433 C4.00203991,6.30020483 3.23524401,7.79946841 2.88406283,9.18534861 C3.89927385,9.20968693 4.88773203,9.61686531 5.63543336,10.3645666 C6.38322095,11.1123542 6.79031079,12.1008725 6.81465633,13.1159359 C8.20053516,12.7647542 9.69979655,11.9979587 10.8583757,10.8393796 C12.0063684,9.69138689 12.7659249,8.18663848 13.1157871,6.79511089 C12.1061778,6.7661862 11.1259103,6.35878478 10.3835627,5.61643726 C9.64109391,4.87396844 9.23381361,3.89361127 9.2048813,2.88421488 L9.2048813,2.88421488 Z M10.5479526,2.67131339 C11.511899,2.61566861 12.3181253,2.80287041 12.7576274,3.24237257 C13.197128,3.68187313 13.38433,4.48809506 13.3286872,5.45203674 C12.5947286,5.47855493 11.8709357,5.20455852 11.3331886,4.66681139 C10.795352,4.12897481 10.5214486,3.40507543 10.5479526,2.67131339 L10.5479526,2.67131339 Z M2.67157778,10.5296517 C2.61943453,11.4868047 2.81253284,12.2897955 3.26136867,12.7386313 C3.71020565,13.1874683 4.51319945,13.3805665 5.47035564,13.3284218 C5.50215807,12.5892607 5.22868404,11.8570691 4.68580748,11.3141925 C4.14299513,10.7713802 3.41087562,10.4978363 2.67157778,10.5296517 L2.67157778,10.5296517 Z M11.8080016,11.7890055 C14.6840928,8.91291425 15.5267325,4.1122259 13.7072533,2.2927467 C11.8877741,0.473267498 7.08708575,1.31590724 4.21099454,4.19199845 C1.31444256,7.08855043 0.460735213,11.8372496 2.31174279,13.6882572 C4.16275037,15.5392648 8.91144957,14.6855574 11.8080016,11.7890055 L11.8080016,11.7890055 Z" id="path-23"></path></svg>';
    SVG.arcade = '<svg var="icon" width="24px" height="24px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M6.48484848,12.5454546 C6.48484848,12.3780955 6.34917719,12.2424243 6.18181817,12.2424243 C6.01445916,12.2424243 5.87878787,12.3780955 5.87878787,12.5454546 C5.87878787,13.3820024 5.19965741,14.0606061 4.36363635,14.0606061 C3.52708851,14.0606061 2.84848482,13.3814757 2.84848482,12.5454546 L2.84848482,7.09190787 C2.84848482,4.24610348 5.1544942,1.93939391 8,1.93939391 C10.8450727,1.93939391 13.1515152,4.24640846 13.1515152,7.09190787 L13.1515152,12.5454546 C13.1515152,13.3822497 12.4731587,14.0606061 11.6363637,14.0606061 C10.7995686,14.0606061 10.1212121,13.3822497 10.1212121,12.5454546 C10.1212121,12.3780955 9.98554086,12.2424243 9.81818183,12.2424243 C9.6508228,12.2424243 9.51515152,12.3780955 9.51515152,12.5454546 C9.51515152,13.3820024 8.8360211,14.0606061 8,14.0606061 C7.16345218,14.0606061 6.48484848,13.3814757 6.48484848,12.5454546 Z M6.18181817,11.030303 C7.01861327,11.030303 7.6969697,11.7086595 7.6969697,12.5454546 C7.6969697,12.71225 7.83309885,12.8484849 8,12.8484849 C8.16679546,12.8484849 8.3030303,12.7123557 8.3030303,12.5454546 C8.3030303,11.7086595 8.98138673,11.030303 9.81818183,11.030303 C10.6549769,11.030303 11.3333334,11.7086595 11.3333334,12.5454546 C11.3333334,12.7128136 11.4690046,12.8484849 11.6363637,12.8484849 C11.8037227,12.8484849 11.939394,12.7128136 11.939394,12.5454546 L11.939394,7.09190787 C11.939394,4.91577725 10.1755693,3.15151513 8,3.15151513 C5.82401266,3.15151513 4.06060604,4.91545718 4.06060604,7.09190787 L4.06060604,12.5454546 C4.06060604,12.71225 4.19673522,12.8484849 4.36363635,12.8484849 C4.53043181,12.8484849 4.66666665,12.7123557 4.66666665,12.5454546 C4.66666665,11.7086595 5.3450231,11.030303 6.18181817,11.030303 Z M7.39393939,8 C6.89186236,8 6.48484848,7.59298612 6.48484848,7.09090909 C6.48484848,6.58883204 6.89186236,6.18181817 7.39393939,6.18181817 C7.89601642,6.18181817 8.3030303,6.58883204 8.3030303,7.09090909 C8.3030303,7.59298612 7.89601642,8 7.39393939,8 Z M10.4242424,8 C9.9221654,8 9.51515152,7.59298612 9.51515152,7.09090909 C9.51515152,6.58883204 9.9221654,6.18181817 10.4242424,6.18181817 C10.9263195,6.18181817 11.3333333,6.58883204 11.3333333,7.09090909 C11.3333333,7.59298612 10.9263195,8 10.4242424,8 Z" id="path-27"></path></svg>';
    SVG.adventure = '<svg var="icon" width="24px" height="24px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill-rule="evenodd" d="M7.11380597,11.3434624 L8.13921235,12.3688687 C8.36508186,12.5947383 8.73204145,12.5946457 8.95843235,12.3682548 C9.18640163,12.1402856 9.18509809,11.7750866 8.95904627,11.5490348 L8.34355687,10.9335454 L13.8789146,5.39818773 C13.9896791,5.28742317 14.0825069,5.06430168 14.0826455,4.90343766 L14.0847228,2.49177434 C14.0849999,2.17009056 13.8258918,1.91276811 13.5059921,1.91304367 L11.0943288,1.91512102 C10.9317234,1.91526109 10.7119576,2.00647302 10.5995787,2.11885192 L5.06422108,7.65420956 L4.44873169,7.03872023 C4.22286215,6.81285066 3.85590255,6.81294323 3.62951166,7.03933414 C3.40154241,7.26730336 3.4028459,7.63250232 3.62889773,7.85855414 L4.6543041,8.88396053 L2.19464442,11.3436202 C1.74234975,11.7959149 1.74163745,12.5299655 2.19394679,12.9822749 L3.01549164,13.8038197 C3.46625787,14.2545859 4.20145165,14.2558167 4.65414627,13.8031221 L7.11380597,11.3434624 Z M6.29388449,10.5235409 L5.47413805,9.7037945 L5.06893265,10.1089999 L5.27073307,11.5466996 C5.62093637,11.196436 5.9837459,10.8336406 6.29388449,10.5235409 Z M4.04225469,11.1356778 L4.2441214,12.5738498 C3.99486568,12.8233981 3.83501625,12.9836764 3.83532559,12.9839858 C3.83532559,12.9839858 3.01460939,12.1633232 3.01447837,12.1634542 L4.04225469,11.1356778 Z M7.11380597,9.7037945 L9.98511143,6.83248903 C10.2090455,6.60855491 10.2096157,6.24093258 9.98322482,6.01454168 C9.75525555,5.78657244 9.39062638,5.78730612 9.16527746,6.01265507 L6.29397201,8.88396053 L5.88405503,8.47404354 L11.2841933,3.07390528 L12.9293963,3.07296106 L12.9238367,4.72125046 L7.52422759,10.1142161 L7.11380597,9.7037945 Z" id="path-31"></path></svg>';
    SVG.all = '<svg var="icon" width="24px" height="24px" viewBox="2 0 16 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M10,4.44452319 C10.5816565,4.44452319 10.8391464,4.38356071 11.4420906,4.1588278 C11.4655065,4.15009678 11.4655065,4.15009678 11.489197,4.14126082 C12.2503042,3.85745498 12.7026825,3.74999997 13.4504361,3.74999997 C15.2646074,3.74999997 16.9299393,5.53328272 17.6188139,7.70686049 C18.1473999,9.37468652 18.2885255,10.442977 18.3332034,12.7912097 C18.2890755,15.0722416 17.31736,16.2387385 15.5514673,16.249988 C14.458455,16.2435532 13.7027561,15.7523279 13.0042828,14.8600236 C12.8905148,14.7146842 12.5665599,14.2686604 12.5657225,14.2675436 C11.8467793,13.3085845 11.1034722,12.7853269 10.0021584,12.7777785 C8.89653159,12.7853242 8.15322253,13.308582 7.43427747,14.2675436 C7.43344013,14.2686604 7.10948522,14.7146842 6.99571719,14.8600236 C6.29724395,15.7523279 5.54154494,16.2435532 4.43999999,16.2499858 C2.68264005,16.2387385 1.71092448,15.0722416 1.66679521,12.7644147 C1.71147457,10.442977 1.85260006,9.37468652 2.38118615,7.70686049 C3.07006074,5.53328272 4.73539258,3.74999997 6.54956392,3.74999997 C7.29731752,3.74999997 7.74969582,3.85745498 8.51080295,4.14126082 C8.53449353,4.15009678 8.53449353,4.15009678 8.55790938,4.1588278 C9.16085361,4.38356071 9.41834347,4.44452319 10,4.44452319 Z M9.99997854,5.83340428 C9.30415632,5.83340428 8.81974819,5.73864981 8.07283364,5.46025544 C8.04906307,5.45139216 8.04906307,5.45139216 8.02554477,5.44262044 C7.40604972,5.21161969 7.09985786,5.13888886 6.54956392,5.13888886 C5.4700076,5.13888886 4.23181388,6.46478047 3.70517175,8.12647282 C3.22218514,9.65042069 3.09774465,10.5924092 3.05542561,12.7643458 C3.08600815,14.3451981 3.51078456,14.8551214 4.44035616,14.8611231 C5.03503894,14.8576222 5.43969878,14.594582 5.90204838,14.0039273 C5.9973926,13.8821244 6.30888159,13.4532639 6.32301281,13.434415 C7.27615625,12.163069 8.36045323,11.3998777 9.99568403,11.3889192 C11.6395389,11.3998722 12.7238403,12.1630645 13.6769872,13.434415 C13.6911184,13.4532639 14.0026074,13.8821244 14.0979516,14.0039273 C14.5603012,14.594582 14.9649611,14.8576222 15.5511111,14.8611254 C16.4892154,14.8551214 16.9139918,14.3451981 16.9445731,12.7911409 C16.9022554,10.5924092 16.7778148,9.65042069 16.2948282,8.12647282 C15.7681861,6.46478047 14.5299924,5.13888886 13.4504361,5.13888886 C12.9001422,5.13888886 12.5939503,5.21161969 11.9744552,5.44262044 C11.950937,5.45139216 11.950937,5.45139216 11.9271664,5.46025544 C11.1802518,5.73864981 10.6958008,5.83340428 9.99997854,5.83340428 Z M13.4722222,8.26388888 C13.0886912,8.26388888 12.7777778,7.95297551 12.7777778,7.56944443 C12.7777778,7.18591335 13.0886912,6.87499998 13.4722222,6.87499998 C13.8557533,6.87499998 14.1666667,7.18591335 14.1666667,7.56944443 C14.1666667,7.95297551 13.8557533,8.26388888 13.4722222,8.26388888 Z M13.4722222,11.0416667 C13.0886912,11.0416667 12.7777778,10.7307533 12.7777778,10.3472222 C12.7777778,9.96369118 13.0886912,9.65277778 13.4722222,9.65277778 C13.8557533,9.65277778 14.1666667,9.96369118 14.1666667,10.3472222 C14.1666667,10.7307533 13.8557533,11.0416667 13.4722222,11.0416667 Z M14.8611111,9.65277778 C14.4775801,9.65277778 14.1666667,9.34186437 14.1666667,8.95833333 C14.1666667,8.57480225 14.4775801,8.26388888 14.8611111,8.26388888 C15.2446422,8.26388888 15.5555556,8.57480225 15.5555556,8.95833333 C15.5555556,9.34186437 15.2446422,9.65277778 14.8611111,9.65277778 Z M12.0833333,9.65277778 C11.6998023,9.65277778 11.3888889,9.34186437 11.3888889,8.95833333 C11.3888889,8.57480225 11.6998023,8.26388888 12.0833333,8.26388888 C12.4668644,8.26388888 12.7777778,8.57480225 12.7777778,8.95833333 C12.7777778,9.34186437 12.4668644,9.65277778 12.0833333,9.65277778 Z M6.52777776,11.0416667 C5.37718453,11.0416667 4.44444442,10.1089265 4.44444442,8.95833333 C4.44444442,7.80774009 5.37718453,6.87499998 6.52777776,6.87499998 C7.678371,6.87499998 8.6111111,7.80774009 8.6111111,8.95833333 C8.6111111,10.1089265 7.678371,11.0416667 6.52777776,11.0416667 Z M6.52777776,9.65277778 C6.91130884,9.65277778 7.22222221,9.34186437 7.22222221,8.95833333 C7.22222221,8.57480225 6.91130884,8.26388888 6.52777776,8.26388888 C6.14424668,8.26388888 5.83333331,8.57480225 5.83333331,8.95833333 C5.83333331,9.34186437 6.14424668,9.65277778 6.52777776,9.65277778 Z" id="path-1"></path></svg>';

    var stylesheet = `
        <style type="text/css">

        html, body{
            font-family:'Roboto', sans-serif;
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0;
            padding: 0;
        }
        .catalog{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        .catalog > b{
            color: #fff;
            position: absolute;
            top: 9px;
            right: 9px;
            cursor: pointer;
        }
        .catalog > b svg{
            width: 32px;
            fill: #fff;
            margin-top: -3px;
        }
        .catalog .header{
            padding: 10px 20px;
            padding-top: 35px;
        }
        .catalog .header > img +  b{
            margin-top: 20px;
        }
        .catalog .header > .categories-bar{
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
        .catalog .header > img +  b,
        .catalog .header > .categories-bar + b{
            width: 100%;
            height: 1px;
            background-color: #777;
            display: block;
        }
        
        .catalog .header ul,
        .catalog .header ul li{
            display: block;
            list-style: none;
            padding: 0;
            margin: 0;
            color: #fff;
            font-size: 12px;
        }
        .catalog .header ul{
            width: 576px;
            margin: 0 auto;
        }
        .catalog .header ul{
            padding: 10px 0;
            border-left: 0;
        }
        .catalog .header ul li{
            width: 40px;
            height: 40px;
            /* float: left; */
            padding-bottom: 30px;
            line-height: 30px;
            margin: 0 12px;
            position: relative;
            display: inline-block;
        }
        .catalog .header ul:after{
            display: block;
            clear: both;
            content: '';
        }
        .catalog .header ul li u{
            display: block;
            position: relative;
            cursor: pointer;
        }
        .catalog .header ul li i{
            border: 1px solid #000;
            border-radius: 40px;
            width: 40px;
            height: 40px;
            position: relative;
            box-sizing: border-box;
            display: block;
            cursor: pointer;
        }
        .catalog .header ul li span{
            top: 40px;
            left: 50%;
            transform: translate(-50%, 0);
            position: absolute;
        }
        .catalog .header ul li span b{
            font-weight: normal;
            display: block;
            cursor: pointer;
        }


        .catalog .header ul li u svg{
            fill: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .catalog .header ul li.All i{
            border: 1px solid #4666E2
        }
        .catalog .header ul li.All.selected i{
            background-color: #4666E2
        }
        .catalog .header ul li.Adventure i{
            border: 1px solid #04BD68
        }
        .catalog .header ul li.Adventure.selected i{
            background-color: #04BD68
        }
        .catalog .header ul li.Arcade i{
            border: 1px solid #FFC11C
        }
        .catalog .header ul li.Arcade.selected i{
            background-color: #FFC11C
        }
        .catalog .header ul li.Sports i{
            border: 1px solid #4666E2
        }
        .catalog .header ul li.Sports.selected i{
            background-color: #4666E2
        }
        .catalog .header ul li.Strategy i{
            border: 1px solid #8736FD
        }
        .catalog .header ul li.Strategy.selected i{
            background-color: #8736FD
        }
        .catalog .header ul li.Classics i{
            border: 1px solid #1BBCEA
        }
        .catalog .header ul li.Classics.selected i{
            background-color: #1BBCEA
        }

        .catalog .header ul li.Casino i{
            border: 1px solid #F77D38
        }
        .catalog .header ul li.Casino.selected i{
            background-color: #F77D38
        }
        .catalog .header ul li.Girls i{
            border: 1px solid #ED80F3
        }
        .catalog .header ul li.Girls.selected i{
            background-color: #ED80F3
        }
        .catalog .header ul li.Puzzles i{
            border: 1px solid #E20074
        }
        .catalog .header ul li.Puzzles.selected i{
            background-color: #E20074
        }

        .catalog .header ul li b{
            line-height: 30px;
            text-align: center;

        }
        .catalog .catalog-list{
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            flex: 1;
            overflow-x: hidden;
        }
        .catalog .catalog-list .game-item{
            width: 160px;
            display: inline-block;
            margin: 8px;
            cursor: pointer;
        }
        @media only screen and (max-width:600px)
        {
            .catalog .catalog-list{
                padding: 0 12px;
            }
            .catalog .catalog-list .game-item{
                width: calc(50% - 16px);
                display: inline-block;
                margin: 8px;
            }
        }
        .catalog .catalog-list .game-item i{
            width: 100%;
            display: block;
            border-radius: 29px 29px 0 0;
            overflow: hidden;
            padding-top: 80%;
            background-size: cover;
            background-color: #3e5260;
        }
        .catalog .catalog-list .game-item span{
            background-color: #2A3740;
            display: block;
            border-radius: 0 0 15px 15px;
            color: #fff;
            padding: 5px 10px;
            text-align: left;
        }
        .catalog .catalog-list .game-item span *{
            display: block;
        }
        .catalog .catalog-list .game-item span b{
            line-height: 20px;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: normal;
            padding-top: 5px;
        }
        .catalog .catalog-list .game-item span u{
            line-height: 20px;
            font-size: 12px;
            text-decoration: none;
            opacity: 0.5;
            padding-bottom: 5px;
        }
        .game-icon, 
        .plus-game-icon{
            position:absolute;
            top: 50%;
            right: 48px;
            cursor:pointer;
        }
        .game-icon img{
            width: 48px;
            height: 48px;
            border-radius: 48px;
            overflow: hidden;
            position: absolute;
            top: -24px;
            right: -24px;
        }
        .game-icon span,
        .plus-game-icon span{
            position: absolute;
            line-height: 40px;
            font-size: 14px;
            color: #fff;
            margin-top: -20px;
            top: 0;
            right: 45px;
            white-space: nowrap;
        }
        .plus-game-icon b{
            width: 48px;
            height: 48px;
            border-radius: 48px;
            overflow: hidden;
            position: absolute;
            top: -24px;
            right: -24px;
            box-sizing:border-box;
            border: 2px solid #fff;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
        }
        .plus-game-icon svg{
            width: 34px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            fill: #fff;
        }

        .loader-screen{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            color: #fff;
            padding: 20px;
            padding-top: 85px;
            box-sizing: border-box;
        }
        .loader-screen > i{
            position: absolute;
            top: 15px;
            left: 15px;
            padding-left: 20px;
            cursor: pointer;
            font-style: normal;
        }
        .loader-screen > i:after{
            display: block;
            content: '';
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            width: 8px;
            height: 8px;
            left: 3px;
            top: 4px;
            transform: rotate(-45deg);
            position: absolute;
        }
        .loader-screen > img{
            position: absolute;
            width: 84px;
            height: 84px;
            display: block;
            margin: 0 auto;
            border-radius: 84px;
            overflow: hidden;
            margin-bottom: 48px;
            top: 123px;
            left: 50%;
            margin-left: -42px;
        }
        .loader-screen b{
            font-weight: normal;
            font-size: 20px;
        }
        .loader-screen div.brand{
            position: absolute;
            bottom: 0;
            padding: 20px;
            border-top: 1px solid #777;
            left: 20px;
            right: 20px;
        }
        .loader-screen div.brand img{
            display: block;
            margin: 0 auto;
        }
        .close-bar{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background-color: #000;
        }
        .close-bar > b {
            color: #fff;
            position: absolute;
            top: 0px;
            right: 0;
            cursor: pointer;
            cursor: pointer;
            padding-top: 5px;
            background-color: transparent;
        }
        .close-bar > b svg{
            width: 32px;
            fill: #fff;
            margin-top: -8px;
            padding: 9px;
        }
        
    </style>`;


    var stylesheetClose = `
        <style type="text/css">
        #game-frame{
            width: 1px;
            min-width: 100%;
            *width: 100%;
            height: 1px;
            min-height: calc(100% - 50px);
            *height: calc(100% - 50px);
            position: fixed;
            top: 50px;
            left: 50px;
        }
        .gamePix {
            font-family:'Roboto', sans-serif;
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0;
            padding: 0;
        }
        .gamePix .loader-screen{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            color: #fff;
            padding: 20px;
            padding-top: 245px;
            box-sizing: border-box;
        }
        .gamePix .loader-screen > img{
            position: absolute;
            width: 84px;
            height: 84px;
            display: block;
            margin: 0 auto;
            border-radius: 84px;
            overflow: hidden;
            margin-bottom: 48px;
            top: 123px;
            left: 50%;
            margin-left: -42px;
        }
        .gamePix .loader-screen > b{
            font-weight: normal;
            font-size: 20px;
        }
        .gamePix .loader-screen div.buttons{
            position: absolute;
            bottom: 50px;
            left: 0;
            width: 100%;
        }
        .gamePix .loader-screen div.buttons b{
            display: block;
            margin: 0 auto;
            font-size: 14px;

        }
        
        .gamePix .loader-screen div.buttons b.play{
            background-color: #0499D7;
            color: #fff;
            border: 1px solid #0499D7;
            border-radius: 5px;
            line-height: 45px;
            width: 260px;
            text-align: center;
            cursor: pointer;
        }
        .gamePix .loader-screen div.buttons b.catalog{
            color: #fff;
            border: 1px solid #0499D7;
            border-radius: 5px;
            line-height: 45px;
            width: 260px;
            text-align: center;
            margin-top: 15px;
            cursor: pointer;
        }
        .gamePix .loader-screen div.buttons b.close{
            line-height: 30px;
            width: 260px;
            margin-top: 15px;
            text-decoration: underline;
            text-align: center;
            cursor: pointer;
        }
    </style>`;
    
    function start(){
        var LOADING_PERCENT = 0;
        var GAME_URL = '';
        function SVG_Loader(){
            this.holder = document.createElement('div');
            this.holder.style.paddingBottom = '15px';
            this.value = 0;
        }
        SVG_Loader.prototype.update = function(percent){
            //console.log("RENDER PERCENT", percent)
            var html = '<svg width="160" height="160"><circle cx="80" cy="80" r="72" style="fill: transparent; stroke: rgba(255, 255, 255, 0.5); stroke-width: 16;"></circle>';
            
            var angle = (Math.min(percent, 0.5) * 360) * Math.PI / 180
            var pointA = {x:Math.sin(angle) * 80, y: -Math.cos(angle) * 80}
            var pointB = {x:Math.sin(angle) * 64, y: -Math.cos(angle) * 64}

            var path = 'M 0 -80';
            path += 'A 80 80 0 0 1 ' + pointA.x + ' ' + pointA.y;
            path += 'L ' + pointB.x + ' ' + pointB.y;
            path += 'A 64 64 0 0 0 0 -64';
            path += 'L 0 -80Z';
            
            html += '<path transform="translate(80,80)" d="' + path + '" fill="#FFDD00"></path>'
    
    
            if (percent > 0.5){
                var angle = (percent * 360) * Math.PI / 180
                var pointA = {x:Math.sin(angle) * 80, y: -Math.cos(angle) * 80}
                var pointB = {x:Math.sin(angle) * 64, y: -Math.cos(angle) * 64}

                var path = 'M 0 80';
                path += 'A 80 80 0 0 1 ' + pointA.x + ' ' + pointA.y;
                path += 'L ' + pointB.x + ' ' + pointB.y;
                path += 'A 64 64 0 0 0 0 64';
                path += 'L 0 80Z';
    
                html += '<path transform="translate(80,80)" d="' + path + '" fill="#FFDD00"></path>'
            }
            html += '</svg>';
            this.holder.innerHTML = html;
            this.value = percent;
        }
        SVG_Loader.prototype.setValue = function(){
            return this.value;
        }

        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'about:blank');
        iframe.style.position = 'fixed';
        iframe.style.top = 0;
        iframe.style.left = 0;
        iframe.style.right = 0;
        iframe.style.bottom = 0;
        iframe.setAttribute('seamless', 'seamless')
        
        iframe.style.display = "block";
        iframe.style.border =  0;
        iframe.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        iframe.style.width = '100%';
        iframe.style.height= '100%';
        iframe.style.zIndex = 1000000;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);


        /*var iframeGame = document.createElement('iframe');
        iframeGame.setAttribute('src', 'about:blank');
        iframeGame.style.position = 'fixed';
        iframeGame.style.top = '50px';
        iframeGame.style.left = 0;
        iframeGame.style.right = 0;
        iframeGame.style.bottom = 0;
        iframeGame.id = 'game-frame';
        //iframeGame.setAttribute('seamless', 'seamless');
        iframeGame.setAttribute('name', window.location.href);
        iframeGame.setAttribute('scrolling', 'no');
        iframeGame.className = 'iframeGame';

        
        iframeGame.style.display = "block";
        iframeGame.style.border =  0;
        
        iframeGame.style.width = '100%';
        iframeGame.style.height= 'calc(100% - 50px)';
        iframeGame.style.zIndex = 1000001;
        iframeGame.style.display = 'none';*/
        var iframeGame = document.createElement('iframe');
        iframeGame.id = 'game-frame';
        iframeGame.src = 'https://games.gamepix.com/play/40353?sid=110880';
        iframeGame.setAttribute('frameborder', '0');
        iframeGame.setAttribute('name', window.location.href);
        iframeGame.setAttribute('width', '100%');
        iframeGame.setAttribute('height', '100%');
        iframeGame.setAttribute('scrolling', 'no');
        iframeGame.style.top = '0%';
        iframeGame.style.left = '0%';
        iframeGame.style.zIndex = 1000001;
        iframeGame.style.display = 'none';
        document.body.appendChild(iframeGame);
        
        

        var closeIframe = document.createElement('div');
        closeIframe.style.position = 'fixed';
        closeIframe.style.top = '0px';
        closeIframe.style.left = '0px';
        closeIframe.style.right = 0;
        closeIframe.style.bottom = 0;
        closeIframe.className = 'gamePix'
        
        closeIframe.style.display = "none";
        closeIframe.style.border =  0;
        closeIframe.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        closeIframe.style.width = '100%';
        closeIframe.style.height= '100%';
        closeIframe.style.zIndex = 1000002;
        closeIframe.style.display = 'none';
        document.body.appendChild(closeIframe);


        window['globalIframe'] = iframeGame;


        var inter = window.setInterval(function() {
            // put inside function 
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            //var closeIframeDoc = closeIframe.contentDocument || closeIframe.contentWindow.document;
            if(iframeDoc.readyState == "complete") {
                window.clearInterval(inter);

                renderUI();
            }
        },100);

        function renderUI(){
            var UI = {};

            /*
            *  Effects
            */
            var blurEffect = new TimeLine(500, 33);
            blurEffect.addEventListener(EVENT.CHANGE, 'render', blurEffect);
            blurEffect.render = function(){
                var delay = this.delay || 0;
                var children = document.body.children;
                var pageElementsBlur = false;
                var elements = this.elements;
                for (var iElement = 0; iElement < elements.length; iElement++){
                    if (elements[iElement] == '*'){
                        pageElementsBlur = true;
                    }
                }
                function blurEnabled(element){
                    if (element == UI.button || element == iframe || element == iframeGame || element == closeIframe){
                        for (var iElement = 0; iElement < elements.length; iElement++){
                            if (elements[iElement] == element){
                                return true;
                            }
                        }
                        return false;
                    } else {
                        return pageElementsBlur;
                    }
                }

                var blurAmount = Math.min(Math.floor((timeLine.position - this.delay) / 25), 20);
                blurAmount = Math.max(blurAmount, 0) | 0;
                var blur = (timeLine.position == 0 ? '' : 'blur(' + blurAmount + 'px)');

                for (var iChild = 0; iChild < children.length; iChild++) {
                    
                    if (children[iChild].style.filter == ''){
                        children[iChild].applyFilter = true;
                    }
                    if (children[iChild].applyFilter){
                        children[iChild].style.filter = (blurEnabled(children[iChild]) ? blur : '')
                    }
                }
            }
            blurEffect.blur = function(data){
                blurEffect.elements = data.elements || [];
                blurEffect.delay = data.delay;
                blurEffect.direction = data.direction;
                blurEffect.position = data.direction == 1 ? 0 : 500 + data.delay * 2;
                blurEffect.play();
            }
            

            // Open game corner Button
            var html = ''
            html += '<div var="button" style="width:48px;height:48px;border-radius:48px;top:50%;right:0; background-color:#0099D7;position: fixed;margin-top: -24px;margin-right: -24px;z-index:1000001;box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);cursor: pointer; color: #0099D7; transition:color 0.25s linear; -webkit-tap-highlight-color: rgba(255, 255, 255, 0);"><b var="button.icon">' + SVG.close + '</b></div>';
            document.body.appendChild(Browser.DOM(html, UI));

            UI.button.icon.style.opacity = '0';
            UI['close-button'].style.fill = '#fff';
            UI['close-button'].style.width = '32px';
    
            UI.button.children[0].style.position = 'absolute';
            UI.button.children[0].style.top = '50%';
            UI.button.children[0].style.left = '50%';
            UI.button.children[0].style.transform = 'translate(-50%, -50%)';
    
            // Close Screen Iframe
            var bodyClose = closeIframe;
            var headClose = document.head;
            var font = document.createElement('link');
            font.setAttribute('href', "https://fonts.googleapis.com/css?family=Roboto");
            font.setAttribute('rel', 'stylesheet');
            headClose.appendChild(font);

            var UI_Close = {};
            var html = '';
            html += '<div class="loader-screen" var="loader-screen">';
            html += '  <img var="loader.gameLogo"/>';
            html += '  <b var="loader.title"></b>'
            html += '  <div class="buttons">';
            html += '    <b class="play" var="play">Keep Playing</b>'
            html += '    <b class="catalog" var="catalog">Game Corner</b>'
            html += '    <b class="close" var="close">Back to Website</b>'
            html += '  </div>';
            html += '</div>'
            

            bodyClose.innerHTML = stylesheetClose;
            bodyClose.appendChild(Browser.DOM(html, UI_Close));
            

            UI_Close.play.onclick = function(){
                closeIframe.mode = 'play';
                closeIframe.hide();
            }
            UI_Close.catalog.onclick = function(){
                closeIframe.mode = 'catalog';
                closeIframe.hide();
            }
            UI_Close.close.onclick = function(){
                closeIframe.hide();
                closeIframe.mode = 'close';
            }
            
            closeIframe.effect = new TimeLine(700, 300);
            closeIframe.effect.addEventListener(EVENT.CHANGE, 'render', closeIframe.effect);
            closeIframe.effect.render = function(){
                var blur = (this.position < 200 ? '' : 'blur(' + Math.min(Math.floor((this.position - 200) / 25), 20) + 'px)')
                closeIframe.style.display = (this.position > 0 ? '' : 'none');
                closeIframe.style.opacity = this.getTime(0, 400);
                
                iframe.style.filter = blur;
                //iframeGame.style.filter = blur;
                iframeGame.style.display = (this.position < 400 ? '' : 'none');
                if (closeIframe.direction == -1){

                }
                if (closeIframe.mode == 'close'){
                    var children = document.body.children;
                    function noBlur(element){
                        if (element == UI.button || element == iframe || element == iframeGame || element == closeIframe){
                            return false;
                        }
                        return true;
                    }
                    for (var iChild = 0; iChild < children.length; iChild++) {
                        var blur = (this.position == 0 ? '' : 'blur(' + Math.min(Math.floor((this.position - 200) / 25), 20) + 'px)');
                        if (children[iChild].style.filter == ''){
                            children[iChild].applyFilter = true;
                        }
                        if (children[iChild].applyFilter){
                            children[iChild].style.filter = (noBlur(children[iChild]) ? blur : '')
                        }
                        
                    }
                    TimeLine.applyMatrix(UI.button, {x: 24 * this.getTime(100, 200)});
                    

                    iframe.style.opacity = this.getTime(200, 500)
                    iframeGame.style.opacity = this.getTime(200, 500)
                    iframe.style.display = (this.position > 200 ? '': 'none');
                    iframeGame.style.display = (this.position > 200 ? '': 'none');

                    UI['close-bar'].style.opacity = this.getTime(200, 400);
                    UI['close-bar'].style.display = (this.position > 200 ? '': 'none')

                    timeLine.direction = -1;
                    timeLine.position = 0;

                    if (this.direction == -1 && this.position == 0){
                        iframeGame.setAttribute('src', 'about:blank');
                    }
                }
                else if (closeIframe.mode == 'catalog'){

                    UI['catalog-container'].style.display = (this.position < this.duration ? '' : 'none');
                    UI['catalog-container'].style.opacity = 1 - this.getTime(300, 400);

                    iframeGame.style.opacity = this.getTime(200, 500);
                    iframeGame.style.display = (this.position > 200 ? '': 'none');

                    UI['close-bar'].style.opacity = this.getTime(200, 400);
                    UI['close-bar'].style.display = (this.position > 200 ? '': 'none')
                    if (this.direction == -1 && this.position == 0){
                        iframeGame.setAttribute('src', 'about:blank');
                    }
                }
            }
            closeIframe.show = function(){
                this.effect.direction = 1;
                this.effect.play();
            }
            closeIframe.hide = function(){
                this.effect.direction = -1;
                this.effect.play();
            }

            // Games Iframe
            var body = (iframe.contentDocument || iframe.contentWindow.document).body;
            var head = (iframe.contentDocument || iframe.contentWindow.document).head;
            var font = document.createElement('link');
            font.setAttribute('href', "https://fonts.googleapis.com/css?family=Roboto");
            font.setAttribute('rel', 'stylesheet');
            head.appendChild(font);
            
    
            var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
            eventer(messageEvent, function(e){
                console.log(e);
                if (e.data.type == 'loading') {
                    console.log("PERCENT LOADED " + e.data.percentage)
                    if (LOADING_PERCENT == 0){
                        LOADING_PERCENT = e.data.percentage / 100;
                    }
                    var percent = timeLineLoader.position / timeLineLoader.duration;
                    var relPercent = ((e.data.percentage / 100) - LOADING_PERCENT) / (1 - LOADING_PERCENT)
                    percent = percent + relPercent * (1 - percent);
                    loader.update(percent);
                    if (e.data.percentage == 100){
                        showGameAnimation.show();
                    }
                } else if (e.data.type == 'loaded') {
                    console.log("GAME LOADED")
                    GAME_URL = e.data.url;
                    LOADING_PERCENT = 1;
                    loader.update(100)
                    showGameAnimation.show();
                    globalIframe.contentWindow.postMessage({message: 'callbackExecuted'}, e.data.url);
                }
            });
    
            var timeLine = new TimeLine(500, 33);
            timeLine.direction = -1;
            timeLine.addEventListener(EVENT.CHANGE, 'onRender', timeLine);
            timeLine.onRender = function(){
                iframe.style.display = (this.position > 0 ? '' : 'none');
                iframe.style.opacity = (this.getTime(100, 200));
                UI.button.icon.style.opacity = this.getTime(300, 200)
                
                TimeLine.applyMatrix(UI.button, {x: -48 * this.getTime(300, 200)});
                if (timeLine.position == 0 && timeLine.direction == -1){
                    document.body.style.overflow = '';
                } else {
                    document.body.style.overflow = 'hidden';
                }
                for (var iItem = 0; iItem < items.length; iItem++){
                    var x = Math.cos((130 + 33.3 * (3 - iItem)) * Math.PI / 180) * 150 * this.getTime(300, 200) + 48 * this.getTime(300, 200);
                    var y = Math.sin((130 + 33.3 * (3 - iItem)) * Math.PI / 180) * 150 * this.getTime(300, 200);
                    TimeLine.applyMatrix(items[iItem].htmlIcon, {x:x, y:y, opacity: this.getTime(300, 200)});
                    
                    items[iItem].htmlIcon.style.display = (this.position < 300 ? 'none' : '');
                }
            }
            UI.button.onclick = function(){
                timeLine.direction = -(timeLine.direction);
                timeLine.play();

                blurEffect.blur({elements:['*'], delay: 0, direction: timeLine.direction})
            }
            
    
            var catalogShowEffect = new TimeLine(1200, 33);
            catalogShowEffect.direction = -1;
            catalogShowEffect.addEventListener(EVENT.CHANGE, 'onRender', catalogShowEffect);
            catalogShowEffect.onRender = function(){
                var offset = 500;
                UI['catalog-container'].style.display = (this.position < this.duration ? '' : 'none');
                UI['catalog-container'].style.opacity = 1 - this.getTime(300, 400);
                
                TimeLine.applyMatrix(UI['line-top'], {y: 50 * this.getTime(300, 400)})
                TimeLine.applyMatrix(UI['line-bottom'], {y: -30 * this.getTime(300, 400)})
                for (var iCat = 0; iCat < categories.length; iCat++){
                    TimeLine.applyMatrix(categories[iCat].UI.label.text, { y: 24 * this.getTime(300, 400)});
                    TimeLine.applyMatrix(categories[iCat].UI.circle, { scale: 1 - this.getTime(300, 400)});
                }
                offset = 1000;
                
                UI.button.icon.style.opacity = this.getTime(offset, 200)
                TimeLine.applyMatrix(UI.button, {x: 24 -(48 + 24) * this.getTime(offset, 200)});
                for (var iItem = 0; iItem < items.length; iItem++){
                    var x = Math.cos((130 + 33.3 * (3 - iItem)) * Math.PI / 180) * 150 * this.getTime(offset, 200) + 48 * this.getTime(offset, 200);
                    var y = Math.sin((130 + 33.3 * (3 - iItem)) * Math.PI / 180) * 150 * this.getTime(offset, 200);
                    TimeLine.applyMatrix(items[iItem].htmlIcon, {x:x, y:y, opacity: this.getTime(offset, 200)});
                    
                    items[iItem].htmlIcon.style.display = (this.position < offset ? 'none' : '');
                }
            };
    
            var catalogCloseEffect = new TimeLine(500, 33);
            catalogCloseEffect.direction = -1;
            catalogCloseEffect.addEventListener(EVENT.CHANGE, 'onRender', catalogCloseEffect);
            catalogCloseEffect.onRender = function(){
                TimeLine.applyMatrix(UI.button, {x: 24 * (this.getTime(0, 200))});
                iframe.style.display = (this.position > 0 ? '' : 'none');
                iframe.style.opacity = (this.getTime(300, 200));
                UI['catalog-container'].style.display = (this.position > 0 ? '' : 'none');
            }
            body.innerHTML = stylesheet;
    
    
            // Catalog UI
    
            html = '';
            html += '<div var="catalog-container" class="catalog" style="display: none">';
            html += '  <b var="catalog-close-button">' + SVG.close + '</b>';
            html += '  <div class="header">';
            html += '    <img var="catalog-logo"/>';
            html += '    <b var="line-top"></b>';
            html += '    <div class="categories-bar">';
            html += '      <ul var="categories"></ul>';
            html += '    </div>'
            html += '    <b var="line-bottom"></b>';
            html += '  </div>';
            html += '  <div class="catalog-list" var="catalog"><div></div></div>'
            html += '</div>';
            html += '<div class="loader-screen" var="loader-screen" style="display:none">';
            html += '  <i var="loader.back">Back</i>';
            html += '  <img var="loader.gameLogo"/>';
            html += '  <b var="loader.title"></b>'
            html += '  <div class="brand"><img var="brand-logo"/></div>';
            html += '</div>'
            html += '<div var="close-bar" class="close-bar" style="display: none">';
            html += '  <b var="close-bar.button">' + SVG.close + '</b>';
            html += '</div>';
            body.appendChild(Browser.DOM(html, UI));
            UI.catalog.effect = new TimeLine(1500, 33);
            UI.catalog.effect.addEventListener(EVENT.CHANGE, 'render', UI.catalog.effect);
            UI.catalog.effect.render = function(){
                var rect = UI.catalog.getBoundingClientRect();
                var width = UI.catalog.children[0].getBoundingClientRect().width;
                if (rect.width <= 600){
                    var cols = Math.floor(width / (130 + 16));
                    var rows = Math.ceil(rect.height / (164 + 16));
                } else {
                    var cols = Math.floor(width / (160 + 16));
                    var rows = Math.ceil(rect.height / (188 + 16));
                }
                // 130x 164
                
                var size = cols * rows;
                console.log(cols, rows);
                this.duration = size * 35 + 250 + 350;
                var children = UI.catalog.children;
                var iItem = 0;
                for (var iChild = 1; iChild < children.length; iChild++){
                    if (children[iChild].style.display != 'none' && iItem < size){
                        TimeLine.applyMatrix(children[iChild], {
                            y: Math.max(rect.height, 400) * (1 - this.getTime(iItem * 35 + 350, 250)),
                            opacity: this.getTime(iItem * 35 + 350, 250)
                        });
                        iItem++;
                    } else {
                        TimeLine.applyMatrix(children[iChild], null);
                    }
                }
            }
            UI.catalog.show = function(){
                this.effect.position = 0;
                this.effect.direction = 1;
                this.effect.play();
            }
            UI['catalog-close-button'].onclick = function(){
                catalogCloseEffect.position = catalogCloseEffect.duration;
                catalogCloseEffect.direction = -1;
                catalogCloseEffect.play();
                timeLine.position = 0;
                timeLine.direction = -1;

                blurEffect.blur({elements:['*'], delay: 0, direction: -1})
            }
            UI['catalog-logo'].src = 'https://cdn.gamepix.com/logo/' + SID + '/' + SID +'.png'
            UI['brand-logo'].src = 'https://cdn.gamepix.com/logo/' + SID + '/' + SID +'.png';

            var loader = new SVG_Loader();
            UI['loader-screen'].insertBefore(loader.holder, UI['loader-screen'].children[0]);
            
    
            var items = [];
            var CATALOG = {};
    
            var categories = [
                {name: 'All', icon: SVG.all, color: '#4666E2', items: []},
                {name: 'Adventure', icon: SVG.adventure, color: '#04BD68', items: []},
                {name: 'Arcade', icon: SVG.arcade, color: '#FFC11C', items: []},
                {name: 'Sports', icon: SVG.sports, color: '#4666E2', items: []},
                {name: 'Strategy', icon: SVG.strategy, color: '#8736FD', items: []},
                {name: 'Classics', icon: SVG.classics, color: '#1BBCEA', items: []},
                {name: 'Casino', icon: SVG.casino, color: '#F77D38', items: []},
                {name: 'Girls', icon: SVG.girls, color: '#ED80F3', items: []},
                {name: 'Puzzles', icon: SVG.puzzles, color: '#E20074', items: []}
            ]
            for (var iCat = 0; iCat < categories.length; iCat++){
                CATALOG[categories[iCat].name] = categories[iCat];
                var _UI = {};
                var html = '';
                html += '<li class="' + categories[iCat].name + '">'
                html += '  <u><i var="circle"></i>' + categories[iCat].icon + '</u>'
                html += '  <span var="label"><b var="label.text"></b></span>';
                html += '</li>';
    
                categories[iCat].html = Browser.DOM(html, _UI);
                categories[iCat].UI = _UI;
                if (iCat == 0){
                    categories[iCat].html.classList.add('selected');
                    ALL_CAT_BUTTON = categories[iCat].html;
                }
                categories[iCat].html.category = categories[iCat].name;
                categories[iCat].html.onclick = function(){
                    for (var iCat = 0; iCat < categories.length; iCat++){
                        if (categories[iCat].html == this){
                            categories[iCat].html.classList.add('selected');
                        } else {
                            categories[iCat].html.classList.remove('selected');
                        }
                    }
                    var items = CATALOG['All'].items;
                    for (var iItem = 0; iItem < items.length; iItem++){
                        items[iItem].html.style.display = 'none';
                    }
                    var items = CATALOG[this.category].items;
                    for (var iItem = 0; iItem < items.length; iItem++){
                        items[iItem].html.style.display = '';
                    }
                    UI.catalog.scrollTop = 0;
                    UI.catalog.show();

                }
                
                UI.categories.appendChild(categories[iCat].html);
                
                _UI.label.text.innerHTML = categories[iCat].name;
                //_UI.icon.style.fill = categories[iCat].color;
            }
    
            var showLoaderAnimation = new TimeLine(600, 33);
            showLoaderAnimation.addEventListener(EVENT.CHANGE, 'render', showLoaderAnimation);
            showLoaderAnimation.render = function(){
                if (this.mode == 'catalog'){
                    UI['catalog-container'].style.display = this.position < 400 ? '' : 'none';
                    UI['catalog-container'].style.opacity = 1 - this.getTime(0, 400);
                    if (this.direction == 1){
                        UI['loader-screen'].style.display = this.position > 200 ? '' : 'none';
                        UI['loader-screen'].style.opacity = this.getTime(200, 400);
                    } else {
                        if (this.gameOpen){
                            iframeGame.style.opacity = this.getTime(200, 400);
                            UI['close-bar'].style.opacity = this.getTime(200, 400);
                            iframeGame.style.display = (this.position > 200 ? '': 'none')
                            UI['close-bar'].style.display = (this.position > 200 ? '': 'none')
                        } else {
                            iframeGame.style.display = (this.position > 200 ? '': 'none')
                            UI['loader-screen'].style.display = this.position > 200 ? '' : 'none';
                            UI['loader-screen'].style.opacity = this.getTime(200, 400);
                        }
                    }
                }
                else if (this.mode == 'menu'){
                    if (this.direction == 1){
                        UI['loader-screen'].style.display = this.position > 200 ? '' : 'none';
                        UI['loader-screen'].style.opacity = this.getTime(200, 400);
                    } else {
                        if (this.gameOpen){
                            iframeGame.style.opacity = this.getTime(200, 400);
                            UI['close-bar'].style.opacity = this.getTime(200, 400);
                            iframeGame.style.display = (this.position > 200 ? '': 'none')
                            UI['close-bar'].style.display = (this.position > 200 ? '': 'none')
                        } else {
                            iframeGame.style.display = (this.position > 200 ? '': 'none')
                            UI['loader-screen'].style.display = this.position > 200 ? '' : 'none';
                            UI['loader-screen'].style.opacity = this.getTime(200, 400);
                        }
                    }
    
                    var animationValue = 1 - this.getTime(0, 200)
                    UI.button.icon.style.opacity = animationValue;
                    TimeLine.applyMatrix(UI.button, {x: 24 -(48 + 24) * animationValue});
                    for (var iItem = 0; iItem < items.length; iItem++){
                        var x = Math.cos((130 + 33.3 * (3 - iItem)) * Math.PI / 180) * 150 * animationValue + 48 * animationValue;
                        var y = Math.sin((130 + 33.3 * (3 - iItem)) * Math.PI / 180) * 150 * animationValue;
                        TimeLine.applyMatrix(items[iItem].htmlIcon, {x:x, y:y, opacity: animationValue});
                        
                        items[iItem].htmlIcon.style.display = (this.position > 200 ? 'none' : '');
                    }
                }
            }
            var showGameAnimation = new TimeLine(500, 33);
            showGameAnimation.addEventListener(EVENT.CHANGE, 'render', showGameAnimation);
            showGameAnimation.render = function(){
                UI['loader-screen'].style.opacity = 1 - this.getTime(0, 500);
                iframeGame.style.opacity =  this.getTime(0, 500);
                UI['close-bar'].style.opacity = this.getTime(0, 500);
                if (this.position == this.duration){
                    UI['loader-screen'].style.display = 'none';
                }
            }
            showGameAnimation.show = function(){
                //console.log("SHOW ANIMATION")
                showGameAnimation.position = 0;
                showGameAnimation.direction = 1;
                showGameAnimation.play();
                iframeGame.style.display = '';
                iframeGame.style.opacity = 0;
                UI['close-bar'].style.display = '';
                UI['close-bar'].style.opacity = 0;
            }
            UI['close-bar'].button.onclick = function(){
                closeIframe.show();
            }
            UI.loader.back.onclick = function(){
                showLoaderAnimation.direction = -1;
                showLoaderAnimation.play();
                showLoaderAnimation.gameOpen = false;
                iframeGame.setAttribute('src', 'about:blank');
                timeLineLoader.stop();
            }
    
            var timeLineLoader = new TimeLine( 15000, 33);
            timeLineLoader.addEventListener(EVENT.CHANGE, 'render', timeLineLoader);
            timeLineLoader.render = function(){
                if (LOADING_PERCENT != 0){
                    timeLineLoader.stop();
                    return false;
                }
                //console.log(this.position);
                loader.update(Math.max(this.position / 15000, 0));
                if (this.position == this.duration){
                    showGameAnimation.show();
                }
            }

            //closeIframe.
            //alert("6.1");
            function openGame(data, mode){
                // mode = [menu, catalog]
                //iframeGame.style.display = '';
                
                LOADING_PERCENT = 0;
                if (debug) {
                    data.url = data.url.replace('https://games.gamepix.com', 'https://gpx-api-dev-e-us-w-wa.azurewebsites.net');
                }
                iframeGame.setAttribute('src', data.url);
                //https://gpx-api-dev-e-us-w-wa.azurewebsites.net/play/${GID}?sid=110880
    
                UI.loader.gameLogo.src = data.thumbnailUrl;
                UI.loader.title.innerHTML = data.title;

                UI_Close.loader.gameLogo.src = data.thumbnailUrl;
                UI_Close.loader.title.innerHTML = data.title;
    
                showLoaderAnimation.mode = mode;
                showLoaderAnimation.position = 0;
                showLoaderAnimation.direction = 1;
                showLoaderAnimation.play();
    
                showGameAnimation.position = 0;
                
                loader.update(0);
                iframeGame.style.display = '';
                iframeGame.style.opacity = 0;
                
                
                timeLineLoader.position = 0;
                timeLineLoader.play();
                console.log("LOAD GAME", data)
            }
            var json = new JSON_Loader();
            json.load('https://games.gamepix.com/games?sid=' + SID)
            json.addEventListener(EVENT.COMPLETE, 'onData', json);
            json.onData = function(){
                console.log("loaded UI")
                console.log(UI, body.children)
                for (var iData = 0; iData < this.data.data.length; iData++){
                    CATALOG.All.items.push(this.data.data[iData]);
                    var categories = this.data.data[iData].categories;
                    for (var iCat = 0; iCat < categories.length; iCat++){
                        var category = categories[iCat];
                        CATALOG[category].items.push(this.data.data[iData]);
                    }
                    var html = '';
                    html += '<div class="game-item">';
                    html += '  <i var="img"></i>';
                    html += '  <span>';
                    html += '    <b var="title"></b>';
                    html += '    <u var="category"></u>';
                    html += '  </span>';
                    html += '</div>';
                    var game = Browser.DOM(html, _UI);
    
                    game.data = this.data.data[iData];
                    game.onclick = function(){
                        openGame(this.data, 'catalog');
                    }
                    //_UI.img.style.backgroundImage = 'url("' + this.data.data[iData].thumbnailUrl + '")';
                    _UI.img.style.backgroundImage = 'url("' + this.data.data[iData].thumbnailUrl + '")';
                    _UI.title.innerHTML = this.data.data[iData].title;
                    _UI.category.innerHTML = categories[0];
    
                    //preload 12 images
                    if (iData <= 12){
                        var img = new Image();
                        img.src = this.data.data[iData].thumbnailUrl;
                        img.style.display = 'none';
                        body.appendChild(img);
                    }
    
                    this.data.data[iData].html = game;
                    UI['catalog'].appendChild(game);
                }
                //console.log(CATALOG)
                items.push(this.data.data[Math.floor(this.data.data.length * Math.random())])
                items.push(this.data.data[Math.floor(this.data.data.length * Math.random())])
                items.push(this.data.data[Math.floor(this.data.data.length * Math.random())])
                for (var iItem = 0; iItem < items.length; iItem++){
                    var itemUI = {};
                    var html = '';
                    html += '<div class="game-icon">'
                    html += ' <span var="label"></span>'
                    html += ' <img var="img">';
                    html += '</div>'
                    var item = Browser.DOM(html, itemUI)
                    var title = items[iItem].title;
                    if (title.length > 17){
                        var words = title.split(' ');
                        var size = 0;
                        for (var iWord = 0; iWord < words.length; iWord++){
                            size += words[iWord].length + 1;
                            if (size > 17){
                                break;
                            }
                        }
                        title = words.slice(0, iWord).join(' ');
                    }
                    itemUI.label.innerHTML = title;
                    itemUI.img.src = items[iItem].thumbnailUrl100;
                    items[iItem].htmlIcon = item;
                    item.UI = itemUI;
                    item.data = items[iItem];
                    item.onclick = function(){
                        openGame(this.data, 'menu');
                    }
                    body.appendChild(item);
                }
            
                var itemUI = {};
                var html = '';
                html += '<div class="plus-game-icon">'
                html += ' <span var="label">More Games</span>'
                html += ' <b>' + SVG.plus + '</b>';
                html += '</div>'
                var item = Browser.DOM(html, itemUI)
                item.onclick = function(){
                    //UI['catalog-container'].style.display = '';
                    ALL_CAT_BUTTON.onclick();
                    catalogShowEffect.direction = -1;
                    catalogShowEffect.position = catalogShowEffect.duration;
                    catalogShowEffect.play();

                    UI.catalog.show();
                };
                items.push({htmlIcon:item});
                item.UI = itemUI;
                body.appendChild(item);
            }
    
        }
        


        
    }
    if (document.body){
        start();
    } else {
        addEvent(window, 'load', start)
    }
})();
    

/*
function init() {
    //////// 1) Create the iframe that will contains the game ////////
    var iframe = document.createElement('iframe');
    iframe.id = 'game-frame';
    iframe.src = 'https://games.gamepix.com/play/40071?sid=110880';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('name', window.location.href);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('scrolling', 'no');
    iframe.style.top = '0%';
    iframe.style.left = '0%';
    iframe.style.position = 'absolute';
    //////// 2) Create the parent-child communication ////////
    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
    // Listen to message from child window
    eventer(messageEvent, function(e) {
        console.log(e);
    switch (e.data.type) {
    case 'loading':
    // this event may not arrives linear
    // e.g. not all values from 0 to 100 may be sent
    loading(e.data.percentage);
    break;
    case 'loaded':
    iframe.contentWindow.postMessage({
        message: 'callbackExecuted'
        }, e.data.url);

    break;
    case 'send':
    sendScore({
    type: e.data.label,
    level: e.data.level,
    score: e.data.score
    });
    break;
    }
    }, false);
    document.getElementsByTagName('body')[0].appendChild(iframe);
    globalIframe = iframe;
    }*/