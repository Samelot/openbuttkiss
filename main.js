(function() {
    "use strict";

    var _generator = null,
        _config = null;

    var PLUGIN_ID = require("./package.json").name,
        MENU_ID = "obc",
        MENU_LABEL = "openbuttkiss";

    var oscR = require('node-osc'),
        oscServer = new oscR.Server(3333, '127.0.0.1'),
        toggler = 0,
        psToFront = "app.bringToFront();";

    var colorFlip = "var fColor = app.foregroundColor; app.foregroundColor = app.backgroundColor; app.backgroundColor = fColor;";

    function init(generator, config) {
        _generator = generator;
        _config = config;

        function initLater() {
            _generator.addMenuItem(MENU_ID, MENU_LABEL, true, false).then(
                function () { log("Menu created", MENU_ID); },
                function () { err("Menu creation failed", MENU_ID); }
            );
        }
        process.nextTick(initLater);

        oscServer.on("message", function (msg, rinfo) {
            if(toggler==1 && msg[1]==1){
                actions();
            }
        });

        _generator.onPhotoshopEvent( "generatorMenuChanged", function(event) {
            var menu = event.generatorMenuChanged;
            if (menu && menu.name == MENU_ID) {
                onMenuClicked(menu);
            }
        });
    }

    function actions(){
        _generator.evaluateJSXString(colorFlip);
        _generator.evaluateJSXString(psToFront);
    }

    function onMenuClicked(menu) {
        var startingMenuState = _generator.getMenuState(menu.name);
        var checked = (startingMenuState.checked) ? false : true;
        _generator.toggleMenu(menu.name, true, checked);
        if(checked==true) {
            toggler = 1;
            console.log("OSC enabled!");
        } else {
            toggler = 0;
            console.log("OSC disabled!");
        }
    }
    exports.init = init;
}());

