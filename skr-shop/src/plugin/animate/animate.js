import Vue from 'vue'
let apis = {
    animateScroll(from, to, callback) {
        let timer = setInterval(function () {
            from = from + (to - from) / 10;
            from = to - from > 0 ? Math.ceil(from) : Math.floor(from);
            if (from == to) {
                clearInterval(timer);
                if (typeof callback == "function") callback()
            }
            document.documentElement.scrollTop = from + 1;
        }, 11.1);
    },
}
export default {
    apis
}



