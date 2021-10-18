$(() => {
    $("#menu").fadeOut(0)

    avg.on('open', data => {
        // Need to show frame
        // $("#frame-" + data.plugin).fadeIn(250)
        $("#banner-title").text(data.title)
        $("#banner-desc").text(data.description)
        $("#menu").fadeIn(200)
        
        avg.show()
        avg.focus()
    })

    avg.on('close', data => {
        $("#menu").fadeOut(200, () => {
            avg.hide()
        })
    })

    avg.on('render', data => {
        createItems(data.items)
        
        if(data.tabs.length > 0) {
            $('#category-container').show()
            $('#menu-container').css({'height': (495) + 'px'})
            createTabs(data.tabs)
        } else {
            $('#category-container').hide()
            $('#menu-container').css({'height': (495 + 84) + 'px'})
        }
    })

    avg.on('render_item', data => {
        if (data.visible) {
            $("#" + data.name + "-div").fadeIn(0)
        } else {
            $("#" + data.name + "-div").fadeOut(0)
        }

        if (data.type == "button") {
            $("#" + data.name + "-div-h1").text(data.text)
        } else if (data.type == "button_container") {
            $("#" + data.name + "-div-h1").text(data.text)
        } else if (data.type == "label") {
            $("#" + data.name + "-div-h1").text(data.text)
        } else if (data.type == "richtext") {
            $("#" + data.name + "-span").text(data.text)
        } else if (data.type == "checkbox") {
            $("#" + data.name + "-div-h1").text(data.text)
            $("#" + data.name + "-div-checkbox").prop("checked", data.isChecked)
        } else if (data.type == "two_checkbox") {
            $("#" + data.name + "-div-h1").text(data.text)
            $("#" + data.name + "-div-checkbox-1").prop("checked", data.isChecked1)
            $("#" + data.name + "-div-checkbox-2").prop("checked", data.isChecked2)
        } else if (data.type == "list") {
            $("#" + data.name + "-div-h1").text(data.text)
            $("#" + data.name + "-div-h1-itemname").text(data.itemName)
        } else if (data.type == "selector") {
            $("#" + data.name + "-div-h1").text(data.text)
            if (data.isFloating) {
                $("#" + data.name + "-div-h1-itemname").text(data.value.toFixed(2) + "/" + data.max.toFixed(2))
            } else {
                $("#" + data.name + "-div-h1-itemname").text(data.value + "/" + data.max)
            }
        } else if (data.type == "bar") {
            $("#" + data.name + "-div-h1").text(data.text)
            $("#" + data.name + "-div-h1-description").text(data.description)
            $("#" + data.name + "-btn-bar-container").empty()
            $("#" + data.name + "-btn-bar-container").append(getMenuBar(data.step, data.value))
        } else if (data.type == "textbox") {
            $("#" + data.name + "-div-h1").text(data.text)
            $("#" + data.name + "-div-textbox").prop("minLength", data.minLength)
            $("#" + data.name + "-div-textbox").prop("maxLength", data.maxLength)
            $("#" + data.name + "-div-textbox").prop("pattern", data.pattern)
            $("#" + data.name + "-div-textbox").prop("placeholder", data.placeholder)
            $("#" + data.name + "-div-textbox").prop("value", data.value)
        } else if (data.type == "vector2input") {
            $("#" + data.name + "-div-h1-1").text(data.text1)
            $("#" + data.name + "-div-h1-2").text(data.text2)
            $("#" + data.name + "-div-textbox-1").prop("minLength", data.minLength)
            $("#" + data.name + "-div-textbox-1").prop("maxLength", data.maxLength)
            $("#" + data.name + "-div-textbox-1").prop("pattern", data.pattern)
            $("#" + data.name + "-div-textbox-1").prop("placeholder", data.placeholder)
            $("#" + data.name + "-div-textbox-1").prop("value", data.value)
            $("#" + data.name + "-div-textbox-2").prop("minLength", data.minLength)
            $("#" + data.name + "-div-textbox-2").prop("maxLength", data.maxLength)
            $("#" + data.name + "-div-textbox-2").prop("pattern", data.pattern)
            $("#" + data.name + "-div-textbox-2").prop("placeholder", data.placeholder)
            $("#" + data.name + "-div-textbox-2").prop("value", data.value)
        } else if (data.type == "vector3input") {
            $("#" + data.name + "-div-h1").text(data.text)
            $("#" + data.name + "-div-textbox-1").prop("minLength", data.minLength1)
            $("#" + data.name + "-div-textbox-1").prop("maxLength", data.maxLength1)
            $("#" + data.name + "-div-textbox-1").prop("pattern", data.pattern1)
            $("#" + data.name + "-div-textbox-1").prop("placeholder", data.placeholder1)
            $("#" + data.name + "-div-textbox-1").prop("value", data.value1)
            $("#" + data.name + "-div-textbox-2").prop("minLength", data.minLength2)
            $("#" + data.name + "-div-textbox-2").prop("maxLength", data.maxLength2)
            $("#" + data.name + "-div-textbox-2").prop("pattern", data.pattern2)
            $("#" + data.name + "-div-textbox-2").prop("placeholder", data.placeholder2)
            $("#" + data.name + "-div-textbox-2").prop("value", data.value2)
            $("#" + data.name + "-div-textbox-3").prop("minLength", data.minLength3)
            $("#" + data.name + "-div-textbox-3").prop("maxLength", data.maxLength3)
            $("#" + data.name + "-div-textbox-3").prop("pattern", data.pattern3)
            $("#" + data.name + "-div-textbox-3").prop("placeholder", data.placeholder3)
            $("#" + data.name + "-div-textbox-3").prop("value", data.value3)
        } else if (data.type == "textarea") {
            $("#" + data.name + "-div-h1").text(data.text)
            $("#" + data.name + "-div-textarea").prop("minLength", data.minLength)
            $("#" + data.name + "-div-textarea").prop("maxLength", data.maxLength)
            $("#" + data.name + "-div-textarea").prop("pattern", data.pattern)
            $("#" + data.name + "-div-textarea").prop("placeholder", data.placeholder)
            $("#" + data.name + "-div-textarea").prop("value", data.value)
        } else if (data.type == "tab") {
            if (data.isSelected) {
                $("#" + data.name + "-div").addClass("btn-cat-selected")
                $("#" + data.name + "-div").removeClass("btn-cat")
            } else {
                $("#" + data.name + "-div").addClass("btn-cat")
                $("#" + data.name + "-div").removeClass("btn-cat-selected")
            }
        }
    })

    document.addEventListener('keydown', function (event) {
        $.post("https://avg/menu/keydown", JSON.stringify({
            key: event.keyCode
        }))
    })

    function addEventHandlerForButton(name) {
        $(name).click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: $(name).data("id")
            }))
        })
    }

    function addEventHandlerForButtonContainer(name) {
        $(name).click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: $(name).data("id")
            }))
        })
    }

    function addEventHandlerForCheckboxItem(name) {
        $(name).click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                    name: $(name).data("id"),
                    isChecked: $("#" + $(name).data("id") + "-div-checkbox").prop("checked")
                }),
                (isChecked) => {
                    $("#" + $(name).data("id") + "-div-checkbox").prop("checked", isChecked)
                })
        })
    }

    function addEventHandlerForTwoCheckboxItem(name) {
        $(name).click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                    name: $(name).data("id"),
                    isChecked1: $("#" + $(name).data("id") + "-div-checkbox-1").prop("checked"),
                    isChecked2: $("#" + $(name).data("id") + "-div-checkbox-2").prop("checked")
                }),
                (result) => {
                    $("#" + $(name).data("id") + "-div-checkbox-1").prop("checked", result.isChecked1)
                    $("#" + $(name).data("id") + "-div-checkbox-2").prop("checked", result.isChecked2)
                })
        })
    }

    function addEventHandlerForListItem(name) {
        $(name + "-lb").click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                    name: $(name + "-lb").data("id"),
                    operator: "-"
                }),
                (itemName) => {
                    $("#" + $(name + "-lb").data("id") + "-div-h1-itemname").text(itemName)
                })
        })

        $(name + "-rb").click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                    name: $(name + "-rb").data("id"),
                    operator: "+"
                }),
                (itemName) => {
                    $("#" + $(name + "-rb").data("id") + "-div-h1-itemname").text(itemName)
                })
        })
    }

    function addEventHandlerForSelectorItem(name) {
        $(name + "-lb").click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                    name: $(name + "-lb").data("id"),
                    operator: "-"
                }),
                (itemName) => {
                    $("#" + $(name + "-lb").data("id") + "-div-h1-itemname").text(itemName)
                })
        })

        $(name + "-rb").click(function (event) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                    name: $(name + "-rb").data("id"),
                    operator: "+"
                }),
                (itemName) => {
                    $("#" + $(name + "-rb").data("id") + "-div-h1-itemname").text(itemName)
                })
        })
    }

    function addEventHandlerForTextboxItem(name) {
        var elem = document.getElementById(name + "-textbox")
        elem.addEventListener("input", (event) => {
            console.log("key: " + event.target.value)
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: elem.dataset.id,
                value: event.target.value
            }))
        })
    }

    function addEventHandlerForVector2InputItem(name) {
        var elem1 = document.getElementById(name + "-textbox-1")
        var elem2 = document.getElementById(name + "-textbox-2")

        elem1.addEventListener("input", (event) => {
            console.log("input1: " + elem2.dataset.id + ", " + event.target.value)
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: elem1.dataset.id,
                value1: event.target.value
            }))
        })

        elem2.addEventListener("input", (event) => {
            console.log("input2: " + elem2.dataset.id + ", " + event.target.value)
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: elem2.dataset.id,
                value2: event.target.value
            }))
        })
    }

    function addEventHandlerForVector3InputItem(name) {
        var elem1 = document.getElementById(name + "-textbox-1")
        var elem2 = document.getElementById(name + "-textbox-2")
        var elem3 = document.getElementById(name + "-textbox-3")

        elem1.addEventListener("input", (event) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: elem1.dataset.id,
                value1: event.target.value
            }))
        })

        elem2.addEventListener("input", (event) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: elem2.dataset.id,
                value2: event.target.value
            }))
        })

        elem3.addEventListener("input", (event) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: elem3.dataset.id,
                value3: event.target.value
            }))
        })
    }

    function addEventHandlerForTextAreaItem(name) {
        var elem = document.getElementById(name + "-textarea")
        elem.addEventListener("input", (event) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                name: elem.dataset.id,
                value: event.target.value
            }))
        })
    }

    function addEventHandlerForTabItem(name) {
        $(name).click(function (event) {
            $.post("https://avg/menu/on_tab_click", JSON.stringify({
                name: $(name).data("id")
            }))
        })
    }

    function clearRender() {
        $("#item-container").empty()
    }

    function clearTabRender() {
        $("#category-item-container").empty()
    }

    function createTabs(tabs) {
        clearTabRender()

        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i]

            var template = getMenuTabItemTemplate(tab)
            $("#category-item-container").append(template)
            addEventHandlerForTabItem("#" + tab.name + "-div")
        }
    }

    function createItems(items) {
        clearRender()

        for (var i = 0; i < items.length; i++) {
            var item = items[i]

            switch (item.type) {
                case "button":
                    var template = getMenuButtonTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForButton("#" + item.name + "-div")
                    break;
                case "label":
                    var template = getMenuLabelTemplate(item)
                    $("#item-container").append(template)
                    break;
                case "vector2input":
                    var template = getMenuVector2InputTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForVector2InputItem(item.name + "-div")
                    break;
                case "vector3input":
                    var template = getMenuVector3InputTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForVector3InputItem(item.name + "-div")
                    break;
                case "richtext":
                    var template = getMenuRichTextTemplate(item)
                    $("#item-container").append(template)
                    break;
                case "two_checkbox":
                    var template = getMenuTwoCheckboxInputItemTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForTwoCheckboxItem("#" + item.name + "-div")
                    break;
                case "button_container":
                    var template = getMenuButtonContainerTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForButtonContainer("#" + item.name + "-div")
                    break;
                case "checkbox":
                    var template = getMenuCheckboxItemTemplate(item)
                    $("#item-container").append(template)
                    $("#" + item.name + "-div-checkbox").prop("checked", item.isChecked)
                    addEventHandlerForCheckboxItem("#" + item.name + "-div")
                    break;
                case "list":
                    var template = getMenuListItemTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForListItem("#" + item.name + "-div")
                    break;
                case "selector":
                    var template = getMenuSelectorItemTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForSelectorItem("#" + item.name + "-div")
                    break;
                case "bar":
                    var template = getMenuBarItemTemplate(item)
                    $("#item-container").append(template)
                    $("#" + item.name + "-btn-bar-container").append(getMenuBar(item.step, item.value))
                    break;
                case "textbox":
                    var template = getMenuTextboxItemTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForTextboxItem(item.name + "-div")
                    break;
                case "textarea":
                    var template = getMenuTextAreaItemTemplate(item)
                    $("#item-container").append(template)
                    addEventHandlerForTextAreaItem(item.name + "-div")
                    break;
            }
        }
    }

    function getMenuTabItemTemplate(item) {
        return `<div id="${item.name}-div" class="${item.isSelected ? "btn-cat-selected" : "btn-cat"}" data-id="${item.name}">
                    <div id="${item.name}-div-img" class="btn-cat-img" style="background-image: url('${item.iconpath}')"></div>
                </div>`
    }

    function getMenuButtonTemplate(item) {
        return `<div id="${item.name}-div" class="btn red x-cnt" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text" id="${item.name}-div-h1">${item.text}</h1>
                </div>`
    }

    function getMenuLabelTemplate(item) {
        return `<div id="${item.name}-div" class="btn black x-cnt" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text" id="${item.name}-div-h1" data-id="${item.name}" style="font-size: 18px;">${item.text}</h1>
                </div>`
    }

    function getMenuVector2InputTemplate(item) {
        return `<div id="${item.name}-div" class="btn red" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <div class="d-flex aln-cnt">
                        <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1-1">${item.text1}</h1>
                        <input id="${item.name}-div-textbox-1" data-id="${item.name}" class="mrg-lf-10 mrg-rg-10" type="text" minLength="${item.minLength1}" maxLength="${item.maxLength1}" pattern="${item.pattern1}" placeholder="${item.placeholder1}" value="${item.value1}" />
                    </div>

                    <div class="d-flex aln-cnt">
                        <h1 class="btn-text" id="${item.name}-div-h1-2">${item.text2}</h1>
                        <input id="${item.name}-div-textbox-2" data-id="${item.name}" class="mrg-lf-10 mrg-rg-15" type="text" minLength="${item.minLength2}" maxLength="${item.maxLength2}" pattern="${item.pattern2}" placeholder="${item.placeholder2}" value="${item.value2}" />
                    </div>
                </div>`
    }

    function getMenuVector3InputTemplate(item) {
        return `<div id="${item.name}-div" class="btn red" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1">${item.text}</h1>
                    <input id="${item.name}-div-textbox-1" data-id="${item.name}" class="mrg-lf-10 mrg-rg-10" type="text" minLength="${item.minLength1}" maxLength="${item.maxLength1}" pattern="${item.pattern1}" placeholder="${item.placeholder1}" value="${item.value1}" />
                    <input id="${item.name}-div-textbox-2" data-id="${item.name}" class="mrg-rg-10" type="text" minLength="${item.minLength2}" maxLength="${item.maxLength2}" pattern="${item.pattern2}" placeholder="${item.placeholder2}" value="${item.value2}" />
                    <input id="${item.name}-div-textbox-3" data-id="${item.name}" class="mrg-rg-15" type="text" minLength="${item.minLength3}" maxLength="${item.maxLength3}" pattern="${item.pattern3}" placeholder="${item.placeholder3}" value="${item.value3}" />
                </div>`
    }

    function getMenuRichTextTemplate(item) {
        return `<div class="span-cnt" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <span class="span-text" id="${item.name}-span">${item.text}</span>
                </div>`
    }

    function getMenuTwoCheckboxInputItemTemplate(item) {
        return `<div id="${item.name}-div" class="btn red x-cnt" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <div class="d-flex aln-cnt">
                        <h1 class="btn-text mrg-rg-5" id="${item.name}-div-h1-1">${item.text1}</h1>
                        <input id="${item.name}-div-checkbox-1" class="checkmark mrg-rg-15" type="checkbox"/>
                    </div>

                    <div class="separator"></div>

                    <div class="d-flex aln-cnt">
                        <input id="${item.name}-div-checkbox-2" class="checkmark mrg-lf-15" type="checkbox"/>
                        <h1 class="btn-text mrg-lf-5" id="${item.name}-div-h1-2">${item.text2}</h1>
                    </div>
                </div>`
    }

    function getMenuButtonContainerTemplate(item) {
        return `<div id="${item.name}-div" class="btn red" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1">${item.text}</h1>
                    <div class="btn-menu-img" style="width: 16px; height: 16px; background-image: url('./img/right-chevron.png')"></div>
                </div>`
    }

    function getMenuCheckboxItemTemplate(item) {
        return `<div id="${item.name}-div" class="btn red" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1">${item.text}</h1>
                    <input id="${item.name}-div-checkbox" class="checkmark mrg-rg-15" type="checkbox"/>
                </div>`
    }

    function getMenuListItemTemplate(item) {
        return `<div id="${item.name}-div" class="btn red" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1">${item.text}</h1>

                    <div class="list-content">
                        <div class="selector">
                            <div id="${item.name}-div-lb" data-id="${item.name}" style="background-image: url('./img/right-chevron.png'); transform: rotate(180deg);" class="btn-selector-img"></div>
                        </div>

                        <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1-itemname" style="margin-left: 6px; margin-right: 6px;">${item.itemName}</h1>

                        <div class="selector">
                            <div id="${item.name}-div-rb" data-id="${item.name}" style="background-image: url('./img/right-chevron.png')" class="btn-selector-img"></div>
                        </div>
                    </div>
                </div>`
    }

    function getMenuSelectorItemTemplate(item) {
        return `<div id="${item.name}-div" class="btn red" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1">${item.text}</h1>

                    <div class="list-content">
                        <div id="${item.name}-div-lb" data-id="${item.name}" class="selector">
                            <div style="background-image: url('./img/right-chevron.png'); transform: rotate(180deg);" class="btn-selector-img"></div>
                        </div>

                        <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1-itemname" style="margin-left: 6px; margin-right: 6px;">${item.isFloating ? item.value.toFixed(2) : item.value}/${item.isFloating ? item.max.toFixed(2) : item.max}</h1>
                        
                        <div id="${item.name}-div-rb" data-id="${item.name}" class="selector">
                            <div style="background-image: url('./img/right-chevron.png')" class="btn-selector-img"></div>
                        </div>
                    </div>
                </div>`
    }

    function getMenuBar(step, value) {
        var result = ""

        for (var i = 0; i < step; i++) {
            if (i <= value - 1) {
                // result += `<div class="btn-bar-step" style="width: calc(100% / ${step} - 5px); height: 12px; border-radius: 2px; background: rgba(235, 235, 235, 1);"></div>\n`
                result += `<div class="bar bar-fill"></div>\n`
            } else {
                // result += `<div class="btn-bar-step" style="width: calc(100% / ${step} - 5px); height: 12px; border-radius: 2px; background: rgba(235, 235, 235, 0.25);"></div>\n`
                result += `<div class="bar bar-nofill"></div>\n`
            }
        }

        return result
    }

    function getMenuBarItemTemplate(item) {
        return `<div id="${item.name}-div" class="btn-md red-md" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <div class="wdt-100pr d-flex jst-btw">
                        <div>
                            <h1 id="${item.name}-div-h1" class="btn-text mrg-lf-15 mrg-top-10 mrg-bot-10" data-id="${item.name}">${item.text}</h1>
                        </div>
                        <div class="d-flex jst-btw aln-cnt mrg-rg-15" style="width: 54px;">
                            <div class="selector">
                                <div id="${item.name}-div-lb" data-id="${item.name}" style="background-image: url('./img/minus.png'); transform: rotate(180deg);" class="btn-selector-img"></div>
                            </div>

                            <div class="selector">
                                <div id="${item.name}-div-rb" data-id="${item.name}" style="background-image: url('./img/plus.png')" class="btn-selector-img"></div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex jst-btw" id="${item.name}-btn-bar-container" data-id="${item.name}" style="width: 94%;">

                    </div>
                    <div class="wdt-100pr hgt-100pr">
                        <h1 id="${item.name}-div-h1-description" data-id="${item.name}" class="btn-text-desc mrg-lf-15 mrg-top-10">${item.description}</h1>
                    </div>
                </div>`
    }

    function getMenuTextboxItemTemplate(item) {
        return `<div id="${item.name}-div" class="btn red" data-id="${item.name}" style="display: ${item.visible ? "flex" : "none"}">
                    <h1 class="btn-text mrg-lf-15" data-id="${item.name}" id="${item.name}-div-h1">${item.text}</h1>
                    <input id="${item.name}-div-textbox" data-id="${item.name}" class="mrg-lf-15 mrg-rg-15" type="text" minLength="${item.minLength}" maxLength="${item.maxLength}" pattern="${item.pattern}" placeholder="${item.placeholder}" value="${item.value}" />
                </div>`
    }

    function getMenuTextAreaItemTemplate(item) {
        return `<div class="mrg-bot-5" id="${item.name}-div" data-id="${item.name}" style="display: ${item.visible ? "block" : "none"}; height: 250px;">
                    <div class="btn black">
                        <h1 class="btn-text mrg-lf-15" id="${item.name}-div-h1" data-id="${item.name}">${item.text}</h1>
                    </div>
                    <textarea class="btn-textarea" id="${item.name}-div-textarea" data-id="${item.name}" minLength="${item.minLength}" maxLength="${item.maxLength}" pattern="${item.pattern}" placeholder="${item.placeholder}">${item.value}</textarea>
                </div>`
    }
})