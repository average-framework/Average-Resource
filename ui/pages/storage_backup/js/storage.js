$(() => {
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
            console.log("register craft item1: " + JSON.stringify(item))
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

            console.log("register craft event2: " + id)

            addEventHandlerForCraftContextMenu(id, menu)
        }
    }

    function addEventHandlerForInventoryContextMenu(id, menu) {
        $("#" + menu.id + "-" + menu.name + "-" + menu.eventName + "-div-menu-ul-li").click(function (event) {
            console.log("click: " + menu.id + ", " + id + ", " + menu.name + ", " + menu.eventName)
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
        console.log("register craft event3: " + id)
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
            console.log("register event4: " + name + ", " + $(name).data("id"))

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