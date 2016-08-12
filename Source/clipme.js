chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (request.message == "ClipMeHistoryDidChange") {
            main(window, jQuery);
        }
    });

function main(window, $, undefined) {

    function copyToClipboard(text) {
        var textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    }

    var cssLoc = chrome.extension.getURL("clipme.css");
    $('<link rel="stylesheet" type="text/css" href="' + cssLoc + '" >').appendTo("head");

    $('.play.pointer.tip').after('<a id="clipme-copy" href="javascript:void(0);"><div class="clipme">cp</div></a>');

    $('#clipme-copy div').on('click', function() {

        var selectedItem = $(this).parent().prev('div')
        var token = $("#token").attr("data:token")
        var eid = selectedItem.attr("data:eid")
        var sid = selectedItem.attr("data:sid")
        var fileHash = selectedItem.attr("data:hash")
        var hash = md5(token + eid + sid + fileHash)

        $.post("/callback/", {
            what: "player",
            do: "load",
            token: token,
            eid: eid,
            hash: hash
        }, function(response) {
            if (!response.ok) {
                alert("Не удалось скопировать ссылку")
            } else {
                var url = "https://" + response.server + ".soap4.me/" + token + "/" + eid + "/" + hash + "/"
                copyToClipboard(url)
            }
        }, "json")

    });


}

main(window, jQuery);
