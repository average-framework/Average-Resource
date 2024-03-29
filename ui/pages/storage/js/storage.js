$(() => {
    var invSplitValue = 0

    $(`#inv-close`).click(() => {
        $.post("https://avg/storage/close", JSON.stringify({}))
    })

    avg.on(`init`, json => {
        console.log("init slots: " + json)

        var data = JSON.parse(json)
        initSlots(data.slotCount, data.type)
    })

    avg.on(`setItemOnEmptySlot`, json => {
        var data = JSON.parse(json)
        setItemOnEmptySlot(data)

        bindDragEvents(data.type)
        bindContextMenu(data.slotId, data.type)
    })

    avg.on(`setItemOnSlot`, json => {
        var data = JSON.parse(json)
        setItemOnSlot(data)
    })

    avg.on(`moveItemOnEmptySlot`, json => {
        var data = JSON.parse(json)
        moveItemOnEmptySlot(data)
    })

    avg.on(`stackItemOnSlot`, json => {
        var data = JSON.parse(json)
        stackItemOnSlot(data)
    })

    avg.on(`showInvSplitMenu`, json => {
        var data = JSON.parse(json)
        showInvSplitMenu(data)
    })

    avg.on(`updateSlotRender`, json => {
        var data = JSON.parse(json)
        updateSlotRender(data)
    })

    avg.on(`removeItemOnSlot`, json => {
        var data = JSON.parse(json)
        removeItemOnSlot(data)
    })

    avg.on(`setWeight`, json => {
        var data = JSON.parse(json)
        setWeight(data)
    })

    avg.on(`setTemperature`, json => {
        var data = JSON.parse(json)
        setTemperature(data)
    })

    avg.on(`setTime`, json => {
        var data = JSON.parse(json)
        setTime(data)
    })

    function setTime(data) {
        $(`#inv-time`).text(`${data.time}`)
    }

    function setTemperature(data) {
        $(`#inv-temperature`).text(`${data.temperature}`)
    }

    function setWeight(data) {
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotPrefix = "inv"
                break;
            case "chest":
                slotPrefix = "chest"
                break;
        }

        $(`#${slotPrefix}-weight`).text(`${data.weight}/${data.maxWeight}`)
    }

    function removeItemOnSlot(data) {
        var slotClass = ""
        var slotEmptyClass = ""
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotClass = "inv-slot"
                slotEmptyClass = "inv-eslot"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = "chest-slot"
                slotEmptyClass = "chest-eslot"
                slotPrefix = "slot-chest"
                break;
        }

        // Remove event on slot
        // Need to unbind event for this slot
        unbindDragEvents(data.slotId, data.type)
        unbindContextMenu(data.slotId, data.type)

        $(`#${slotPrefix}-${data.slotId}`).attr(`draggable`, `false`)
        $(`#${slotPrefix}-${data.slotId}`).removeClass(slotClass)
        $(`#${slotPrefix}-${data.slotId}`).addClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.slotId}-count`).text(``)
        $(`#${slotPrefix}-${data.slotId}-img`).css({
            'background-image': `url()`
        })

        unbindClickEventForEmptySlot(data.type)
    }

    function updateSlotRender(data) {
        var slotClass = ""
        var slotEmptyClass = ""
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotClass = "inv-slot"
                slotEmptyClass = "inv-eslot"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = "chest-slot"
                slotEmptyClass = "chest-eslot"
                slotPrefix = "slot-chest"
                break;
        }

        $(`#${slotPrefix}-${data.slotId}`).attr(`draggable`, `true`)
        $(`#${slotPrefix}-${data.slotId}`).removeClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.slotId}`).addClass(slotClass)
        $(`#${slotPrefix}-${data.slotId}-count`).text(data.count)
        $(`#${slotPrefix}-${data.slotId}-img`).css({
            'background-image': `url(./img/${data.img}.png)`
        })
    }

    function showInvSplitMenu(data) {
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotPrefix = "inv"
                break;
            case "chest":
                slotPrefix = "chest"
                break;
        }

        invSplitValue = data.defaultValue

        $(`#${slotPrefix}-splitmenu-title`).text(data.title)
        $(`#${slotPrefix}-splitmenu-input`).prop(`min`, data.minValue)
        $(`#${slotPrefix}-splitmenu-input`).prop(`max`, data.maxValue)
        $(`#${slotPrefix}-splitmenu-input`).prop(`value`, data.defaultValue)
        $(`#${slotPrefix}-splitmenu-img`).css({
            'background-image': `url(./img/${data.img}.png)`
        })
        $(`#${slotPrefix}-splitmenu`).addClass(`scale-in`)
        $(`#${slotPrefix}-splitmenu`).removeClass(`scale-out`)
        $(`#${slotPrefix}-splitmenu-quantity`).text(data.defaultValue)
        $(`#${slotPrefix}-splitmenu`).css({
            'display': `inline`
        })

        $(`#${slotPrefix}-splitmenu-split-btn`).off(`click`).on(`click`, (e) => {
            $.post(`https://avg/storage/split/result`, JSON.stringify({
                slotId: data.slotId,
                minValue: data.minValue,
                maxValue: data.maxValue,
                value: invSplitValue,
                slotType: slotPrefix
            }))
            hideSplitMenu(slotPrefix)
        })

        $(`#${slotPrefix}-splitmenu-close-btn`).off(`click`).on(`click`, (e) => {
            $.post(`https://avg/storage/${data.type}/split/close`, JSON.stringify({}))
            hideSplitMenu(slotPrefix)
        })

        $(document).on(`input`, `#${slotPrefix}-splitmenu-input`, function () {
            invSplitValue = new Number($(this).val())
            $(`#${slotPrefix}-splitmenu-quantity`).text(invSplitValue)
        });

        $(document).on(`click`, `#${slotPrefix}-splitmenu-left-btn`, function () {
            var step = $(`#${slotPrefix}-splitmenu-input`).attr(`step`)
            var min = new Number($(`#${slotPrefix}-splitmenu-input`).attr(`min`))

            invSplitValue -= new Number(step)

            if (invSplitValue < min) {
                invSplitValue = min
            }

            $(`#${slotPrefix}-splitmenu-input`).val(invSplitValue)
            $(`#${slotPrefix}-splitmenu-quantity`).text(invSplitValue)
        });

        $(document).on(`click`, `#${slotPrefix}-splitmenu-right-btn`, function () {
            var step = $(`#${slotPrefix}-splitmenu-input`).attr(`step`)
            var max = new Number($(`#${slotPrefix}-splitmenu-input`).attr(`max`))

            invSplitValue += new Number(step)

            if (invSplitValue > max) {
                invSplitValue = max
            }

            $(`#${slotPrefix}-splitmenu-input`).val(invSplitValue)
            $(`#${slotPrefix}-splitmenu-quantity`).text(invSplitValue)
        });
    }

    function hideSplitMenu(slotPrefix) {
        $(`#${slotPrefix}-splitmenu`).removeClass(`scale-in`)
        $(`#${slotPrefix}-splitmenu`).addClass(`scale-out`)

        setTimeout(() => {
            $(`#${slotPrefix}-splitmenu`).css({
                'display': `none`
            })
        }, 200);
    }

    function unbindDragEvents(slotId, type) {
        switch (type) {
            case "inv":
                $(`#slot-${slotId}`).off(`dragstart`)
                $(`#slot-${slotId}`).off(`dragend`)
                break;
            case "chest":
                $(`#slot-chest-${slotId}`).off(`dragstart`)
                $(`#slot-chest-${slotId}`).off(`dragend`)
                break;
        }
    }

    function bindDragEvents(type) {
        var slotClass = ""
        var eventType = ""

        switch (type) {
            case "inv":
                slotClass = ".inv-slot"
                eventType = "inv"
                break;
            case "chest":
                slotClass = ".chest-slot"
                eventType = "chest"
                break;
        }

        $(slotClass).off(`dragend`).on(`dragend`, (e) => {
            var elem = document.elementFromPoint(e.clientX, e.clientY)
            var slotId = e.target.getAttribute(`data-slotid`)
            var slotSourceType = e.target.getAttribute(`data-slottype`)
            var targetSlotId = elem.getAttribute(`data-slotid`)
            var slotTargetType = elem.getAttribute(`data-slottype`)

            console.log("drop target: " + slotId + ", " + slotSourceType + ", " + targetSlotId + ", " + slotTargetType)

            // Si l`object n`est pas un slot et que l`id du slot n`est pas égale a lui même
            // alors on post le déplacement du slot au serveur
            if (slotId != undefined && targetSlotId != undefined/* && slotId != targetSlotId*/) {
                $.post(`https://avg/storage/drop_slot`, JSON.stringify({
                    slotId,
                    targetSlotId,
                    slotSourceType,
                    slotTargetType
                }))
            }
        })
    }

    function unbindClickEventForEmptySlot(type) {
        switch (type) {
            case "inv":
                $(`.inv-eslot`).off(`click`)
                break;
            case "chest":
                $(`.chest-eslot`).off(`click`)
                break;
        }
    }

    function moveItemOnEmptySlot(data) {
        var slotClass = ""
        var slotEmptyClass = ""
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotClass = "inv-slot"
                slotEmptyClass = "inv-eslot"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = "chest-slot"
                slotEmptyClass = "chest-eslot"
                slotPrefix = "slot-chest"
                break;
        }

        // Need to unbind event to base item
        unbindDragEvents(data.slotId, data.type)
        unbindContextMenu(data.slotId, data.type)

        $(`#${slotPrefix}-${data.slotId}`).attr(`draggable`, `false`)
        $(`#${slotPrefix}-${data.slotId}`).removeClass(slotClass)
        $(`#${slotPrefix}-${data.slotId}`).addClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.slotId}-count`).text(``)
        $(`#${slotPrefix}-${data.slotId}-img`).css({
            'background-image': `url()`
        })

        // Target need to set
        $(`#${slotPrefix}-${data.targetSlotId}`).attr(`draggable`, `true`)
        $(`#${slotPrefix}-${data.targetSlotId}`).removeClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.targetSlotId}`).addClass(slotClass)
        $(`#${slotPrefix}-${data.targetSlotId}-count`).text(data.targetCount)
        $(`#${slotPrefix}-${data.targetSlotId}-img`).css({
            'background-image': `url(./img/${data.targetImg}.png)`
        })

        createContextMenu(data.targetSlotId, data.contextItems, data.type)

        // Need to bind event to target item
        bindDragEvents(data.type)
        bindContextMenu(data.targetSlotId, data.type)

        // Unbind click event on empty slot after item moving
        unbindClickEventForEmptySlot(data.type)
    }

    function setItemOnSlot(data) {
        var slotClass = ""
        var slotEmptyClass = ""
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotClass = "inv-slot"
                slotEmptyClass = "inv-eslot"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = "chest-slot"
                slotEmptyClass = "chest-eslot"
                slotPrefix = "slot-chest"
                break;
        }

        $(`#${slotPrefix}-${data.slotId}`).attr(`draggable`, `true`)
        $(`#${slotPrefix}-${data.slotId}`).removeClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.slotId}`).addClass(slotClass)
        $(`#${slotPrefix}-${data.slotId}-count`).text(data.count)
        $(`#${slotPrefix}-${data.slotId}-img`).css({
            'background-image': `url(./img/${data.img}.png)`
        })

        $(`#${slotPrefix}-${data.targetSlotId}`).attr(`draggable`, `true`)
        $(`#${slotPrefix}-${data.targetSlotId}`).removeClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.targetSlotId}`).addClass(slotClass)
        $(`#${slotPrefix}-${data.targetSlotId}-count`).text(data.targetCount)
        $(`#${slotPrefix}-${data.targetSlotId}-img`).css({
            'background-image': `url(./img/${data.targetImg}.png)`
        })
    }

    function setItemOnEmptySlot(data) {
        var slotClass = ""
        var slotEmptyClass = ""
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotClass = "inv-slot"
                slotEmptyClass = "inv-eslot"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = "chest-slot"
                slotEmptyClass = "chest-eslot"
                slotPrefix = "slot-chest"
                break;
        }

        $(`#${slotPrefix}-${data.slotId}`).attr(`draggable`, `true`)
        $(`#${slotPrefix}-${data.slotId}`).removeClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.slotId}`).addClass(slotClass)
        $(`#${slotPrefix}-${data.slotId}-count`).text(data.count)
        $(`#${slotPrefix}-${data.slotId}-img`).css({
            'background-image': `url(./img/${data.img}.png)`
        })

        createContextMenu(data.slotId, data.contextItems, data.type)
    }

    function stackItemOnSlot(data) {
        var slotClass = ""
        var slotEmptyClass = ""
        var slotPrefix = ""

        switch (data.type) {
            case "inv":
                slotClass = "inv-slot"
                slotEmptyClass = "inv-eslot"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = "chest-slot"
                slotEmptyClass = "chest-eslot"
                slotPrefix = "slot-chest"
                break;
        }

        $(`#${slotPrefix}-${data.slotId}`).attr(`draggable`, `true`)
        $(`#${slotPrefix}-${data.slotId}`).removeClass(slotEmptyClass)
        $(`#${slotPrefix}-${data.slotId}`).addClass(slotClass)
        $(`#${slotPrefix}-${data.slotId}-count`).text(data.count)
        $(`#${slotPrefix}-${data.slotId}-img`).css({
            'background-image': `url(./img/${data.img}.png)`
        })
    }

    avg.on(`open`, data => {
        avg.show()
        avg.focus()

        $("#storage").fadeIn(200)
    })

    avg.on(`inventory_open`, data => {
        $("#inventory-container").fadeIn(200)
    })

    avg.on(`chest_open`, data => {
        $("#chest-container").fadeIn(200)
    })

    avg.on(`close`, data => {
        $("#storage").fadeOut(200, () => {
            avg.hide()
        })
    })

    avg.on(`inventory_close`, data => {
        $("#inventory-container").fadeOut(200, () => {
            $("#inventory-container").hide()
        })
    })

    avg.on(`chest_close`, data => {
        $("#chest-container").fadeOut(200, () => {
            $("#chest-container").hide()
        })
    })

    document.addEventListener(`keydown`, function (event) {
        if (event.keyCode == 27) {
            $.post("https://avg/storage/close", JSON.stringify({}))
        }
    })

    function initSlots(slotCount, type) {
        var slotPrefix = ""

        switch (type) {
            case "inv":
                slotPrefix = "inv"
                break;
            case "chest":
                slotPrefix = "chest"
                break;
        }

        for (var i = 0; i < slotCount; i++) {
            $(`#${slotPrefix}-slots`).append(emptySlotTemplate(i, slotPrefix))
        }
    }

    function emptySlotTemplate(slotId, type) {
        var slotClass = ""
        var slotPrefix = ""

        switch (type) {
            case "inv":
                slotClass = "inv"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = "chest"
                slotPrefix = "slot-chest"
                break;
        }

        return `<div class="${slotClass}-eslot" id="${slotPrefix}-${slotId}" data-slotid="${slotId}" data-slottype="${type}">
                    <div class="${slotClass}-slot-center" data-slotid="${slotId}" data-slottype="${type}">
                        <div id="${slotPrefix}-${slotId}-img" class="img" data-slotid="${slotId}" data-slottype="${type}" style="background-image: url()">
                        </div>
                    </div>
                    <div class="${slotClass}-slot-bottom" data-slotid="${slotId}" data-slottype="${type}">
                        <span id="${slotPrefix}-${slotId}-count" class="${slotClass}-slot-count" data-slotid="${slotId}" data-slottype="${type}"></span>
                    </div>
                    <div id="${slotPrefix}-${slotId}-context" class="context-menu" data-slotid="${slotId}" data-slottype="${type}"style="top: 0px; left: 0px;">
                        <ul id="${slotPrefix}-${slotId}-context-items" data-slotid="${slotId}" data-slottype="${type}">

                        </ul>
                    </div>
                </div>`
    }

    function createContextMenu(slotId, contextItems, type) {
        var slotPrefix = ""
        var contextPrefix = ""

        switch (type) {
            case "inv":
                slotPrefix = "slot"
                contextPrefix = "inv"
                break;
            case "chest":
                slotPrefix = "slot-chest"
                contextPrefix = "chest"
                break;
        }

        $(`#${slotPrefix}-${slotId}-context`).hide()

        for (var i = 0; i < contextItems.length; i++) {
            var contextItem = contextItems[i]

            $(`#${slotPrefix}-${slotId}-context-items`).append(
                `<li class="context-item" id="${slotPrefix}-${slotId}-${contextItem.eventName}-context-item" data-slotid="${slotId}" data-slottype="${type}" data-eventname="${contextItem.eventName}">
                    <a id="${slotPrefix}-${slotId}-${contextItem.eventName}-context-item-a" data-slotid="${slotId}" data-slottype="${type}" data-eventname="${contextItem.eventName}" href="">
                        <span id="${slotPrefix}-${slotId}-${contextItem.eventName}-context-item-a-span" data-slotid="${slotId}" data-slottype="${type}" data-eventname="${contextItem.eventName}">${contextItem.emoji}</span>${contextItem.text}
                    </a>
                </li>`)
        }

        $(`.context-item`).off(`click`).on(`click`, (e) => {
            $.post(`https://avg/storage/context_menu`, JSON.stringify({
                slotId: e.target.getAttribute(`data-slotid`),
                eventName: e.target.getAttribute(`data-eventname`),
                slotSourceType: e.target.getAttribute(`data-slottype`)
            }))
        })

        bindContextMenu(slotId)
    }

    function unbindContextMenu(slotId, type) {
        switch (type) {
            case "inv":
                $(`#slot-${slotId}-context-items`).empty()
                break;
            case "chest":
                $(`#slot-chest-${slotId}-context-items`).empty()
                break;
        }
    }

    function bindContextMenu(slotId, type) {
        // Lors d`un move, besoin de supprimer le context menu de "base" dans le ul (unbind les events du context) | ?
        // Lors d`un move, besoin d`ajouter le context menu de "target" dans le ul (unbind les events du context) | ?
        // Besoin de cacher l`ancien context menu et d`afficher le nouveau context | OK

        var slotClass = ""
        var slotPrefix = ""

        switch (type) {
            case "inv":
                slotClass = ".inv-slot"
                slotPrefix = "slot"
                break;
            case "chest":
                slotClass = ".chest-slot"
                slotPrefix = "slot-chest"
                break;
        }

        $(slotClass).on(`click`, (e) => {
            e.preventDefault()

            var currentSlotId = e.target.getAttribute("data-slotid")
            $(`.context-menu`).hide()
            $(`#${slotPrefix}-${currentSlotId}-context`).show()

            var item = document.getElementById(`${slotPrefix}-${currentSlotId}`)
            var offsets = item.getBoundingClientRect();
            var top = offsets.top;
            var left = offsets.left;
            var width = item.offsetWidth
            var height = item.offsetHeight

            $(`#${slotPrefix}-${currentSlotId}-context`).css("top", (top - 105) + "px")
            $(`#${slotPrefix}-${currentSlotId}-context`).css("left", left + width + "px")
        })

        $(".inv-slot").off(`mouseenter`).on(`mouseenter`, e => {
            $.post(`https://avg/storage/item_info`, JSON.stringify({
                slotId: e.target.getAttribute(`data-slotid`)
            }), function (data) {
                $(`#inv-info-title`).text(data.title)
                $(`#inv-info-desc`).text(data.description)
                $(`#inv-item-weight`).text(data.weight)
                $(`#inv-item-sellable`).text(data.isSellable)
            })
        })

        $(`#${slotPrefix}-${slotId}-context`).off(`mouseleave`).on(`mouseleave`, e => {
            $(`#${slotPrefix}-${slotId}-context`).hide()
        })
    }
})