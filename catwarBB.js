// ==UserScript==
// @name         ajax send_comment_form imgbb
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nei
// @match        https://catwar.su/sniff*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=catwar.su
// @grant        none
// @license MIT
// ==/UserScript==

(function() {
    let send_comment_form = document.querySelector("#send_comment_form");
    if (send_comment_form) {
        let NewButton = document.createElement("input");
        NewButton.innerHTML = "Загрузить картинку";
        NewButton.type = "file";
        NewButton.id = "input_img";
        NewButton.accept = "image/*";
        send_comment_form.after(NewButton);
        NewButton.onchange = function () {
            let file = document.getElementById('input_img');
            let form = new FormData();
            form.append("image", file.files[0])

            let settings = {
                "url": "https://api.imgbb.com/1/upload?key=60ae43cbf0d1e0743eb6b7d204f75e9d",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function (response) {
                let jx = JSON.parse(response);
                document.querySelector("#comment").value += "[img]" + jx.data.url + "[/img]"

            });
            $.ajax(settings).error(function (error) {
                document.querySelector("#comment").value += "ошибка загрузки картинки"

            });

        };
    }
})();
