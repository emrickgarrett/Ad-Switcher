var lastUpdate = null;
chrome.storage.local.get(["lastUpdate"], function(items){
    if(chrome.runtime.lastError){
    	//Error

    	return;
    }else{
    	lastUpdate = items.lastUpdate;
    	//alert(lastUpdate);
    }

    //If it hasn't updated in an hour, redownload the file.
	//if(lastUpdate == null || lastUpdate === undefined || lastUpdate < new Date().getTime() - 1000*60*60*24){
		
		downloadData();
	//}
});


function downloadData(){
	/*	Removed For now, Might not Need to download
	chrome.downloads.download({
		url: "https://easylist.to/easylist/easylist.txt",
		filename: "Ad-Switcher/easylist.txt",
		conflictAction: "overwrite"
	});*/

	retrieveEasyList();


	chrome.storage.local.set({ "lastUpdate": "" + new Date().getTime() }, function(){
	    //  Data is saved, continue
	});

}

function getEasyList(){
	chrome.storage.local.get(["easylist"], function(items){
		if(chrome.runtime.lastError){
			//Error
			console.log("Problem retrieving the Ad-Blocker list for the Ad-Switcher");
			return null;
		}else{
			if(items.easylist == null){
				downloadData();
				return getEasyList();
			}
			return items.easylist;
		}
	});
}

function storeEasyList(data){
		chrome.storage.local.set({"easylist" : data}, function(){
		if(chrome.runtime.lastError){
			console.log("Problem storing the Ad-Blocker list for the Ad-Switcher");
		}
		// Data saved!
		console.log("Data_saved");
		getEasyList();
	})
}

function formatEasyList(result){
	// Convert easy list to json
	
	var json = JSON.parse(result);

	alert(json);

	return json;
}


function retrieveEasyList(){
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "https://easylist.to/easylist/easylist.txt");
	xmlhttp.onreadystatechange = function(){
		var result = xmlhttp.responseText;
		console.log(result);
		storeEasyList(formatEasyList(result));
	}
	xmlhttp.send();
}

/** Method to listen for calls from content scripts **/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	var resp = sendResponse;
    if (request.method == "getList"){
    	easyList = getEasyList();
    	console.log(easyList);
    	resp({result: easyList});
    }
    return true;
});
