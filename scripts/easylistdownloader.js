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
	if(lastUpdate == null || lastUpdate === undefined || lastUpdate < new Date().getTime() - 1000*60*60*24){
		
		var request = {type: "lastUpdate", data: lastUpdate + ""};
		downloadData();
	}
});


function downloadData(){
	chrome.downloads.download({
		url: "https://easylist.to/easylist/easylist.txt",
		filename: "Ad-Switcher/easylist.txt",
		conflictAction: "overwrite"
	});

	retrieveEasyList();


	chrome.storage.local.set({ "lastUpdate": "" + new Date().getTime() }, function(){
	    //  Data is saved, continue
	});

}

function getEasyList(){
	chrome.storage.local.get(["easylist"], function(items){
		if(chrome.runtime.lastError){
			//Error
			alert("error");
			return null;
		}else{
			alert("Item: " + items.easylist);
			return items.easylist;
		}
	});
}

function storeEasyList(data){
		chrome.storage.local.set({"easylist" : data}, function(){
			if(chrome.runtime.lastError){
				alert("error");
			}
		// Data saved!
		console.log("Data_saved");
		getEasyList();
	})
}


function retrieveEasyList(){
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "https://easylist.to/easylist/easylist.txt");
	xmlhttp.onreadystatechange = function(){
		var result = xmlhttp.responseText;
		//console.log(result);
		storeEasyList(result);
	}
	xmlhttp.send();
}