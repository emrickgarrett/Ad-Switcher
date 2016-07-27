!function(a){"function"==typeof define?define(a):"undefined"!=typeof module?module.exports=a:this.qwest=a}(function(){var win=window,limit=null,requests=0,request_stack=[],getXHR=function(){return win.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},version2=""===getXHR().responseType,qwest=function(method,url,data,options,before){data=data||null,options=options||{};var typeSupported=!1,xhr=getXHR(),async=void 0===options.async?!0:!!options.async,cache=options.cache,type=options.type?options.type.toLowerCase():"json",user=options.user||"",password=options.password||"",headers={},accepts={xml:"application/xml, text/xml",html:"text/html",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},toUpper=function(a,b,c){return b+c.toUpperCase()},vars="",i,j,parseError="parseError",serialized,success_stack=[],error_stack=[],complete_stack=[],response,success,error,func,promises={success:function(a){return async?success_stack.push(a):success&&a.apply(xhr,[response]),promises},error:function(a){return async?error_stack.push(a):error&&a.apply(xhr,[response]),promises},complete:function(a){return async?complete_stack.push(a):a.apply(xhr),promises}},promises_limit={success:function(a){return request_stack[request_stack.length-1].success.push(a),promises_limit},error:function(a){return request_stack[request_stack.length-1].error.push(a),promises_limit},complete:function(a){return request_stack[request_stack.length-1].complete.push(a),promises_limit}},handleResponse=function(){var i,req,p;if(--requests,request_stack.length){for(req=request_stack.shift(),p=qwest(req.method,req.url,req.data,req.options,req.before),i=0;func=req.success[i];++i)p.success(func);for(i=0;func=req.error[i];++i)p.error(func);for(i=0;func=req.complete[i];++i)p.complete(func)}try{if(!/^2/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";var responseText="responseText",responseXML="responseXML";if(typeSupported&&void 0!==xhr.response)response=xhr.response;else switch(type){case"json":try{response=win.JSON?win.JSON.parse(xhr[responseText]):eval("("+xhr[responseText]+")")}catch(e){throw"Error while parsing JSON body"}break;case"js":response=eval(xhr[responseText]);break;case"xml":if(!xhr[responseXML]||xhr[responseXML][parseError]&&xhr[responseXML][parseError].errorCode&&xhr[responseXML][parseError].reason)throw"Error while parsing XML body";response=xhr[responseXML];break;default:response=xhr[responseText]}if(success=!0,async)for(i=0;func=success_stack[i];++i)func.apply(xhr,[response])}catch(e){if(error=!0,response="Request to '"+url+"' aborted: "+e,async)for(i=0;func=error_stack[i];++i)func.apply(xhr,[response])}if(async)for(i=0;func=complete_stack[i];++i)func.apply(xhr)};if(limit&&requests==limit)return request_stack.push({method:method,url:url,data:data,options:options,before:before,success:[],error:[],complete:[]}),promises_limit;if(++requests,win.ArrayBuffer&&(data instanceof ArrayBuffer||data instanceof Blob||data instanceof Document||data instanceof FormData))"GET"==method&&(data=null);else{var values=[],enc=encodeURIComponent;for(i in data)void 0!==data[i]&&values.push(enc(i)+(data[i].pop?"[]":"")+"="+enc(data[i]));data=values.join("&"),serialized=!0}if("GET"==method&&(vars+=data),null==cache&&(cache="POST"==method),cache||(vars&&(vars+="&"),vars+="__t="+Date.now()),vars&&(url+=(/\?/.test(url)?"&":"?")+vars),xhr.open(method,url,async,user,password),type&&version2)try{xhr.responseType=type,typeSupported=xhr.responseType==type}catch(e){}version2?xhr.onload=handleResponse:xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()};for(i in headers)j=i.replace(/(^|-)([^-])/g,toUpper),headers[j]=headers[i],delete headers[i],xhr.setRequestHeader(j,headers[j]);return!headers["Content-Type"]&&serialized&&"POST"==method&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),headers.Accept||xhr.setRequestHeader("Accept",accepts[type]),before&&before.apply(xhr),xhr.send("POST"==method?data:null),promises};return{get:function(a,b,c,d){return qwest("GET",a,b,c,d)},post:function(a,b,c,d){return qwest("POST",a,b,c,d)},xhr2:version2,limit:function(a){limit=a}}}());

(function(){

	//Replace the following HTML images
	var replaceTags = 'iframe, img, embed';

	//time before ads removed
	var delay = .5; // 1 Second

	var ads = [
	{
      'name': '728x90',
      'width': 728,
      'height': 90,
      'url': 'http://i0.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117'
    },
    {
      'name': '970x90',
      'width': 970,
      'height': 90,
      'url': 'http://i0.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117'
    },
    {
      'name': '300x250',
      'width': 300,
      'height': 250,
      'url': 'http://i0.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117'
    },
    {
      'name': '250x250',
      'width': 250,
      'height': 250,
      'url': 'http://i0.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117'
    },
    {
      'name': '160x600',
      'width': 160,
      'height': 600,
      'url': 'http://i0.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117'
    },
    {
      'name': '336x280',
      'width': 336,
      'height': 280,
      'url': 'http://i0.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117'
    },
    {
      'name': '125x125',
      'width': 125,
      'height': 125,
      'url': 'http://i0.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117'
    }

	]


	//Ad ID's that we can block
	var adIds = [
		{
			id: 'google_companion_ad_div',
			width: 300,
			height: 250
		},
		{
			id: '200_145_express_html_inpage_0.if',
			width: 160,
			height: 600
		},
		{
			id: 'ad_iframe',
			width:160,
			height:600
		}
	];

	function getAd(images){
		return images[Math.floor(Math.random() * images.length)];
	}


	function generateAds(adWidth, adHeight, adImage){
		var body, allAds, matchingAd;

		// Search body for tag
		body = document.getElementsByTagName('body');
		if(!body || !body.length) return;
		body = body[0];

		//Get tags that we want to replace at this size
		allAds = body.querySelectorAll(replaceTags);

		Array.prototype.forEach.call(adIds, function(data, i){
			var elem = null;

			if(data.width !== adWidth || data.height != adHeight){
				return;
			}

			elem = document.getElementById(data.id);
			if(elem && adImage){
				elem.outerHTML = '<div style="width:' + adWidth + 'px; height: ' + adHeight + 'px; background: url(' + adImage + '); no-repeat fixed; -webkit-background-size: cover; border: 1px dashed #333"></div>';
			}
			if(elem){
				matchingAd = true;
			}
		});

		if(!adWidth)
			adWidth = adImage.width;
		if(!adHeight)
			adHeight = adImage.Height;

		Array.prototype.forEach.call(allAds, function(d, i){
			if(d.offsetWidth == adWidth && d.offsetHeight == adHeight){
				matchingAd = true;
				if(adImage){
					d.outerHTML = '<div style="width:'+adWidth+'px; height:'+adHeight+'px; background: url(' + adImage + '); no-repeat fixed; -webkit-background-size: cover; border: 1px solid #ddd"></div>';
				}
			}
		});

		return !!matchingAd;
	}

	function replaceAds(adData){
		
		generateAds(adData.width, adData.height, adData.url);
	}


	chrome.storage.sync.get('disabled', function(value){
		if(!value.disabled){
			setTimeout(function(){
				ads.forEach(function(adData){
					if(generateAds(adData.width, adData.height)){
						replaceAds(adData);
					}
				});
			}, delay * 1000);
		}
	});

	setTimeout(function(){
				ads.forEach(function(adData){
					if(generateAds(adData.width, adData.height)){
						replaceAds(adData);
					}
				});
			}, delay * 1000);

})();