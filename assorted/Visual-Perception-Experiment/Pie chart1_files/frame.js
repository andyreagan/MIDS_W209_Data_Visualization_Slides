// If we're in a frame, e.g. mturk, don't show the header

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

$(document).ready(function() {
    if(inIframe()) {
        $(".header").hide()
    }
})
