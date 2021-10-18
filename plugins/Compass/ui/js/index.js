$(() => {
    avg.on('compass.show', data => {
        avg.show()
        // avg.focus()
        $("#compass").fadeIn(200)
    })

    avg.on('compass.hide', data => {
        $("#compass").fadeOut(200, () => {
            avg.hide()
        })
    })

    avg.on('compass.time', data => {
        $('#compass-time').text(data.value)
    })

    avg.on('compass.set_rotation', data => {
        switch (data.type) {
            case "border":
                $('#compass-border').css({
                    "transform": `rotate(${data.rotation}rad)`
                })
                break;
            case "waypoint":
                $('#compass-player-cursor').css({
                    "transform": `rotate(${data.rotation}rad)`
                })
                break;
        }
    })

    avg.on('compass.set_visibility', data => {
        switch (data.type) {
            case "player":
                if (data.value) {
                    $('#compass-player-health-container').delay(100).fadeIn(data.duration)
                    $('#compass-player-hunger-container').delay(200).fadeIn(data.duration)
                    $('#compass-player-thirst-container').delay(300).fadeIn(data.duration)
                    $('#compass-player-stamina-container').delay(400).fadeIn(data.duration)
                    $('#compass-player-micro-container').delay(500).fadeIn(data.duration)
                    $('#compass-player-hemorrhage-container').delay(600).fadeIn(data.duration)
                } else {
                    $('#compass-player-health-container').delay(600).fadeOut(data.duration)
                    $('#compass-player-hunger-container').delay(500).fadeOut(data.duration)
                    $('#compass-player-thirst-container').delay(400).fadeOut(data.duration)
                    $('#compass-player-stamina-container').delay(300).fadeOut(data.duration)
                    $('#compass-player-micro-container').delay(200).fadeOut(data.duration)
                    $('#compass-player-hemorrhage-container').delay(100).fadeOut(data.duration)
                }
                break;
            case "horse":
                if (data.value) {
                    $('#compass-horse-health-container').delay(100).fadeIn(data.duration)
                    $('#compass-horse-hunger-container').delay(200).fadeIn(data.duration)
                    $('#compass-horse-thirst-container').delay(300).fadeIn(data.duration)
                    $('#compass-horse-stamina-container').delay(400).fadeIn(data.duration)
                } else {
                    $('#compass-horse-health-container').delay(400).fadeOut(data.duration)
                    $('#compass-horse-hunger-container').delay(300).fadeOut(data.duration)
                    $('#compass-horse-thirst-container').delay(200).fadeOut(data.duration)
                    $('#compass-horse-stamina-container').delay(100).fadeOut(data.duration)
                }
                break;
        }
    })

    avg.on('compass.set_info', data => {
        switch (data.infoType) {
            case "player_hunger":
                $('#compass-player-hunger').css({
                    "clip": `rect(${data.value * 20}px, 20px, 20px, 0px)`
                })
                break;
            case "player_thirst":
                $('#compass-player-thirst').css({
                    "clip": `rect(${data.value * 20}px, 20px, 20px, 0px)`
                })
                break;
            case "player_stamina":
                $('#compass-player-stamina').css({
                    "clip": `rect(${data.value * 22}px, 22px, 22px, 0px)`
                })
                break;
            case "player_health":
                $('#compass-player-health').css({
                    "clip": `rect(${data.value * 20}px, 20px, 20px, 0px)`
                })
                break;
            case "player_micro":
                if (data.mute) {
                    $('#compass-player-micro').css({
                        "filter": "invert(9%) sepia(89%) saturate(4393%) hue-rotate(356deg) brightness(90%) contrast(98%)"
                    })
                } else {
                    $('#compass-player-micro').css({
                        "filter": "invert(1)"
                    })
                }
                $('#compass-player-micro').css({
                    "clip": `rect(${data.value * 18}px, 18px, 18px, 0px)`
                })
                break;
            case "player_hemorrhage":
                if (data.visible) {
                    $('#compass-player-hemorrhage-container').fadeTo(data.duration, 1)
                } else {
                    $('#compass-player-hemorrhage-container').fadeTo(data.duration, 0)
                }
                $('#compass-player-hemorrhage').css({
                    "clip": `rect(${data.value * 20}px, 20px, 20px, 0px)`
                })
                break;
            case "distance":
                if (data.visible) {
                    $('#compass-distance').fadeIn(150)
                } else {
                    $('#compass-distance').fadeOut(150)
                }
                $('#compass-distance').text(`${data.distance}m`)
                break;
        }
    })
})