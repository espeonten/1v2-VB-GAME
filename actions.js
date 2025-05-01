function action(sprite, sprite2){
    if(pAction == "readyingForServe"){
        ball.x = p.x+30
        ball.y = p.y+20
        if(keyDown("space")){
            pAction = "serve"
        }
    }
    else if(pAction == "serve"){
        if(keyDown("right")){
            ball.velocityX = 2
            ball.velocityY = -15
        }
        else{
            ball.velocityX = 0
            ball.velocityY = -15
        }
        pAction = "play"
        lastPersonWhoHitTheBall = "p"
    }
    else if(pAction == "play"){
            if(p.isTouching(ball)){
                lastPersonWhoHitTheBall = ""
                if(keyDown("shift")){
                    if(keyDown("space") && keyDown("up")){
                        p.changeAnimation("swing")
                        tooHard = true
                        ball.velocityX= 90
                        ball.velocityY = 18
                        lastPersonWhoHitTheBall = "p"
                    }
                    else{
                        ball.velocityX= 0
                        ball.velocityY= -6
                    }
                }
                else if(keyDown("space")){
                    lastPAction = "spike"
                    p.changeAnimation("swing")
                    if(p.x > sprite.x){
                        ball.velocityX= 50
                        ball.velocityY = 30
                        lastPersonWhoHitTheBall = "p"
                    }
                    else if(p.x < sprite.x && p.x > sprite2.x){
                        ball.velocityX= 35
                        ball.velocityY = 18
                        lastPersonWhoHitTheBall = "p"
                    }
                    else if(p.x < sprite2.x && p.x < sprite.x){
                        ball.velocityX= 30
                        ball.velocityY = 5
                        lastPersonWhoHitTheBall = "p"
                    }
                }
                else if(keyDown("down")){
                    ball.velocityX= 2.5
                    ball.velocityY= -17.5
                    lastPAction = "bump"
                    lastPersonWhoHitTheBall = "p"
                }
                else if(keyDown("z")){
                    if(keyDown("right")){
                        if(keyDown("up")){
                            ball.velocityX = 4.5
                            ball.velocityY = -15
                        }
                        ball.velocityX = 2
                        ball.velocityY = -15
                    }
                    else{
                        ball.velocityX = 0
                        ball.velocityY = -15
                    }
                }
                else if(keyDown("x")){
                    ball.velocityX= 40
                    ball.velocityY= 60
                }
                touches += 1
            }
        }
}