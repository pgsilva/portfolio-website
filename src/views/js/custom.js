
(function ($) {
    "use strict";

    $(window).on('load', () => {
        console.log("hello world")
        const colors = ["#333399", "#ff00cc", "#00a100", "#ff2b36", "#2bc3ff", "#ff922b"]
        const color = colors[Math.floor(Math.random() * colors.length)];

        $("body").get(0).style.setProperty("--main-bg-color", color);
        $("body").get(0).style.setProperty("--main-color", color);
    });

}(jQuery));