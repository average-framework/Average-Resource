$(() => {
    console.log("create slots")

    $('#inv-close').click(() => {
        $.post("https://avg/storage/close", JSON.stringify({}))
    })

    avg.on('init', json => {
        console.log("init: " + json)
        var data = JSON.parse(json)
        initInventorySlots(data.slotCount)
    })

    avg.on('setItemOnEmptySlot', json => {
        console.log("setItemOnEmptySlot: " + json)
        var data = JSON.parse(json)
        setItemOnEmptySlot(data)

        bindDragEvents()
        bindInventoryContextMenu(data.slotId)
    })

    avg.on('setItemOnSlot', json => {
        console.log("setItemOnSlot: " + json)
        var data = JSON.parse(json)
        setItemOnSlot(data)
    })

    avg.on('moveItemOnEmptySlot', json => {
        console.log("moveItemOnEmptySlot: " + json)
        var data = JSON.parse(json)
        moveItemOnEmptySlot(data)
    })

    avg.on('stackItemOnSlot', json => {
        console.log("stackItemOnSlot: " + json)
        var data = JSON.parse(json)
        stackItemOnSlot(data)
    })

    avg.on('showInvSplitMenu', json => {
        console.log("showInvSplitMenu: " + json)
        var data = JSON.parse(json)
        showInvSplitMenu(data)
    })

    avg.on('updateItemRender', json => {
        console.log("updateItemRender: " + json)
        var data = JSON.parse(json)
        updateItemRender(data)
    })

    avg.on('removeItemOnSlot', json => {
        console.log("removeItemOnSlot: " + json)
        var data = JSON.parse(json)
        removeItemOnSlot(data)
    })

    function removeItemOnSlot(data) {
        // Remove event on slot
        // Need to unbind event for this slot
        // $(`#slot-${data.slotId}`).off('click')
        unbindDragEvents(data.slotId)
        unbindInventoryContextMenu(data.slotId)

        $(`#slot-${data.slotId}`).attr('draggable', 'false')
        $(`#slot-${data.slotId}`).removeClass('inv-slot')
        $(`#slot-${data.slotId}`).addClass('inv-eslot')
        $(`#slot-${data.slotId}-count`).text('')
        $(`#slot-${data.slotId}-img`).css({
            'background-image': `url()`
        })

        unbindClickEventForEmptySlot()
    }

    function updateItemRender(data) {
        $(`#slot-${data.slotId}`).attr('draggable', 'true')
        $(`#slot-${data.slotId}`).removeClass('inv-eslot')
        $(`#slot-${data.slotId}`).addClass('inv-slot')
        $(`#slot-${data.slotId}-count`).text(data.count)
        $(`#slot-${data.slotId}-img`).css({
            'background-image': `url(./img/${data.img}.png)`
        })
    }

    var invSplitValue = 0

    function showInvSplitMenu(data) {
        invSplitValue = data.defaultValue

        $('#inv-splitmenu-title').text(data.title)
        $('#inv-splitmenu-input').prop('min', data.minValue)
        $('#inv-splitmenu-input').prop('max', data.maxValue)
        $('#inv-splitmenu-input').prop('value', data.defaultValue)
        $('#inv-splitmenu-img').css({
            'background-image': `url(./img/${data.img}.png)`
        })
        $('#inv-splitmenu').addClass('scale-in')
        $('#inv-splitmenu').removeClass('scale-out')
        $('#inv-splitmenu-quantity').text(data.defaultValue)
        $('#inv-splitmenu').css({
            'display': 'inline'
        })

        $('#inv-splitmenu-split-btn').unbind().on('click', (e) => {
            console.log("split button")
            $.post("https://avg/storage/inv/split/result", JSON.stringify({
                slotId: data.slotId,
                minValue: data.minValue,
                maxValue: data.maxValue,
                value: invSplitValue
            }))
            hideInvSplitMenu()
        })

        $('#inv-splitmenu-close-btn').unbind().on('click', (e) => {
            console.log("close button")
            $.post("https://avg/storage/inv/split/close", JSON.stringify({}))
            hideInvSplitMenu()
        })

        $(document).on('input', '#inv-splitmenu-input', function () {
            invSplitValue = new Number($(this).val())
            $('#inv-splitmenu-quantity').text(invSplitValue)
        });

        $(document).on('click', '#inv-splitmenu-left-btn', function () {
            var step = $('#inv-splitmenu-input').attr('step')
            var min = new Number($('#inv-splitmenu-input').attr('min'))
            var max = new Number($('#inv-splitmenu-input').attr('max'))

            invSplitValue -= new Number(step)

            if (invSplitValue < min) {
                invSplitValue = min
            }

            $('#inv-splitmenu-input').val(invSplitValue)
            $('#inv-splitmenu-quantity').text(invSplitValue)
        });

        $(document).on('click', '#inv-splitmenu-right-btn', function () {
            var step = $('#inv-splitmenu-input').attr('step')
            var min = new Number($('#inv-splitmenu-input').attr('min'))
            var max = new Number($('#inv-splitmenu-input').attr('max'))

            invSplitValue += new Number(step)

            if (invSplitValue > max) {
                invSplitValue = max
            }

            $('#inv-splitmenu-input').val(invSplitValue)
            $('#inv-splitmenu-quantity').text(invSplitValue)
        });
    }

    function hideInvSplitMenu() {
        $('#inv-splitmenu').removeClass('scale-in')
        $('#inv-splitmenu').addClass('scale-out')

        setTimeout(() => {
            $('#inv-splitmenu').css({
                'display': 'none'
            })
        }, 200);
    }

    function unbindDragEvents(id) {
        $(`#slot-${id}`).off('dragstart')
        $(`#slot-${id}`).off('dragend')
    }

    function bindDragEvents() {
        $(`.inv-slot`).unbind().on('dragstart', (e) => {
            console.log('dragstart: ' + e.target.getAttribute('data-slotid'))
        })

        $(`.inv-slot`).unbind().on('dragend', (e) => {
            var elem = document.elementFromPoint(e.clientX, e.clientY)
            var slotId = e.target.getAttribute('data-slotid')
            var targetSlotId = elem.getAttribute('data-slotid')

            // Si l'object n'est pas un slot et que l'id du slot n'est pas égale a lui même
            // alors on post le déplacement du slot au serveur
            if (slotId != undefined && targetSlotId != undefined && slotId != targetSlotId) {
                $.post("https://avg/storage/drop_slot", JSON.stringify({
                    slotId,
                    targetSlotId
                }))
            }
        })
    }

    function unbindClickEventForEmptySlot() {
        $(`.inv-eslot`).off('click')
    }

    function moveItemOnEmptySlot(item) {
        // Base need to clear
        console.log("base: " + item.slotId + ", target: " + item.targetSlotId)
        
        // $(`#slot-${data.slotId}`).off('click')
        
        // Need to unbind event to base item
        unbindDragEvents(item.slotId)
        unbindInventoryContextMenu(item.slotId)
        
        $(`#slot-${item.slotId}`).attr('draggable', 'false')
        $(`#slot-${item.slotId}`).removeClass('inv-slot')
        $(`#slot-${item.slotId}`).addClass('inv-eslot')
        $(`#slot-${item.slotId}-count`).text('')
        $(`#slot-${item.slotId}-img`).css({
            'background-image': `url()`
        })

        // Target need to set
        $(`#slot-${item.targetSlotId}`).attr('draggable', 'true')
        $(`#slot-${item.targetSlotId}`).removeClass('inv-eslot')
        $(`#slot-${item.targetSlotId}`).addClass('inv-slot')
        $(`#slot-${item.targetSlotId}-count`).text(item.targetCount)
        $(`#slot-${item.targetSlotId}-img`).css({
            'background-image': `url(./img/${item.targetImg}.png)`
        })

        createInventoryContextMenu(item.targetSlotId, item.contextItems)

        // Need to bind event to target item
        bindDragEvents()
        bindInventoryContextMenu(item.targetSlotId)
        
        // Unbind click event on empty slot after item moving
        unbindClickEventForEmptySlot()
    }

    function setItemOnSlot(item) {
        $(`#slot-${item.slotId}`).attr('draggable', 'true')
        $(`#slot-${item.slotId}`).removeClass('inv-eslot')
        $(`#slot-${item.slotId}`).addClass('inv-slot')
        $(`#slot-${item.slotId}-count`).text(item.count)
        $(`#slot-${item.slotId}-img`).css({
            'background-image': `url(./img/${item.img}.png)`
        })

        $(`#slot-${item.targetSlotId}`).attr('draggable', 'true')
        $(`#slot-${item.targetSlotId}`).removeClass('inv-eslot')
        $(`#slot-${item.targetSlotId}`).addClass('inv-slot')
        $(`#slot-${item.targetSlotId}-count`).text(item.targetCount)
        $(`#slot-${item.targetSlotId}-img`).css({
            'background-image': `url(./img/${item.targetImg}.png)`
        })
    }

    function setItemOnEmptySlot(item) {
        $(`#slot-${item.slotId}`).attr('draggable', 'true')
        $(`#slot-${item.slotId}`).removeClass('inv-eslot')
        $(`#slot-${item.slotId}`).addClass('inv-slot')
        $(`#slot-${item.slotId}-count`).text(item.count)
        $(`#slot-${item.slotId}-img`).css({
            'background-image': `url(./img/${item.img}.png)`
        })

        createInventoryContextMenu(item.slotId, item.contextItems)
    }

    function stackItemOnSlot(item) {
        $(`#slot-${item.slotId}`).attr('draggable', 'true')
        $(`#slot-${item.slotId}`).removeClass('inv-eslot')
        $(`#slot-${item.slotId}`).addClass('inv-slot')
        $(`#slot-${item.slotId}-count`).text(item.count)
        $(`#slot-${item.slotId}-img`).css({
            'background-image': `url(./img/${item.img}.png)`
        })
    }

    avg.on('open', data => {
        avg.show()
        avg.focus()

        $("#storage").fadeIn(200)
    })

    avg.on('close', data => {
        $("#storage").fadeOut(200, () => {
            avg.hide()
        })
    })

    avg.on('render_inventory', json => {
        var data = JSON.parse(json)

        $("#inventory-container").fadeIn(0)
        $("#chest-container").fadeOut(0)
        $("#craft-container").fadeOut(0)
        $("#inventory-weight").text(data.weight + "/" + data.maxWeight + "kg")

        clearInventoryRender()
        createInventoryItems(data.items)
    })

    avg.on('render_chest', json => {
        var data = JSON.parse(json)

        $("#inventory-container").fadeIn(0)
        $("#chest-container").fadeIn(0)
        $("#craft-container").fadeOut(0)
        $("#chest-weight").text(data.weight + "/" + data.maxWeight + "kg")

        clearChestRender()
        createChestItems(data.items)
    })

    avg.on('render_craft', json => {
        var data = JSON.parse(json)

        $("#inventory-container").fadeIn(0)
        $("#chest-container").fadeOut(0)
        $("#craft-container").fadeIn(0)

        clearCraftRender()
        createCraftItems(data.items)
    })

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 27) {
            $.post("https://avg/storage/close", JSON.stringify({}))
        }
    })

    // $("#inventory-searchbar-input").change(function (event) {
    //     $.post("https://avg/storage/inv/input_count", JSON.stringify({
    //         value: event.target.value
    //     }))
    // })

    function initInventorySlots(slotCount) {
        for (var i = 0; i < slotCount; i++) {
            $('#inv-slots').append(invEmptySlotTemplate(i))
        }
    }

    function invEmptySlotTemplate(slotId) {
        return `<div class="inv-eslot" id="slot-${slotId}" data-slotid="${slotId}">
                    <div class="inv-slot-center" data-slotid="${slotId}">
                        <div id="slot-${slotId}-img" class="img" data-slotid="${slotId}" style="background-image: url('')">
                        </div>
                    </div>
                    <div class="inv-slot-bottom" data-slotid="${slotId}">
                        <span id="slot-${slotId}-count" class="inv-slot-count" data-slotid="${slotId}"></span>
                    </div>
                    <div id="slot-${slotId}-context" class="context-menu" data-slotid="${slotId}" style="top: 0px; left: 0px;">
                        <ul id="slot-${slotId}-context-items" data-slotid="${slotId}">

                        </ul>
                    </div>
                </div>`
    }

    function createInventoryContextMenu(slotId, contextItems) {
        $(`#slot-${slotId}-context`).hide()

        for (var i = 0; i < contextItems.length; i++) {
            var contextItem = contextItems[i]

            $(`#slot-${slotId}-context-items`).append(
                `<li class="context-item" id="slot-${slotId}-${contextItem.eventName}-context-item" data-slotid="${slotId}" data-eventname="${contextItem.eventName}">
                    <a id="slot-${slotId}-${contextItem.eventName}-context-item-a" data-slotid="${slotId}" data-eventname="${contextItem.eventName}" href="">
                        <span id="slot-${slotId}-${contextItem.eventName}-context-item-a-span" data-slotid="${slotId}" data-eventname="${contextItem.eventName}">${contextItem.emoji}</span>${contextItem.text}
                    </a>
                </li>`)

            console.log("try to bind event: " + `#slot-${slotId}-${contextItem.eventName}-context-item`)
        }

        $(`.context-item`).unbind().on('click', (e) => {
            $.post(`https://avg/storage/inv/context_menu`, JSON.stringify({
                slotId: e.target.getAttribute('data-slotid'),
                eventName: e.target.getAttribute('data-eventname')
            }))
        })

        bindInventoryContextMenu(slotId)
    }

    function unbindInventoryContextMenu(slotId) {
        $(`#slot-${slotId}-context-items`).empty()
    }

    function bindInventoryContextMenu(slotId) {
        console.log("bind inventory context menu: " + slotId + ", " + $(`#slot-${slotId}`).attr("id") + ", " + $(`#slot-${slotId}`).data("slotid"))

        // Lors d'un move, besoin de supprimer le context menu de "base" dans le ul (unbind les events du context) | ?
        // Lors d'un move, besoin d'ajouter le context menu de "target" dans le ul (unbind les events du context) | ?
        // Besoin de cacher l'ancien context menu et d'afficher le nouveau context | OK

        $('.inv-slot').on('click', (e) => {
            e.preventDefault()

            var currentSlotId = e.target.getAttribute("data-slotid")
            console.log("currentSlotId: " + currentSlotId)

            $('.context-menu').hide()
            $(`#slot-${currentSlotId}-context`).show()

            console.log("inv slot click: " + e.target.id + ", " + slotId + ", " + currentSlotId)

            var item = document.getElementById(`slot-${currentSlotId}`)
            var offsets = item.getBoundingClientRect();
            var top = offsets.top;
            var left = offsets.left;
            var width = item.offsetWidth
            var height = item.offsetHeight

            console.log("move context menu to: " + currentSlotId + ", " + top + ", " + (left + width))

            $(`#slot-${currentSlotId}-context`).css("top", top + "px")
            $(`#slot-${currentSlotId}-context`).css("left", left + width + "px")
        })

        $(`#slot-${slotId}-context`).unbind().on('mouseleave', e => {
            $(`#slot-${slotId}-context`).hide()
        })
    }
})