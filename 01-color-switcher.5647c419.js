!function(){var t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]"),isActive:!1};t.start.addEventListener("click",(function(){t.isActive=!0,t.start.disabled=!0,e=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),t.stop.addEventListener("click",(function(){t.isActive=!1,t.start.disabled=!1,clearInterval(e)}));var e=null}();
//# sourceMappingURL=01-color-switcher.5647c419.js.map
