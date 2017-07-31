(function() {
	chrome.browserAction.onClicked.addListener(function() { 
		chrome.tabs.query({}, function(tabs) {
			var action = {action: 'toggle'}
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, action)
			}
		});
	});
})();
