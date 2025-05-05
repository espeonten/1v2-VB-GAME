var p, pI, pJI, pSI, pBI, pSetI, pFI, pFSetI, pRI
var opp, oppI, oppSI
var blocker
var net
var ball, ballI
var restartButton, restartBI
var invisibleWall
var winSound
var loseSound
var pAction = "readyingForServe"
var winner = ""
var lastPersonWhoHitTheBall = ""
var lastPAction = ""
var gamestate = "play"
var deciderForSpike, deciderForSpike2
var netEdge
var tooHard = false
var jumpServe = false
var canRun = true
var timer = 0
var speed = 15



function preload() {
    pI = loadAnimation("p.png")
    pJI = loadAnimation("p-jump.png")
    pSI = loadAnimation("p-swing.png")
    pBI = loadAnimation("p-bump.png")
    pSetI = loadAnimation("p-set.png")
    pFSetI = loadAnimation("p-forward-set.png")
    pFI = loadAnimation("p-bump.png", "p-floss.png")
    pRI = loadAnimation("p-run-1.png", "p.png", "p-run-2.png")

    oppI = loadAnimation("opp.png")
    oppSI = loadAnimation("opp-surprised.png")

    bI = loadImage("opp.png")
    
    ballI = loadImage("ball.png")

    restartBI = loadImage("playAgain.png")

    winSound = loadSound("win.mp3")
    loseSound = loadSound("lose.mp3")
}
  

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    edges = createEdgeSprites()

    deciderForSpike = createSprite(width/2.56, height/1.1, 1)
    deciderForSpike2 = createSprite(width/6, height/1.1, 1)

    p = createSprite(width/5, height/1.1)
    p.addAnimation("reg", pI)
    p.addAnimation("jump", pJI)
    p.addAnimation("swing", pSI)
    p.addAnimation("bump", pBI)
    p.addAnimation("set", pSetI)
    p.addAnimation("forward-set", pFSetI)
    p.addAnimation("dance", pFI)
    p.addAnimation("run", pRI)
    p.changeAnimation("reg")

    opp = createSprite(width/1.2, height/1.1)
    opp.addAnimation("reg", oppI)
    opp.addAnimation("surp", oppSI)
    opp.changeAnimation("reg")

    blocker = createSprite(width/1.86, height/1.1)
    blocker.addImage(bI)

    invisibleWall = createSprite(width/2, height, width/50, height*10)
    invisibleWall.shapeColor = "white"

    net = createSprite(width/2, height/1.054, width/75, height/6)
    net.shapeColor = "black"

    netEdge = createSprite(width/2, height/1.156, width/75, height/1000)
    netEdge.shapeColor = "black"

    ball = createSprite(width/2, height/2)
    ball.addImage(ballI)
    ball.scale = 0.15

    restartB = createSprite(width/2, height/1.5)
    restartB.addImage(restartBI)
    restartB.visible = false
}


