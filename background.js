(function() {
	var enabled = true;

	chrome.browserAction.onClicked.addListener(function() { 
		chrome.tabs.query({}, function(tabs) {
			enabled = !enabled;
			var action = {action: 'toggle', value: enabled};
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, action);
			}

			if (!enabled) 
				alert("Disabled vision zoom.");
			else 
				alert("Enabled vision zoom.");
		});
	});

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) { 
			sendResponse(enabled);
		}
	);
})();
