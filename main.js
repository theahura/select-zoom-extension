(function() {
	function getSelectionText() {
		var text = "";
		var activeEl = document.activeElement;
		var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
		if (
			(activeElTagName == "textarea") || (activeElTagName == "input" &&
				/^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
			(typeof activeEl.selectionStart == "number")
		) {
			text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
		} else if (window.getSelection) {
			text = window.getSelection().toString();
		}
		return text;
	}

	function updateSettings(updatedSettings) {
		console.log(updatedSettings);
		if (!updatedSettings.enabled)
			$('#selectZoomHover').hide();
		else if (getSelectionText())
			$('#selectZoomHover').show();
		$('#selectZoomHover').css({
			'background-color': updatedSettings.color,
			'font-size': parseInt(updatedSettings.fontSize)
		});
	}

	// Main starts after getting settings from the settings bar.
	chrome.runtime.sendMessage({action: 'getSettings'}, function(response) {
		var settings = response;

		// Update the settings as needed.
		chrome.runtime.onMessage.addListener(function(request, sender) { 
			if (request.action && request.action === 'updateSettings') {
				settings = request.settings;
				updateSettings(settings);
			}
		});

		// Get and show selected text.
		document.onmouseup = document.onkeyup = document.onselectionchange = function() {
			var selectedText = getSelectionText();
			if (selectedText) {
				$('#selectZoomHover p').html(selectedText);
				if (settings.enabled)
					$('#selectZoomHover').show();
			} else {
				$('#selectZoomHover').hide();
			}
		};

		$('body').append('<div id="selectZoomHover"><p></p></div>');
		$('#selectZoomHover').draggable();
		$('#selectZoomHover').resizable();
		$('#selectZoomHover').css('z-index', '10000');

		updateSettings(settings);
	});

})();
