$(() => {
    $("#ray").fadeOut(0)
    $("#crossair").fadeOut(0)
    $("#container").fadeOut(0)

    avg.on('open', json => {
        avg.show()

        $("#ray").fadeIn(100, () => {
            // avg.focus()
        })
    })

    avg.on('close', json => {
        $("#ray").fadeOut(100, () => {
            avg.hide()
        })
    })

    avg.on('crossair', json => {
        var data = JSON.parse(json)
        $("#crossair").fadeTo(data.fade, data.isVisible ? 1 : 0);
    })

    avg.on('visibility', json => {
        var data = JSON.parse(json)
        if (data.isVisible) {
            $("#container").fadeIn(data.fade);
        } else {
            $("#container").fadeOut(data.fade);
        }
    })

    avg.on('render', json => {
        var data = JSON.parse(json)
        onRender(data.items)
    })

    document.addEventListener('keydown', function (event) {
        $.post("https://avg/ray/keydown", JSON.stringify({
            key: event.keyCode
        }))
    })

    function onRender(options) {
        $("#container").empty();

        for (var i = 0; i < options.length; i++) {
            var option = options[i]

            if (option.IsVisible) {
                // $("#container").append(
                //     `<li id="${option.Id}">
                //         <a>
                //             <div style="display: flex; justify-content: center; align-items: center;">
                //                 <span id="${option.Id}-emoji" class="emoji">${option.Emoji}</span>
                //                 <h1 id="${option.Id}-text">${option.Text}</h1>
                //             </div>
                //         </a>
                //     </li>`)

                $("#container").append(
                    `<li id="${option.Id}">
                        <a>
                            <div style="display: flex; justify-content: center; align-items: center; margin-top: 8px;">
                                <h1 id="${option.Id}-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 23px;">${option.Text}</h1>
                            </div>
                        </a>
                    </li>`)

                addEventHandler(option);
            }
        }
    }

    function addEventHandler(option) {
        $("#" + option.Id).click(function (event) {
            console.log("ray click: " + JSON.stringify(option))
            $.post(`https://avg/ray/on_click`, JSON.stringify({
                id: option.Id
            }))
        })
    }
})