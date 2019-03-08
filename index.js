(function(exports) {
    "use strict" 
    var app
    var far    
    var mid
    var fore
    var eagleDirection = {
        up:false, 
        down:false,
        left:false,
        right:false
    }
    var eagleFlyingRight
    const appHeight = 384

    var stage
    var renderer

    function init() {
        try { new Audio('resources/bald-eagle.mp3').play() } catch {}
        var gameCanvas = document.getElementById("game-canvas")
        console.log(gameCanvas)
        gameCanvas.width = window.innerWidth
        gameCanvas.height = window.innerHeight
        app = new PIXI.Application(window.innerWidth, appHeight, {view:gameCanvas})
        document.body.appendChild(app.view)
        app.stage = new PIXI.Container()

        PIXI.loader.add("resources/eagledata.json").load(function() {

            renderer = PIXI.autoDetectRenderer(window.innerWidth, appHeight, {view:gameCanvas})

            var farTexture = PIXI.Texture.fromImage("resources/country-platform-back.png")
            far = new PIXI.extras.TilingSprite(farTexture, window.innerWidth, appHeight)
            far.position.x = 0
            far.position.y = 0
            
            far.tilePosition.x = 0
            far.tilePosition.y = 0
            app.stage.addChild(far)
            
            var midTexture = PIXI.Texture.fromImage("resources/country-platform-forest.png")
            mid = new PIXI.extras.TilingSprite(midTexture, window.innerWidth, appHeight)
            mid.position.x = 0
            mid.position.y = 128
            mid.tilePosition.x = 0
            mid.tilePosition.y = 0
            app.stage.addChild(mid)
    
            var foreTexture = PIXI.Texture.fromImage("resources/country-platform-tiles-example.png")
            fore = new PIXI.extras.TilingSprite(foreTexture, window.innerWidth, appHeight)
            fore.position.x = 0
            fore.position.y = 160
            fore.tilePosition.x = 0
            fore.tilePosition.y = 0
            app.stage.addChild(fore)
    
            var frames = []

            for (var i = 0; i < 3; i++) {
                frames.push(PIXI.Texture.fromFrame('flyright_0' + i + '.png'))
            }

            var anim = new PIXI.extras.AnimatedSprite(frames)
            anim.x = app.screen.width / 2
            anim.y = app.screen.height / 2
            anim.anchor.set(0.5)
            anim.animationSpeed = 0.5
            anim.play()

            app.stage.addChild(anim)

            let arrowUp = keyboard("ArrowUp")
            arrowUp.press = () => eagleDirection.up = true
            arrowUp.release = () => eagleDirection.up = false

            let arrowDown = keyboard("ArrowDown")
            arrowDown.press = () => eagleDirection.down = true
            arrowDown.release = () => eagleDirection.down = false            

            let arrowLeft = keyboard("ArrowLeft")
            arrowLeft.press = () => eagleDirection.left = true
            arrowLeft.release = () => eagleDirection.left = false            

            let arrowRight = keyboard("ArrowRight")
            arrowRight.press = () => eagleDirection.right = true
            arrowRight.release = () => eagleDirection.right = false            

            app.ticker.add(function() {
                if (eagleDirection.up) {
                    if (anim.position.y <= 16) {
                        anim.position.y = 16
                    } else {
                        anim.position.y -= 5
                    }
                }
                if (eagleDirection.down) {
                    if(anim.position.y >= (appHeight-40)) {
                        anim.position.y = appHeight-40
                    } else {
                        anim.position.y += 5
                    }
                }
                if (eagleDirection.right) {
                    if (anim.position.x+5 >= window.innerWidth-16) {
                        anim.position.x = window.innerWidth-16
                    } else {
                        anim.position.x  += 5
                    }
                } 
                if (eagleDirection.left) {
                    if (anim.position.x-5 <= 16) {
                        anim.position.x = 16
                    } else {
                        anim.position.x -= 5
                    }
                }
                far.tilePosition.x -= 0.128
                mid.tilePosition.x -= 0.64
                fore.tilePosition.x -= 2.64
            })
        })
    }
    
    window.onload = init

}(window))