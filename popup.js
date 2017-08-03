$('.enabled').change(function() {
	console.log($(this).is(':checked'));
	chrome.extension.sendMessage({
		action: 'updateSettings',
		enabled: $(this).is(':checked'),
	});
});

$('.color').on('input', function() {
	chrome.extension.sendMessage({
		action: 'updateSettings',
		color: $(this).val(),
	});

	console.log($(this).val());
});

$('.font-size').on('input', function() {
	chrome.extension.sendMessage({
		action: 'updateSettings',
		fontSize: $(this).val(),
	});

	console.log($(this).val());
});


chrome.storage.sync.get(['settings'], function(response) {
	settings = response.settings;
	if (settings) {
		$('.color').val(settings.color);
		$('.font-size').val(settings.fontSize);
		$('.enabled').prop('checked', settings.enabled);
	}
});