function draw() {
    background("white")

    deciderForSpike.visible = false
    deciderForSpike2.visible = false

    console.log(canRun)
    
    
    if(gamestate == "play"){
        restartB.visible = false
        p.visible = true
        opp.visible = true
        blocker.visible = true
        ball.visible = true
        net.visible = true
        netEdge.visible = true
        invisibleWall.visible = true

        p.velocityY+= 0.3
        opp.velocityY+= 0.3
        blocker.velocityY+= 0.3


        console.log(timer, speed)
        if(frameCount % 30 == 0 && pAction == "play") {
            timer += 1
        }

        if(p.y >= 900){
            canRun = true
            p.changeAnimation("reg")
        }
        else{
            canRun = false
            p.changeAnimation("jump")
        }

        if(keyDown("left") && canRun == true){
            p.changeAnimation("run")
        }
        else if(keyDown("right") && canRun == true){
            p.changeAnimation("run")
        }

        if(keyDown("up") && p.collide(edges)){
            p.changeAnimation("jump")
            p.velocityY= -15
            if(blocker.collide(edges)){
                blocker.velocityY = -11
            }
            
        }
        else if(keyDown("right")){
            p.x+=6
        }
        else if(keyDown("left")){
            p.x-=6
        }
        if(keyDown("space" || keyDown("x"))){
            p.changeAnimation("swing")
        }
        if(keyDown("down")){
            p.changeAnimation("bump")
        }
        if(keyDown("shift") || keyDown("z")){
            p.changeAnimation("set")
        }
        if(keyDown("g")){
            p.changeAnimation("dance")
        }
        if(keyDown("x")){
            p.changeAnimation("swing")
        }
        if(keyDown("right") && keyDown("up") && keyDown("z")){
            p.changeAnimation("forward-set")
        }

        if(pAction == "play" && ball.x >= invisibleWall.x + 100){
            if(ball.x > opp.x){
                opp.velocityX= speed
            }
            if(ball.x < opp.x){
                opp.velocityX= -speed
            }

            if(pAction != "readyingForServe"){
                ball.velocityY+=0.3
            }
        }
        else{
            opp.x = width/1.2
        }

        if(timer == 10){
            speed = 14
            timer = 11
        }
        else if(timer == 20){
            speed = 13
            timer = 21
        }
        else if(timer == 30){
            speed = 12
            timer = 31
        }
        else if(timer == 40){
            speed = 11
            timer = 41
        }
        else if(timer == 50){
            speed = 10
            timer = 51
        }

        if(ball.isTouching(opp)){
            if(tooHard == true){
                opp.changeAnimation("surp")
                ball.velocityX= -75
                ball.velocityY= -50
            }
            else{
                if(ball.x >width/2 && ball.x <width/1.3){
                    ball.velocityX= -7
                    ball.velocityY= -15
                }
                if(ball.x >width/1.3 && ball.x <width){
                    ball.velocityX= -15
                    ball.velocityY= -15
                }}
        }
        

        if(ball.isTouching(blocker)){
            if(lastPAction != "spike"){
                ball.velocityX = -1
                ball.velocityY = 115
            }
            if(tooHard==true){
                ball.velocityX = -1
                ball.velocityY = -115
                tooHard = false
            }
            else if(tooHard == false){
                ball.velocityX = -3
                ball.velocityY = -15
            }
        }

        if(ball.collide(edges[0])){
            winSound.play()
            winner = "p"
            gamestate = "end"
        }
        if(ball.collide(edges[1])){
            loseSound.setVolume(8)
            loseSound.play()
            winner = "opp"
            gamestate = "end"
        }
        
        if(ball.collide(edges[3])){
            if(ball.x < (width/2)){
                loseSound.setVolume(8)
                loseSound.play()
                winner = "opp"
                gamestate = "end"
            }
            else if(ball.x > (width/2)){
                winSound.play()
                winner = "p"
                gamestate = "end"
            }
        }


        if(pAction != "readyingForServe"){
            ball.velocityY+= 0.2
        }

        if(ball.collide(netEdge)){
            ball.x = netEdge.x+100
            ball.y = netEdge.y
            ball.velocityX = 10
        }

        p.collide(edges)
        opp.collide(edges)
        blocker.collide(edges)
        p.collide(invisibleWall)
        opp.collide(invisibleWall)
        ball.collide(edges)
        ball.bounceOff(net)

        action(deciderForSpike, deciderForSpike2)
    }
    else if(gamestate == "end"){
        p.changeAnimation("reg")
        opp.changeAnimation("reg")
        tooHard = false
        restartB.visible = true
        p.visible = false
        opp.visible = false
        blocker.visible = false
        ball.visible = false
        net.visible = false
        netEdge.visible = false
        invisibleWall.visible = false
        speed = 15
        p.y = height/ 1.1
        opp.y = height/ 1.1
        blocker.y = height/ 1.1

        timer = 0

        if(winner == "p"){
            background("green")
            textSize(50)
            fill("pink")
            text("You WON!" , width/2.3, height/2)
            if(mousePressedOver(restartB)){
                ball.y=height/2
                winner = ""
                pAction = "readyingForServe"
                gamestate = "play"
                p.y = height/1.2
                p.x = width/5
            }
        }
        else if(winner == "opp"){
            background("red")
            textSize(50)
            fill("white")
            text("You lost..." , width/2.3, height/2)
            if(mousePressedOver(restartB)){
                ball.y=height/2
                winner = ""
                pAction = "readyingForServe"
                gamestate = "play"
                p.y = height/1.2
                p.x = width/5
            }
        }
    }
    drawSprites()
}
