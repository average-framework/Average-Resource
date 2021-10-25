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
        console.log("render items: " + data.items)
        onRender(data.items)
    })

    document.addEventListener('keydown', function (event) {
        $.post("https://avg/ray/keydown", JSON.stringify({
            key: event.keyCode
        }))
    })

    function onRender(options) {
        $("#container").empty();

        console.log("on render: " + JSON.stringify(options))

        for (var i = 0; i < options.length; i++) {
            var option = options[i]

            if (option.IsVisible) {
                $("#container").append(
                    `<li id="${option.Id}">
                        <a>
                            <span id="${option.Id}-emoji" class="emoji">${option.Emoji}</span><h1 id="${option.Id}-text">${option.Text}</h1>
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