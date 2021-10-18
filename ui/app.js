import Emitter from 'https://unpkg.com/event-e3@^8/event-e3.js';

class AVG extends Emitter {
    constructor(name, frame) {
        super()

        this.name = name
        this.frame = frame
    }

    get frameName() {
        return this.name;
    }

    log(...args) {
        console.log(...args)
    }

    show() {
        $('#' + this.frame.id).show()
    }

    hide() {
        $('#' + this.frame.id).hide()
    }

    fadeIn(duration) {
        $('#' + this.frame.id).fadeIn(duration)
    }

    fadeOut(duration) {
        $('#' + this.frame.id).fadeOut(duration)
    }

    focus() {
        // this.frame.contentWindow.focus()
        $('#' + this.frame.id).focus()
    }

    setZIndex(index) {
        $('#' + this.frame.id).css({
            'z-index': index
        })
    }

    async send(event, data = null) {
        $.post(`https://avg/${this.name}/${event}`, JSON.stringify({}))
    }
}

$(document).ready(function () {
    // Besoin d'attendre 1 secondes après le chargement du client avant d'appeler l'evenement coté serveur,
    // étant donner qu'il n'est pas encore enregistrer.
    setTimeout(() => {
        $.post(`https://avg/window_ready`, JSON.stringify({}))
    }, 1000);
});

const frames = [];

function load(frameName, url, index) {
    const frameId = "frame-" + frameName
    const frame = document.createElement('iframe')

    frame.id = frameId
    frame.allow = 'microphone *;'
    frame.src = url

    document.getElementById('frames').appendChild(frame)

    frame.contentWindow.avg = new AVG(frameName, frame);

    $("#" + frame.id).fadeOut(0)

    frames.push({
        id: frameId,
        src: url
    })

    $.post("https://avg/frame_ready", JSON.stringify({
        frame: frameName
    }))
};

document.addEventListener('keydown', function (event) {
    $.post("https://avg/keydown", JSON.stringify({
        key: event.keyCode
    }))
})

window.addEventListener('message', e => {
    const data = e.data
    const event = data.eventName;
    const frameName = data.frame || null;

    if (event == 'ui:load_frame') {
        load(frameName, './pages/' + frameName + '/index.html', data.zIndex);
        return;
    }

    if (event == 'ui:emit') {
        var f = frames.find(x => x.id == "frame-" + frameName)
        if (f == undefined || f == null) return;
        var frame = document.getElementById(f.id)
        frame.contentWindow.avg.emit(data.requestType, data.message);
        return;
    }

    if (event == 'ui:show') {
        var f = frames.find(x => x.id == "frame-" + frameName)
        if (f == undefined || f == null) return;
        var frame = document.getElementById(f.id)
        frame.contentWindow.avg.show()
        return;
    }

    if (event == 'ui:hide') {
        var f = frames.find(x => x.id == "frame-" + frameName)
        if (f == undefined || f == null) return;
        var frame = document.getElementById(f.id)
        frame.contentWindow.avg.hide()
        return;
    }
    
    if (event == 'ui:focus') {
        var f = frames.find(x => x.id == "frame-" + frameName)
        if (f == undefined || f == null) return;
        var frame = document.getElementById(f.id)
        frame.contentWindow.avg.focus()
        return;
    }

    if (event == 'ui:fadein') {
        var f = frames.find(x => x.id == "frame-" + frameName)
        if (f == undefined || f == null) return;
        var frame = document.getElementById(f.id)
        frame.contentWindow.avg.fadeIn(data.fade)
        return;
    }

    if (event == 'ui:fadeout') {
        var f = frames.find(x => x.id == "frame-" + frameName)
        if (f == undefined || f == null) return;
        var frame = document.getElementById(f.id)
        frame.contentWindow.avg.fadeOut(data.fade)
        return;
    }

    if (event == 'ui:zindex') {
        var f = frames.find(x => x.id == "frame-" + frameName)
        if (f == undefined || f == null) return;
        var frame = document.getElementById(f.id)
        frame.contentWindow.avg.setZIndex(data.zIndex)
        return;
    }
    
    if (event == 'ui:destroy_frame') {
        var frame = frames.find(x => x.id == "frame-" + frameName)
        var index = frames.indexOf(frame)

        if (index > -1) {
            $("#" + frame.id).remove()
            frames.splice(index, 1)
        }
        return;
    }
});