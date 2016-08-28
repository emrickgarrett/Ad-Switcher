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


	//Ad ID's that we can block, replace with my list
	var adIds = retrieveAdList();
	/*[
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
	];*/

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

			// Probably remove/edit, looking for ads that match a specific height/width to replace
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
			startAdReplacement();
		}
	});

	function startAdReplacement(){
		if(adIds == null || typeof adIds == "undefined"){
			setTimeout(startAdReplacement(), 500);
		}
		else{
			useAds();
		}
	}

	function useAds(){
		setTimeout(function(){
				ads.forEach(function(adData){
					if(generateAds(adData.width, adData.height)){
						replaceAds(adData);
					}
				});
			}, delay * 1000);
	}



	/***** Function to get easy list from downloader *******/

	function retrieveAdList(){
		var list = null;
		var attempts = 0;
		var adRetrievalDelay = 500;
		var maxAttempts = 900;

		var grabId = setInterval(function(){

			console.log("Trying...");
			if(getList() == null || typeof getList() == "undefined"){
				listGrab();
			}else{
				console.log("Got the list!");
				clearInterval(grabId);
			}

		}, adRetrievalDelay);

		
	}
	
	function listGrab(){
		chrome.runtime.sendMessage(
		{method: "getList"}, 
		function(response){
			//callback
			console.log(response);
			setList(response);
		});
	}

	function setList(list){
		adIds = list;
	}

	function getList(){
		return adIds;
	}

})();