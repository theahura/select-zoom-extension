(function() {
	var settings = {
		enabled: true,
		fontSize: '50px',
		color: 'rgb(220, 220, 220)'
	};

	function updateSettings(updatedSettings) {
		console.log(updatedSettings);
		if (typeof updatedSettings.enabled !== 'undefined')
			settings.enabled = updatedSettings.enabled;
		if (updatedSettings.fontSize)
			settings.fontSize = updatedSettings.fontSize;
		if (updatedSettings.color)
			settings.color = updatedSettings.color;

		var action_obj = {
			action: 'updateSettings',
			settings: settings
		};

		chrome.tabs.query({}, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, action_obj);
			}
		});

		chrome.storage.sync.set({'settings': settings});
	}

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) { 
			if (request.action === 'getSettings')
				sendResponse(settings);
		}
	);

	chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.action === 'updateSettings')
				updateSettings(request);
		}
	);
})();
