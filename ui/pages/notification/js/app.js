$(() => {
    // $(`#${data.id}-cnt`).addClass('scale-in')

    avg.on('remove', json => {
        var data = JSON.parse(json)

        $(`#${data.id}-cnt`).addClass('scale-out')
        $(`#${data.id}-cnt`).removeClass('scale-in')
        
        setTimeout(() => {
            $(`#${data.id}`).remove();
        }, data.fadeOutDuration)

        // $(`#${data.id}`).fadeOut(0, () => {
        //     $(`#${data.id}`).remove();
        // })
    })

    avg.on('show', json => {
        avg.show()
    })

    avg.on('hide', json => {
        avg.hide()
    })

    avg.on('create', json => {
        var data = JSON.parse(json)
        var result = `<li id="${data.id}" class="notification">
                        <div id="${data.id}-cnt" class="notification-cnt">
                            <div id="${data.id}-ico" class="ico" style="background-image: url(${data.ico});"></div>
                            <div class="info-cnt">
                                <span id="${data.id}-text" class="text">${data.count}</span>
                            </div>
                        </div>
                    </li>`

        $('#notification-list').append(result)
        $(`#${data.id}-notification`).fadeIn(data.fadeInDuration)
        $(`#${data.id}-cnt`).removeClass('scale-out')
        $(`#${data.id}-cnt`).addClass('scale-in')
    })
})