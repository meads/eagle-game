(function(exports) {
    "use strict" 
    
    window.onload = function() {

    var gameCanvas = document.getElementById("game-canvas")
    gameCanvas.width = window.innerWidth
    gameCanvas.height = window.innerHeight

    var app = new PIXI.Application(window.innerWidth, 384, {view:gameCanvas})
    app.stage = new PIXI.Container()

    document.body.appendChild(app.view)
      
    class Eagle {
        anim
        appHeight = 384
        stepDistance = 10
        direction = {up:false, down:false,left:false,right:false}
        items = {}
        constructor(app) {
            this.createAnimatedSprite(app)
            this.bindKeyboardControls()
        }
        uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
        }
        addItem(item) {
            if (!this.items[item.name]) {
                item.name = this.uuidv4()
                this.items[item.name] = item
            }
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
        update() {
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
            // update items we are carrying
            for (let i = 0, vals = Object.values(this.items); i < vals.length; i++) {
                vals[i].position.y = this.anim.position.y+this.anim.height/5
                vals[i].position.x = this.anim.position.x
            }
        }
    }

    class Cat {
        anim
        constructor(app) {
            this.createAnimatedSprite(app)
        }
        createAnimatedSprite(app) {
            var frames = []
            for (var i = 1; i < 4; i++)
                frames.push(PIXI.Texture.fromFrame('catleft_0' + i + '.png'))

            this.anim = new PIXI.extras.AnimatedSprite(frames)
            this.anim.x = app.view.width
            this.anim.y = 335
            this.anim.anchor.set(0.5)
            this.anim.animationSpeed = 0.25
            this.anim.play()
            app.stage.addChild(this.anim)
        }
        update() {
            if (this.anim.position.x-5 <= 0) {
                this.anim.position.x -= 5
                this.anim.position.x = app.screen.width-50
            } else {
                this.anim.position.x -= 5
            }
        }
    }

    PIXI.loader.add("resources/eagledata.json")
    .on("progress", function (loader, resource) {

        //Display the file `url` currently being loaded
        console.log("loading: " + resource.url); 
        
        //Display the percentage of files currently loaded
        console.log("progress: " + loader.progress + "%"); 
        
        //If you gave your files names as the first argument 
        //of the `add` method, you can access them like this
        console.log("loading: " + resource.name);
    })
    .load(setup)
  
    function setup() {
        var farTexture = PIXI.Texture.fromImage("resources/sky.png")
        var far = new PIXI.extras.TilingSprite(farTexture, window.innerWidth, 384)
        far.position.x = 0
        far.position.y = 0
        far.tilePosition.x = 0
        far.tilePosition.y = 0
        app.stage.addChild(far)
        
        var midTexture = PIXI.Texture.fromImage("resources/forest.png")
        var mid = new PIXI.extras.TilingSprite(midTexture, window.innerWidth, 384)
        mid.position.x = 0
        mid.position.y = 128
        mid.tilePosition.x = 0
        mid.tilePosition.y = 0
        app.stage.addChild(mid)

        var foreTexture = PIXI.Texture.fromImage("resources/platform.png")
        var fore = new PIXI.extras.TilingSprite(foreTexture, window.innerWidth, 384)
        fore.position.x = 0
        fore.position.y = 160
        fore.tilePosition.x = 0
        fore.tilePosition.y = 0
        app.stage.addChild(fore)

        var eagle = new Eagle(app)
        var cats = [new Cat(app)]

        setInterval(() => {
            cats.push(new Cat(app))
        }, 1500)

        app.ticker.add(function() {
            eagle.update()
            cats.forEach(c => {
                c.update()
                if ( hitTest(eagle.anim, c.anim) ) {
                    cats.splice(cats.indexOf(c), 1)
                    c.direction = eagle.direction
                    eagle.addItem(c.anim)
                }
            })
            // parallax scrollng layers
            far.tilePosition.x -= 0.128
            mid.tilePosition.x -= 0.64
            fore.tilePosition.x -= 2.64
        })
    }
}

}(window))