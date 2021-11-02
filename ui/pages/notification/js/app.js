$(() => {
    $('#${data.id}-cnt').addClass('scale-in')

    avg.on('notification.remove', json => {
        var data = JSON.parse(json)

        $(`#${data.id}-cnt`).removeClass('scale-in')
        $(`#${data.id}-cnt`).addClass('scale-out')
        $(`#${data.id}`).fadeOut(600, () => {
            $(`#${data.id}`).remove();
        })
    })

    avg.on('notification.open', json => {
        avg.show()
    })

    avg.on('notification.hide', json => {
        avg.hide()
    })

    avg.on('notification.create', json => {
        var data = JSON.parse(json)
        var result = `<li id="${data.id}" class="notification">
                        <div style="height: 100%; display: flex; justify-content: flex-start; align-items: center;">
                            <div id="${data.id}-notification-title" class="notification-title">${data.title}</div>
                        </div>
                        <div style="height: 100%; display: flex; justify-content: flex-start; align-items: flex-start;">
                            <div id="${data.id}-notification-contents" class="notification-description">
                                <span>${data.content}</span>
                            </div>
                        </div>
                        <div class="d-flex jst-cnt" style="height: 100%;">
                            <div style="width: 90%; height: 7px;">
                                <div class="notification-progressbar">
                                    <div id="${data.id}-notification-progressbar" class="notification-progressbar-foreground"></div>
                                </div>
                            </div>
                        </div>
                    </li>`

        $('#notification-list').append(result)
        $(`#${data.id}-notification`).fadeIn(0)
        $(`#${data.id}-cnt`).removeClass('scale-out')
        $(`#${data.id}-cnt`).addClass('scale-in')
    })
})