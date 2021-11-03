$(() => {
    avg.on('remove', json => {
        var data = JSON.parse(json)

        switch (data.type) {
            case "NotificationIcoModel":
                $(`#${data.id}-ico-cnt`).removeClass('scale-ico-in')
                $(`#${data.id}-ico-cnt`).addClass('scale-ico-out')
                break;
            case "NotificationStoreModel":
                $(`#${data.id}-store-cnt`).removeClass('scale-store-in')
                $(`#${data.id}-store-cnt`).addClass('scale-store-out')
                break;
            case "NotificationHelpTextModel":
                $(`#${data.id}-helptext-cnt`).removeClass('scale-helptext-in')
                $(`#${data.id}-helptext-cnt`).addClass('scale-helptext-out')
                break;
        }

        console.log("remove not: " + json)

        setTimeout(() => {
            $(`#${data.id}`).remove();
        }, data.fadeOutDuration)
    })

    avg.on('show', json => {
        avg.show()
    })

    avg.on('hide', json => {
        avg.hide()
    })

    avg.on('create', json => {
        var data = JSON.parse(json)

        console.log("create: " + json)

        switch (data.type) {
            case "NotificationIcoModel":
                $('#notification-right-cnt').append(getIcoNotification(data))
                $(`#${data.id}-notification`).fadeIn(data.fadeInDuration)
                $(`#${data.id}-ico-cnt`).removeClass('scale-ico-out')
                $(`#${data.id}-ico-cnt`).addClass('scale-ico-in')
                break;
            case "NotificationStoreModel":
                $('#notification-right-cnt').append(getStoreNotification(data))
                $(`#${data.id}-notification`).fadeIn(data.fadeInDuration)
                $(`#${data.id}-store-cnt`).removeClass('scale-store-out')
                $(`#${data.id}-store-cnt`).addClass('scale-store-in')
                break;
            case "NotificationHelpTextModel":
                $('#notification-left-cnt').append(getHelpTextNotification(data))
                $(`#${data.id}-notification`).fadeIn(data.fadeInDuration)
                $(`#${data.id}-helptext-cnt`).removeClass('scale-helptext-out')
                $(`#${data.id}-helptext-cnt`).addClass('scale-helptext-in')
                break;
        }
    })

    function getIcoNotification(data) {
        return `<li id="${data.id}" class="notification">
                    <div id="${data.id}-ico-cnt" class="notification-ico-cnt">
                        <div id="${data.id}-ico" class="ico" style="background-image: url(${data.ico});"></div>
                        <div class="info-cnt">
                            <span id="${data.id}-text">${data.count}</span>
                        </div>
                    </div>
                </li>`
    }

    function getStoreNotification(data) {
        return `<li id="${data.id}" class="notification">
                    <div id="${data.id}-store-cnt" class="notification-store-cnt">
                        <span id="${data.id}-text" class="text">${data.text}</span>
                    </div>
                </li>`
    }
    
    function getHelpTextNotification(data) {
        return `<li id="${data.id}" class="notification">
                    <div id="${data.id}-helptext-cnt" class="notification-helptext-cnt">
                        <span id="${data.id}-text" class="helptext-text">${data.text}</span>
                    </div>
                </li>`
    }
})