$(() => {
    console.log("create slots")

    $('#inv-close').click(() => {
        $.post("https://avg/storage/close", JSON.stringify({}))
    })

    avg.on('init', json => {
        console.log("init: " + json)
        var data = JSON.parse(json)
        initSlots(data.slotCount)
    })

    avg.on('setItemOnEmptySlot', json => {
        console.log("setItemOnEmptySlot: " + json)
        var data = JSON.parse(json)
        setItemOnEmptySlot(data)
        
        bindDragEvents()
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

    function moveItemOnEmptySlot(item) {
        // Base need to clear
        console.log("base: " + item.slotId + ", target: " + item.targetSlotId)
        $(`#slot-${item.slotId}`).attr('draggable', 'false')
        $(`#slot-${item.slotId}`).removeClass('inv-slot')
        $(`#slot-${item.slotId}`).addClass('inv-eslot')
        $(`#slot-${item.slotId}-count`).text('')
        $(`#slot-${item.slotId}-img`).css({
            'background-image': `url()`
        })

        // Need to unbind event to base item
        unbindDragEvents(item.slotId)

        // Target need to set
        $(`#slot-${item.targetSlotId}`).attr('draggable', 'true')
        $(`#slot-${item.targetSlotId}`).removeClass('inv-eslot')
        $(`#slot-${item.targetSlotId}`).addClass('inv-slot')
        $(`#slot-${item.targetSlotId}-count`).text(item.targetCount)
        $(`#slot-${item.targetSlotId}-img`).css({
            'background-image': `url(./img/${item.targetImg}.png)`
        })

        // Need to bind event to target item
        bindDragEvents()
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

    $("#inventory-searchbar-input").change(function (event) {
        $.post("https://avg/storage/inv/input_count", JSON.stringify({
            value: event.target.value
        }))
    })

    $("#chest-searchbar-input").change(function (event) {
        $.post("https://avg/storage/chest/input_count", JSON.stringify({
            value: event.target.value
        }))
    })

    // function invSlotTemplate(data, slotIndex) {
    //     return `<div draggable="true" class="inv-slot" id="${slotIndex}" data-slotid="${slotIndex}">
    //                 <div class="inv-slot-center">
    //                     <div id="${slotIndex}-img" class="img" style="background-image: url('./img/${data.img}.png')">
    //                     </div>
    //                 </div>
    //                 <div class="inv-slot-bottom">
    //                     <span id="${slotIndex}-count" class="inv-slot-count">${data.count}</span>
    //                 </div>
    //                 <div id="${slotIndex}-context" class="context-menu" style="top: 0px; left: 0px;">
    //                     <ul id="${slotIndex}-context-ul">

    //                     </ul>
    //                 </div>
    //             </div>`
    // }

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
                        <ul id="slot-${slotId}-context-ul" data-slotid="${slotId}">

                        </ul>
                    </div>
                </div>`
    }

    function initSlots(slotCount) {
        for (var i = 0; i < slotCount; i++) {
            $('#inv-slots').append(invEmptySlotTemplate(i))
        }
    }

    function clearInventoryRender() {
        $("#inventory-items-container").empty()
    }

    function clearChestRender() {
        $("#chest-items-container").empty()
    }

    function clearCraftRender() {
        $("#craft-items-container").empty()
    }

    function createInventoryItems(items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            var template = getItemTemplate(item)

            $("#inventory-items-container").append(template)
            addEventHandlerForInventoryItem("#" + item.id + "-div")
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            createInventoryContextMenu(item.id, item.menu)
        }
    }

    function createChestItems(items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            var template = getChestItemTemplate(item)

            $("#chest-items-container").append(template)
            addEventHandlerForChestItem("#" + item.id + "-div")
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            createChestContextMenu(item.id, item.menu)
        }
    }

    function createCraftItems(items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            var template = getCraftItemTemplate(item)

            $("#craft-items-container").append(template)
            addEventHandlerForCraftItem("#" + item.id + "-div")
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            createCraftContextMenu(item.id, item.menu)
        }
    }

    function createInventoryContextMenu(id, menuItems) {
        $("#" + id + "-div-menu-ul").empty()

        for (var i = 0; i < menuItems.length; i++) {
            var menu = menuItems[i]

            $("#" + id + "-div-menu").hide()
            $("#" + id + "-div-menu-ul").append(
                `<li id="${menu.id}-${menu.name}-${menu.eventName}-div-menu-ul-li" data-eventname="${menu.eventName}">
                    <a href=""><span class="emoji">${menu.emoji}</span>${menu.text}</a>
                </li>`)

            addEventHandlerForInventoryContextMenu(id, menu)
        }
    }

    function createChestContextMenu(id, menuItems) {
        $("#" + id + "-div-menu-ul").empty()

        for (var i = 0; i < menuItems.length; i++) {
            var menu = menuItems[i]

            $("#" + id + "-div-menu").hide()
            $("#" + id + "-div-menu-ul").append(
                `<li id="${menu.id}-${menu.name}-${menu.eventName}-div-menu-ul-li" data-eventname="${menu.eventName}">
                    <a href=""><span class="emoji">${menu.emoji}</span>${menu.text}</a>
                </li>`)

            addEventHandlerForChestContextMenu(id, menu)
        }
    }

    function createCraftContextMenu(id, menuItems) {
        $("#" + id + "-div-menu-ul").empty()

        for (var i = 0; i < menuItems.length; i++) {
            var menu = menuItems[i]

            $("#" + id + "-div-menu").hide()
            $("#" + id + "-div-menu-ul").append(
                `<li id="${menu.id}-${menu.name}-${menu.eventName}-div-menu-ul-li" data-eventname="${menu.eventName}">
                    <a href=""><span class="emoji">${menu.emoji}</span>${menu.text}</a>
                </li>`)

            addEventHandlerForCraftContextMenu(id, menu)
        }
    }

    function addEventHandlerForInventoryContextMenu(id, menu) {
        $("#" + menu.id + "-" + menu.name + "-" + menu.eventName + "-div-menu-ul-li").click(function (event) {
            $.post(`https://avg/storage/inv/context_menu`, JSON.stringify({
                name: menu.name,
                tempId: id,
                eventName: menu.eventName
            }))
        })

        $("#" + id + "-div-menu").mouseleave(function (event) {
            $(".storage-item-menu").hide()
            $(".inventory-item").show()
        })
    }

    function addEventHandlerForChestContextMenu(id, menu) {
        $("#" + menu.id + "-" + menu.name + "-" + menu.eventName + "-div-menu-ul-li").click(function (event) {
            $.post(`https://avg/storage/chest/context_menu`, JSON.stringify({
                name: menu.name,
                tempId: id,
                eventName: menu.eventName
            }))
        })

        $("#" + id + "-div-menu").mouseleave(function (event) {
            $(".storage-item-menu").hide()
            $(".inventory-item").show()
            $(".chest-item").show()
        })
    }

    function addEventHandlerForCraftContextMenu(id, menu) {
        $("#" + menu.id + "-" + menu.name + "-" + menu.eventName + "-div-menu-ul-li").click(function (event) {
            $.post(`https://avg/storage/craft/clickContextMenu`, JSON.stringify({
                name: menu.name,
                tempId: id,
                eventName: menu.eventName
            }))
        })

        $("#" + id + "-div-menu").mouseleave(function (event) {
            $(".storage-item-menu").hide()
            $(".inventory-item").show()
            $(".craft-item").show()
        })
    }

    function addEventHandlerForInventoryItem(name) {
        $(name).click(function (event) {
            event.preventDefault();

            $(".inventory-item").hide()
            $(".storage-item-menu").hide()
            $(name).show()
            $(name + "-menu").show()

            var item = document.getElementById($(name).data("id") + "-div")
            var offsets = item.getBoundingClientRect();
            var top = offsets.top;
            var left = offsets.left;
            var width = item.offsetWidth
            var height = item.offsetHeight

            $(name + "-menu").css("top", top + "px")
            $(name + "-menu").css("left", left + width + "px")
        })
    }

    function addEventHandlerForChestItem(name) {
        $(name).click(function (event) {
            event.preventDefault();

            $(".chest-item").hide()
            $(".storage-item-menu").hide()
            $(name).show()
            $(name + "-menu").show()

            var item = document.getElementById($(name).data("id") + "-div")
            var offsets = item.getBoundingClientRect();
            var top = offsets.top;
            var left = offsets.left;
            var width = item.offsetWidth
            var height = item.offsetHeight

            $(name + "-menu").css("top", top + "px")
            $(name + "-menu").css("left", left + width + "px")
        })
    }

    function addEventHandlerForCraftItem(name) {
        $(name).click(function (event) {
            event.preventDefault();

            $(".craft-item").hide()
            $(".storage-item-menu").hide()

            $(name).show()
            $(name + "-menu").show()

            var item = document.getElementById($(name).data("id") + "-div")
            var offsets = item.getBoundingClientRect();
            var top = offsets.top;
            var left = offsets.left;
            var width = item.offsetWidth
            var height = item.offsetHeight

            $(name + "-menu").css("top", top + "px")
            $(name + "-menu").css("left", left + width + "px")
        })
    }

    function getItemTemplate(data) {
        return `<div id="${data.id}-div" data-id="${data.id}" class="inventory-item">
                    <div class="storage-item-top">
                        <p id="${data.id}-div-count" style="font-size: 14px; font-weight: 600; color: rgb(235,235,235); margin-top: 5px">${data.count}</p>
                    </div>
                    <div class="storage-item-center">
                        <div class="img" style="background-image: url('./img/${data.img}')"></div>
                    </div>
                    <div class="storage-item-bottom">
                        <p id="${data.id}-div-text">${data.text}</p>
                    </div>
                    <div id="${data.id}-div-menu" class="storage-item-menu" style="top: 0px; left: 0px;">
                        <ul id="${data.id}-div-menu-ul">
                            
                        </ul>
                    </div>
                </div>`
    }

    function getChestItemTemplate(data) {
        return `<div id="${data.id}-div" data-id="${data.id}" class="chest-item">
                    <div class="storage-item-top">
                        <p id="${data.id}-div-count" style="font-size: 14px; font-weight: 600; color: rgb(235,235,235); margin-top: 5px">${data.count}</p>
                    </div>
                    <div class="storage-item-center">
                        <div class="img" style="background-image: url('./img/${data.img}')"></div>
                    </div>
                    <div class="storage-item-bottom">
                        <p id="${data.id}-div-text">${data.text}</p>
                    </div>
                    <div id="${data.id}-div-menu" class="storage-item-menu" style="top: 0px; left: 0px;">
                        <ul id="${data.id}-div-menu-ul">
                            
                        </ul>
                    </div>
                </div>`
    }

    function getCraftItemTemplate(data) {
        return `<div id="${data.id}-div" data-id="${data.id}" class="craft-item">
                    <div class="storage-item-top">
                        
                    </div>
                    <div class="storage-item-center">
                        <div class="img" style="background-image: url('./img/${data.img}')"></div>
                    </div>
                    <div class="storage-item-bottom">
                        <p id="${data.id}-div-text">${data.text}</p>
                    </div>
                    <div id="${data.id}-div-menu" class="storage-item-menu" style="top: 0px; left: 0px;">
                        <ul id="${data.id}-div-menu-ul">
                            
                        </ul>
                    </div>
                </div>`
    }
})