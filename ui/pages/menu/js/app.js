$(() => {
    // $("#menu").fadeOut(0)

    avg.on('open', json => {
        var data = JSON.parse(json)
        // Need to show frame
        // $("#frame-" + data.plugin).fadeIn(250)
        $("#banner-title").text(data.bannerTitle)
        $("#menu").fadeIn(200)

        avg.show()
        avg.focus()
    })

    avg.on('close', json => {
        $("#menu").fadeOut(200, () => {
            avg.hide()
        })
    })

    avg.on('render', json => {
        var data = JSON.parse(json)
        createItems(data)
    })

    avg.on('render_item', json => {
        var data = JSON.parse(json)

        if (data.visible) {
            $(`#${data.id}`).fadeIn(0)
        } else {
            $(`#${data.id}`).fadeOut(0)
        }

        // Active ou Désactive l'item si la propriété disabled à la valeur true / false
        $(`#${data.id}`).attr('disabled', data.disabled)

        if (data.type == "ButtonItem") {
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "RedirectButtonItem") {
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "StoreButtonItem") {
            $(`#${data.id}-dollar`).text(data.dollar)
            $(`#${data.id}-cent`).text(data.cent)
        } else if (data.type == "TextboxItem") {
            $(`#${data.id}-input`).prop("minLength", data.minLength)
            $(`#${data.id}-input`).prop("maxLength", data.maxLength)
            $(`#${data.id}-input`).prop("placeholder", data.placeHolder)
            $(`#${data.id}-input`).prop("value", data.value)
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "Vector2Item") {
            $(`#${data.id}-primary-input`).prop("minLength", data.primaryMinLength)
            $(`#${data.id}-primary-input`).prop("maxLength", data.primaryMaxLength)
            $(`#${data.id}-primary-input`).prop("placeholder", data.primaryPlaceHolder)
            $(`#${data.id}-primary-input`).prop("value", data.primaryValue)
            $(`#${data.id}-secondary-input`).prop("minLength", data.secondaryMinLength)
            $(`#${data.id}-secondary-input`).prop("maxLength", data.secondaryMaxLength)
            $(`#${data.id}-secondary-input`).prop("placeholder", data.secondaryPlaceHolder)
            $(`#${data.id}-secondary-input`).prop("value", data.secondaryValue)
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "Vector3Item") {
            $(`#${data.id}-primary-input`).prop("minLength", data.primaryMinLength)
            $(`#${data.id}-primary-input`).prop("maxLength", data.primaryMaxLength)
            $(`#${data.id}-primary-input`).prop("placeholder", data.primaryPlaceHolder)
            $(`#${data.id}-primary-input`).prop("value", data.primaryValue)
            $(`#${data.id}-secondary-input`).prop("minLength", data.secondaryMinLength)
            $(`#${data.id}-secondary-input`).prop("maxLength", data.secondaryMaxLength)
            $(`#${data.id}-secondary-input`).prop("placeholder", data.secondaryPlaceHolder)
            $(`#${data.id}-secondary-input`).prop("value", data.secondaryValue)
            $(`#${data.id}-tertiary-input`).prop("minLength", data.tertiaryMinLength)
            $(`#${data.id}-tertiary-input`).prop("maxLength", data.tertiaryMaxLength)
            $(`#${data.id}-tertiary-input`).prop("placeholder", data.tertiaryPlaceHolder)
            $(`#${data.id}-tertiary-input`).prop("value", data.tertiaryValue)
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "SelectItem") {
            $(`#${data.id}-text`).text(data.text)
            $(`#${data.id}-item`).text(data.item)
        } else if (data.type == "SliderItem") {
            $(`#${data.id}-slider`).prop("min", data.min)
            $(`#${data.id}-slider`).prop("max", data.max)
            $(`#${data.id}-slider`).prop("step", data.step)
            $(`#${data.id}-slider`).prop("value", data.value)
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "SelectSliderItem") {
            $(`#${data.id}-slider`).prop("min", data.min)
            $(`#${data.id}-slider`).prop("max", data.max)
            $(`#${data.id}-slider`).prop("step", data.step)
            $(`#${data.id}-slider`).prop("value", data.value)
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "CheckboxItem") {
            $(`#${data.id}-checkbox`).prop("checked", data.isChecked)
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "BottomButtonItem") {
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "LabelItem") {
            $(`#${data.id}-text`).text(data.text)
        } else if (data.type == "StoreMenuInfo") {
            $(`#${data.id}-title`).text(data.title)
            $(`#${data.id}-description`).text(data.description)
            $(`#${data.id}-weight`).text(data.weight)
            $(`#${data.id}-sellablePrice`).text(data.sellablePrice)
        } else if (data.type == "StatsMenuInfo") {
            for (var i = 0; i < data.items.length; i++) {
                var stat = data.items[i]
                $(`#${stat.id}-label`).text(stat.label)
                $(`#${stat.id}-fill`).css({
                    'width': stat.percentage * 250 + 'px'
                })
            }
        }
    })

    function createItems(data) {
        clearTopContainerRender()
        clearBottomContainerRender()
        clearMiddleContainerRender()

        for (var i = 0; i < data.topContainer.length; i++) {
            var item = data.topContainer[i]

            switch (item.type) {
                case "ButtonItem":
                    var template = getButtonItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForButtonItem(item)
                    break;
                case "RedirectButtonItem":
                    var template = getRedirectButtonItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForButtonItem(item)
                    break;
                case "StoreButtonItem":
                    var template = getStoreButtonItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForButtonItem(item)
                    break;
                case "TextboxItem":
                    var template = getTextboxItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForTextboxItem(item)
                    break;
                case "Vector2Item":
                    var template = getVector2ItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForVector2Item(item)
                    break;
                case "Vector3Item":
                    var template = getVector3ItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForVector3Item(item)
                    break;
                case "SelectItem":
                    var template = getSelectItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForSelectItem(item)
                    break;
                case "SliderItem":
                    var template = getSliderItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForSliderItem(item)
                    break;
                case "SelectSliderItem":
                    var template = getSelectSliderItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForSelectSliderItem(item)
                    break;
                case "CheckboxItem":
                    var template = getCheckboxItemTemplate(item)
                    $("#top-container").append(template)
                    addEventHandlerForCheckboxItem(item)
                    break;
                case "SeparatorItem":
                    var template = null

                    switch (item.separatorType) {
                        case 0:
                            template = getSeparatorUpItemTemplate(item)
                            break;
                        case 1:
                            template = getSeparatorDownItemTemplate(item)
                            break;
                        case 2:
                            template = getSeparatorUpArrowItemTemplate(item)
                            break;
                        case 3:
                            template = getSeparatorDownArrowItemTemplate(item)
                            break;
                    }

                    $("#top-container").append(template)
                    break;
            }
        }

        for (var i = 0; i < data.bottomContainer.length; i++) {
            var item = data.bottomContainer[i]

            switch (item.type) {
                case "BottomButtonItem":
                    var template = getBottomButtonItemTemplate(item)
                    $("#bottom-container").append(template)
                    addEventHandlerForButtonItem(item)
                    break;
                case "LabelItem":
                    var template = getLabelItemTemplate(item)
                    $("#bottom-container").append(template)
                    break;
            }
        }

        switch (data.middleContainer.type) {
            case "StoreMenuInfo":
                var template = getStoreMenuInfoTemplate(data.middleContainer)
                $("#middle-container").append(template)
                break;
            case "StatsMenuInfo":
                var template = getStatsMenuInfoTemplate(data.middleContainer)
                $("#middle-container").append(template)

                for (var i = 0; i < data.middleContainer.items.length; i++) {
                    var stat = data.middleContainer.items[i]
                    var template = getStatTemplate(stat)
                    $(`#${data.middleContainer.id}-container`).append(template)
                }
                break;
        }
    }

    document.addEventListener('keydown', function (event) {
        $.post("https://avg/menu/keydown", JSON.stringify({
            key: event.keyCode
        }))
    })

    function addEventHandlerForButtonItem(item) {
        $(`#${item.id}`).unbind().on('click', function (e) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: e.target.id,
                type: $(this).data("type")
            }))
        })
    }

    function addEventHandlerForTextboxItem(item) {
        $(`#${item.id}-input`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                value: e.target.value,
                type: $(`#${item.id}`).data("type")
            }))
        })
    }

    function addEventHandlerForVector2Item(item) {
        $(`#${item.id}-primary-input`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                primaryValue: $(`#${item.id}-primary-input`).val(),
                secondaryValue: $(`#${item.id}-secondary-input`).val(),
                type: $(`#${item.id}`).data("type")
            }))
        })

        $(`#${item.id}-secondary-input`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                primaryValue: $(`#${item.id}-primary-input`).val(),
                secondaryValue: $(`#${item.id}-secondary-input`).val(),
                type: $(`#${item.id}`).data("type")
            }))
        })
    }

    function addEventHandlerForVector3Item(item) {
        $(`#${item.id}-primary-input`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                primaryValue: $(`#${item.id}-primary-input`).val(),
                secondaryValue: $(`#${item.id}-secondary-input`).val(),
                tertiaryValue: $(`#${item.id}-tertiary-input`).val(),
                type: $(`#${item.id}`).data("type")
            }))
        })

        $(`#${item.id}-secondary-input`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                primaryValue: $(`#${item.id}-primary-input`).val(),
                secondaryValue: $(`#${item.id}-secondary-input`).val(),
                tertiaryValue: $(`#${item.id}-tertiary-input`).val(),
                type: $(`#${item.id}`).data("type")
            }))
        })

        $(`#${item.id}-tertiary-input`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                primaryValue: $(`#${item.id}-primary-input`).val(),
                secondaryValue: $(`#${item.id}-secondary-input`).val(),
                tertiaryValue: $(`#${item.id}-tertiary-input`).val(),
                type: $(`#${item.id}`).data("type")
            }))
        })
    }

    function addEventHandlerForSelectItem(item) {
        $(`#${item.id}-previous`).unbind().on('click', function (e) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                selectType: "-",
                type: $(`#${item.id}`).data("type")
            }))
        })

        $(`#${item.id}-next`).unbind().on('click', function (e) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                selectType: "+",
                type: $(`#${item.id}`).data("type")
            }))
        })
    }

    function addEventHandlerForSliderItem(item) {
        $(`#${item.id}-slider`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                value: e.target.value,
                type: $(`#${item.id}`).data("type")
            }))
        })
    }

    function addEventHandlerForSelectSliderItem(item) {
        $(`#${item.id}-slider`).unbind().on("input", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                value: e.target.value,
                selectType: "*",
                type: $(`#${item.id}`).data("type")
            }))
        })

        $(`#${item.id}-previous`).unbind().on('click', function (e) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                value: $(`#${item.id}-slider`).val(),
                selectType: "-",
                type: $(`#${item.id}`).data("type")
            }))
        })

        $(`#${item.id}-next`).unbind().on('click', function (e) {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                value: $(`#${item.id}-slider`).val(),
                selectType: "+",
                type: $(`#${item.id}`).data("type")
            }))
        })
    }

    function addEventHandlerForCheckboxItem(item) {
        $(`#${item.id}-checkbox`).unbind().on("change", (e) => {
            $.post("https://avg/menu/on_click", JSON.stringify({
                id: item.id,
                isChecked: e.target.checked,
                type: $(`#${item.id}`).data("type")
            }))
        })
    }

    function clearTopContainerRender() {
        $("#top-container").empty()
    }

    function clearBottomContainerRender() {
        $("#bottom-container").empty()
    }

    function clearMiddleContainerRender() {
        $("#middle-container").empty()
    }

    // style="display: ${item.visible ? "flex" : "none"}"

    // Top Container
    function getButtonItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="btn" style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <div class="crafting-highlight npe"></div>
                </div>`
    }

    function getRedirectButtonItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="redirect-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <div class="npe" style="display: flex; align-items: flex-start; margin-right: 15px;">
                        <div class="ico arrow-right npe"></div>
                    </div>
                    <div class="crafting-highlight npe"></div>
                </div>`
    }

    function getStoreButtonItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="store-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <div class="npe" style="display: flex; align-items: flex-start; margin-right: 15px;">
                        <span id="${item.id}-dollar" class="store-btn-text npe">${item.dollar}</span>
                        <span id="${item.id}-cent" class="store-btn-text td-under npe"
                            style="font-size: 16px; margin-top: 3px; margin-left: 2px;">${item.cent}</span>
                    </div>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getTextboxItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="textbox-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <input id="${item.id}-input" type="text" minLength="${item.minLength}" maxLength="${item.maxLength}" placeholder="${item.placeHolder}" value="${item.value}"></input>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getVector2ItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="vector2-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <input id="${item.id}-primary-input" type="text" minLength="${item.primaryMinLength}" maxLength="${item.primaryMaxLength}" placeholder="${item.primaryPlaceHolder}" value="${item.primaryValue}"></input>
                    <input id="${item.id}-secondary-input" type="text" minLength="${item.secondaryMinLength}" maxLength="${item.secondaryMaxLength}" placeholder="${item.secondaryPlaceHolder}" value="${item.secondaryValue}"></input>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getVector3ItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="vector3-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <input id="${item.id}-primary-input" type="text" minLength="${item.primaryMinLength}" maxLength="${item.primaryMaxLength}" placeholder="${item.primaryPlaceHolder}" value="${item.primaryValue}"></input>
                    <input id="${item.id}-secondary-input" type="text" minLength="${item.secondaryMinLength}" maxLength="${item.secondaryMaxLength}" placeholder="${item.secondaryPlaceHolder}" value="${item.secondaryValue}"></input>
                    <input id="${item.id}-tertiary-input" type="text" minLength="${item.tertiaryMinLength}" maxLength="${item.tertiaryMaxLength}" placeholder="${item.tertiaryPlaceHolder}" value="${item.tertiaryValue}"></input>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getSelectItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="select-btn" ${item.disabled ? "disabled" : ""}style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">Color</span>
                    <div class="select-cnt">
                        <div id="${item.id}-previous" class="ico arrow-left"></div>
                        <span id="${item.id}-item" class="btn-text npe">${item.item}</span>
                        <div id="${item.id}-next" class="ico arrow-right"></div>
                    </div>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getSliderItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="slider-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <div class="slider-cnt">
                        <input id="${item.id}-slider" type="range" min="${item.min}" max="${item.max}" step="${item.step}" value="${item.value}">
                    </div>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getSelectSliderItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="slider-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text npe">${item.text}</span>
                    <div class="slider-cnt">
                        <div id="${item.id}-previous" class="ico arrow-left"></div>    
                        <input id="${item.id}-slider" type="range" min="${item.min}" max="${item.max}" step="${item.step}" value="${item.value}">
                        <div id="${item.id}-next" class="ico arrow-right"></div>
                    </div>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getCheckboxItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="checkbox-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-text" class="btn-text">${item.text}</span>
                    <div class="checkbox-cnt"
                        style="display: flex; align-items: flex-start; margin-right: 15px;">
                        <input id="${item.id}-checkbox" type="checkbox" checked="${item.isChecked}"">
                        <span class="checkmark npe"></span>
                    </div>
                    <div class="crafting-highlight"></div>
                </div>`
    }

    function getSeparatorUpItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="separator-cnt" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <div class="separator-divider-up"></div>
                </div>`
    }

    function getSeparatorDownItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="separator-cnt" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <div class="separator-divider-down"></div>
                </div>`
    }

    function getSeparatorUpArrowItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="separator-cnt" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <div class="separator-up"></div>
                    <div class="separator-arrow-up"></div>
                    <div class="separator-up"></div>
                </div>`
    }

    function getSeparatorDownArrowItemTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="separator-cnt" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <div class="separator-down"></div>
                    <div class="separator-arrow"></div>
                    <div class="separator-down"></div>
                </div>`
    }

    // Bottom Container
    function getBottomButtonItemTemplate(item) {
        return `<span id="${item.id}" data-type="${item.type}" class="menu-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">${item.text}</span>`
    }

    function getLabelItemTemplate(item) {
        return `<divspan id="${item.id}" data-type="${item.type}" class="label-btn" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <div class="label-cnt" style="display: flex;">
                        <div class="ico dollar-ico"></div>
                        <span id="${item.id}-text" class="btn-text">${item.text}</span>
                    </div>
                </div>`
    }

    // Middle Container
    function getStoreMenuInfoTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" ${item.disabled ? "disabled" : ""} style="width: 100%; padding: 30px 0px; display: ${item.visible ? "flex" : "none"}">
                    <h1 id="${item.id}-title">${item.title}</h1>
                    <h2 id="${item.id}-description" style="margin-top: 10px;">${item.description}</h2>
                    <div
                        style="display: flex; justify-content: space-around; align-items: center; margin-top: 20px; margin-bottom: 0px;">
                        <div style="display: flex; justify-content: flex-start; align-items: center;">
                            <div class="ico weight-ico"></div>
                            <h3 id="${item.id}-weight">${item.weight}</h3>
                        </div>
                        <div style="display: flex; justify-content: flex-start; align-items: center;">
                            <div class="ico dollar-ico"></div>
                            <h3 id="${item.id}-sellablePrice">${item.sellablePrice}</h3>
                        </div>
                    </div>
                </div>`
    }

    function getStatTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="stats" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <span id="${item.id}-label">${item.label}</span>
                    <div style="background: transparent; display: flex;">
                        <div class="stats-bg-${item.statsType}"></div>
                        <div id="${item.id}-fill" class="stats-fill-${item.statsType}" style="width: ${item.percentage * 250}px;"></div>
                    </div>
                </div>`
    }

    function getStatsMenuInfoTemplate(item) {
        return `<div id="${item.id}" data-type="${item.type}" class="stats-store-info" ${item.disabled ? "disabled" : ""} style="display: ${item.visible ? "flex" : "none"}">
                    <div id="${item.id}-container" class="stats-cnt">
                        
                    </div>
                </div>`
    }
})