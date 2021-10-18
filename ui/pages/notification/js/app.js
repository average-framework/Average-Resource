$(() => {
    avg.on('notification.remove', data => {
        $(`#${data.id}`).fadeOut(250, () => {
            $(`#${data.id}`).remove();
        })
    })

    avg.on('notification.open', data => {
        avg.show()
    })

    avg.on('notification.hide', data => {
        avg.hide()
    })

    avg.on('notification.create', data => {
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
        $(`#${data.id}-notification`).fadeIn(250)
        $(`#${data.id}-notification-progressbar`).animate({
            width: `100%`
        }, data.duration, "swing")
    })
})