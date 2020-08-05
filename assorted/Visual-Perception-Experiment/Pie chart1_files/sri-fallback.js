function resource_error(element) {
    var fallback_url = element.dataset.fallback;
    var is_js = fallback_url.substr(fallback_url.length - 3) == ".js";

    if (is_js) {
        document.write("<script src='" + fallback_url + "'></script>");
    } else {
        // Assume we have jquery loaded by now
        $('head').append("<link href='" + fallback_url + "' rel='stylesheet'>");
    }
}
