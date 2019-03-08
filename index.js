(function(exports) {
    "use strict"; 

    var far;    
    var mid;
    var fore;
    var eagleFlyingRight;

    var stage;
    var renderer;

    function init() {
        stage = new PIXI.Container()

        let gameCanvas = document.getElementById("game-canvas")
        gameCanvas.width = window.innerWidth
        gameCanvas.height = window.innerHeight

        PIXI.loader.add("resources/eagledata.json").load(function() {
            renderer = PIXI.autoDetectRenderer(
                window.innerWidth,
                384,
                {view:gameCanvas}
            )
            
            var farTexture = PIXI.Texture.fromImage("resources/country-platform-back.png")
            far = new PIXI.extras.TilingSprite(farTexture, window.innerWidth, 384)
            far.position.x = 0
            far.position.y = 0
            far.tilePosition.x = 0
            far.tilePosition.y = 0
            stage.addChild(far)
    
            var midTexture = PIXI.Texture.fromImage("resources/country-platform-forest.png")
            mid = new PIXI.extras.TilingSprite(midTexture, window.innerWidth, 384)
            mid.position.x = 0
            mid.position.y = 128
            mid.tilePosition.x = 0
            mid.tilePosition.y = 0
            stage.addChild(mid)
    
            var foreTexture = PIXI.Texture.fromImage("resources/country-platform-tiles-example.png")
            fore = new PIXI.extras.TilingSprite(foreTexture, window.innerWidth, 384)
            fore.position.x = 0
            fore.position.y = 160
            fore.tilePosition.x = 0
            fore.tilePosition.y = 0
            stage.addChild(fore)
    
            let sheet = PIXI.loader.resources["resources/eagledata.json"]
            
            eagleFlyingRight = new PIXI.Sprite(sheet.textures["flyright_00.png"])
            stage.addChild(eagleFlyingRight)

            requestAnimationFrame(update)
        })
    }

    function update() {
        far.tilePosition.x -= 0.128
        mid.tilePosition.x -= 0.64
        fore.tilePosition.x -= 2.64
    
        renderer.render(stage)
    
        requestAnimationFrame(update)
    }

    window.onload = init;
}(window));