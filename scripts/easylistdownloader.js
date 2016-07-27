var lastUpdate = null;
chrome.storage.local.get(["lastUpdate"], function(items){
    if(chrome.runtime.lastError){
    	//Error

    	return;
    }else{
    	lastUpdate = items.lastUpdate;
    	alert(lastUpdate);
    }

    //If it hasn't updated in an hour, redownload the file.
	if(lastUpdate == null || lastUpdate === undefined || lastUpdate < Date.Now() - 1000*60*60*24){
		
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

	chrome.storage.local.set({ "lastUpdate": "" + Date.Now() }, function(){
	    //  Data is saved, continue
	});

}