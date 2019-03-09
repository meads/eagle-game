(function(exports) {
    "use strict" 
    var app
    var far
    var mid
    var fore

    function init() {
        try { new Audio('resources/bald-eagle.mp3').play() } catch {}
        var gameCanvas = document.getElementById("game-canvas")
        gameCanvas.width = window.innerWidth
        gameCanvas.height = window.innerHeight
        app = new PIXI.Application(window.innerWidth, 384, {view:gameCanvas})
        document.body.appendChild(app.view)
        app.stage = new PIXI.Container()

        class Eagle {
            anim
            appHeight = 384
            stepDistance = 10
            direction = {
                up:false, 
                down:false,
                left:false,
                right:false
            }
            load(app) {
                this.createAnimatedSprite(app)
                this.bindKeyboardControls()
            }
            bindKeyboardControls() {
                let arrowUp = keyboard("ArrowUp")
                arrowUp.press = () => this.direction.up = true
                arrowUp.release = () => this.direction.up = false

                let arrowDown = keyboard("ArrowDown")
                arrowDown.press = () => this.direction.down = true
                arrowDown.release = () => this.direction.down = false            

                let arrowLeft = keyboard("ArrowLeft")
                arrowLeft.press = () => this.direction.left = true
                arrowLeft.release = () => this.direction.left = false            

                let arrowRight = keyboard("ArrowRight")
                arrowRight.press = () => this.direction.right = true
                arrowRight.release = () => this.direction.right = false            

            }
            createAnimatedSprite(app) {
                var frames = []
                for (var i = 1; i < 4; i++)
                    frames.push(PIXI.Texture.fromFrame('flyright_0' + i + '.png'))

                this.anim = new PIXI.extras.AnimatedSprite(frames)
                this.anim.x = app.screen.width / 2
                this.anim.y = app.screen.height / 2
                this.anim.anchor.set(0.5)
                this.anim.animationSpeed = 0.25
                this.anim.play()
                app.stage.addChild(this.anim)
            }
            tick() {
                if (this.direction.up) {
                    if (this.anim.position.y <= 56) {
                        this.anim.position.y = 56
                    } else {
                        this.anim.position.y -= this.stepDistance
                    }
                }
                if (this.direction.down) {
                    if(this.anim.position.y >= (this.appHeight-60)) {
                        this.anim.position.y = this.appHeight-60
                    } else {
                        this.anim.position.y += this.stepDistance
                    }
                }
                if (this.direction.right) {
                    if (this.anim.position.x+this.stepDistance >= window.innerWidth-56) {
                        this.anim.position.x = window.innerWidth-56
                    } else {
                        this.anim.position.x  += this.stepDistance
                    }
                } 
                if (this.direction.left) {
                    if (this.anim.position.x-this.stepDistance <= 56) {
                        this.anim.position.x = 56
                    } else {
                        this.anim.position.x -= this.stepDistance
                    }
                }
            }
        }


        PIXI.loader.add("resources/eagledata.json").load(() => {
            var farTexture = PIXI.Texture.fromImage("resources/sky.png")
            far = new PIXI.extras.TilingSprite(farTexture, window.innerWidth, 384)
            far.position.x = 0
            far.position.y = 0
            far.tilePosition.x = 0
            far.tilePosition.y = 0
            app.stage.addChild(far)
            
            var midTexture = PIXI.Texture.fromImage("resources/forest.png")
            mid = new PIXI.extras.TilingSprite(midTexture, window.innerWidth, 384)
            mid.position.x = 0
            mid.position.y = 128
            mid.tilePosition.x = 0
            mid.tilePosition.y = 0
            app.stage.addChild(mid)
    
            var foreTexture = PIXI.Texture.fromImage("resources/platform.png")
            fore = new PIXI.extras.TilingSprite(foreTexture, window.innerWidth, 384)
            fore.position.x = 0
            fore.position.y = 160
            fore.tilePosition.x = 0
            fore.tilePosition.y = 0
            app.stage.addChild(fore)
    
            var eagle = new Eagle()
            eagle.load(app)
            
            app.ticker.add(function() {
                eagle.tick()

                // parallax scrollng layers
                far.tilePosition.x -= 0.128
                mid.tilePosition.x -= 0.64
                fore.tilePosition.x -= 2.64
            })
        })
    }
    
    window.onload = init

}(window))