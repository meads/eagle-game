(function(exports) { "use strict";

    window.onload = function() {
        let stage = new PIXI.Container();
        let renderer = PIXI.autoDetectRenderer(
            512,
            384,
            {view:document.getElementById("game-canvas")}
        );
    }

}(window))
