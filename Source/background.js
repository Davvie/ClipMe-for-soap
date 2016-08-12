chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {
            message: "ClipMeHistoryDidChange"
        });
    });
}, {
    url: [{
        'hostContains': 'soap4.me'
    }]

})
