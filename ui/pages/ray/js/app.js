$(() => {
    $("#ray").fadeOut(0)
    $("#crossair").fadeOut(0)
    $("#container").fadeOut(0)

    avg.on('open', data => {
        avg.show()

        $("#ray").fadeIn(100, () => {
            // avg.focus()
        })
    })

    avg.on('close', data => {
        $("#ray").fadeOut(100, () => {
            avg.hide()
        })
    })

    avg.on('crossair', data => {
        $("#crossair").fadeTo(data.fade, data.isVisible ? 1 : 0);
    })

    avg.on('visibility', data => {
        if(data.isVisible) {
            $("#container").fadeIn(data.fade);
        } else {
            $("#container").fadeOut(data.fade);
        }
    })

    avg.on('render', data => {
        onRender(data.items)
    })

    avg.on('render_item', data => {
        onRenderItem(data.item)
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

            if(option.IsVisible) {
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

    function onRenderItem(item) {
        $(`#${item.id}-text`).text(item.text)
        $(`#${item.id}-emoji`).text(item.emoji)
    }

    function addEventHandler(option) {
        $("#" + option.Id).click(function (event) {
            $.post(`https://avg/ray/on_click`, JSON.stringify({
                id: option.Id
            }))
        })
    }
})