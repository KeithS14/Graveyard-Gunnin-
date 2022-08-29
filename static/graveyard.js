let canvas;
let context;

let request_id;
let fpsInterval = 1000/30; // The denominator is frames per second.
let now;
let then = Date.now();

let background = [
    [144,145,145,145,145,145,145,145,145,145,145,145,145,145,145,146,121,122,122,122,122,122,122,122,122,123,144,145,145,145,145,145,145,145,145,145,145,145,145,145,145,146],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,80,81,82,97,66,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,-1,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,9,10,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,25,26,27,-1,20],
    [20,-1,-1,-1,-1,84, 85,86,87,   -1,-1,-1,50,-1,-1,-1,-1,-1,-1,80,81,-1,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,40,41,42,43,-1,20],
    [20,-1,-1,-1,-1,100,101,102,103,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,56,57,58,59,-1,20],
    [20,-1,-1,-1,-1,116,117,118,119,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1, 19,20,18,-1,17,1,16,  -1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,33, -1,32,2,35,-1,34,-1, -1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,-1,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,49,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [91,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,89],
    [107,66,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,80,81,82,97,66,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,105],
    [107,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,105],
    [107,82,82,82,82,82,-1,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,-1,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,105],
    [107,98,98,98,98,98,98,98,98,98,98,98,98,-1,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,105],
    [107,66,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,80,81,82,97,66,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,105],
    [123,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,-1,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1, 19,20,18,-1,17,1,16, -1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1, 33,-1,32,2,35,-1,34, -1,-1,-1,-1,-1,-1,80,81,-1,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,49,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,19,20,18,-1,17,1,16, -1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,48,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,33,-1,32,2,35,-1,34, -1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,82,97,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,80,81,82,97,66,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20],
    [144,145,145,145,145,145,145,145,145,145,145,145,145,145,145,146,89,90,90,90,90,90,90,90,90,91,144,145,145,145,145,145,145,145,145,145,145,145,145,145,145,146]
]

let lives = 3
let player = {
    x : 320,
    y : 256,
    w : 24,
    h : 32,
    frameX : 0,
    frameY : 0,
    speed : 5
   
};

let tilesPerRow = 16; //35
let tileSize = 16; //42

let backgroundImage = new Image();
let playerImage = new Image();
let enemyImage = new Image();

let enemy = [];
let set_enemy = {
    size : 24,
    h : 32,
    w : 24,
    frameX : 0,
    frameY : 0,
    speed : 0,
}
let num_enemies = 1
let max_ememies = 0;
let enemies_killed = 0;

let score = 0;
let hold_score = 0;
let high_score =0;

let set_bullet = {
    w : 4,
    h : 4,
    speed :23
}
let bullet = [];
let shootLeft = false;
let shootRight = false;
let shootUp = false;
let shootDown = false;

let direction = false;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let e_moveLeft = false;
let e_moveRight = false;
let e_moveUp = false;
let e_moveDown = false;

let game_started = false;

let easy = false;
let medium = true;
let hard = false;
let extreme = false;
let round = 1
let hold_round = 0;
let best_round = 0;
let kills_new_round = 15;

let gameover_element = document.querySelector("#gameover")
let button_element = document.querySelector("#start");

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    backgroundImage.src = "static/graveyard.png"
    //enemyImage.src = "../static/zombie.png";
    //enemyImage.src = "../static/mandalorian.png";
    enemyImage.src = "static/death_scythe.png";
    playerImage.src = "static/indie.png";
    //player.x = canvas.width /2; 
    //player.y = floor - player.height;

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    window.addEventListener("keydown", is_shooting, false);
    window.addEventListener("keyup", not_shooting, false);
    window.setInterval(del_bullet, 425);

    let start_button = document.querySelector("#start");
    start_button.addEventListener("click",start,false);
    let restart_button = document.querySelector("#restart");
    restart_button.addEventListener("click",restart,false);

    let easy_button = document.querySelector("#easy");
    easy_button.addEventListener("click",dif_easy,false);
    let medium_button = document.querySelector("#medium");
    medium_button.addEventListener("click",dif_medium,false);
    let hard_button = document.querySelector("#hard");
    hard_button.addEventListener("click",dif_hard,false);
    let extreme_button = document.querySelector("#extreme");
    extreme_button.addEventListener("click",dif_extreme,false);


    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false); // This is not my code and was found here --> https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser

    draw();

}
function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    
    
    // Draw background on canvas 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#006400";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 35; r += 1) {
        for (let c = 0; c < 42; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }
       
    if (easy && game_started === false){
        set_enemy.speed = 1
        max_ememies = 10
        
    }

    if (medium && game_started === false){
        set_enemy.speed = 1.5 
        max_ememies = 15
        
    }

    if (hard && game_started === false){
        set_enemy.speed = 2
        max_ememies = 20
        
    }

    if (extreme && game_started === false){
        set_enemy.speed = 2.5
        max_ememies = 100
        
    }
    
    if (game_started){
            spawn_enemy()
        }

    set_round()

    if (game_started){
            context.drawImage(playerImage,
                32 * player.frameX, 48 * player.frameY, 32, 48,
                player.x, player.y, player.w, player.h);
            if ( moveLeft || moveRight || moveUp || moveDown)   {
                player.frameX  = (player.frameX + 1) % 4  ;
            
            };
        };

    update_lives()
    if(game_started === false){
        update_dif()
    }
   
    if (shootLeft){
        if (bullet.length < 1){
        let b = {
            x : player.x,
            y : player.y + player.h /2,
            size : 5,
            w :  set_bullet.w,
            h : set_bullet.h,
            xChange : -set_bullet.speed,
            yChange : 0
        }
        bullet.push(b)
        }
        
    } 

    else if (shootRight){
        if (bullet.length < 1){
        let b = {
            x : player.x + player.w,
            y : player.y + player.h /2,
            size : 5,
            w :  set_bullet.w,
            h : set_bullet.h,
            xChange : set_bullet.speed,
            yChange : 0
        }
        bullet.push(b)
        }
    }

    else if (shootUp){
        if (bullet.length < 1){
        let b = {
            x : player.x + player.w/2 -2,
            y : player.y,
            size : 5,
            w :  set_bullet.w,
            h : set_bullet.h,
            xChange : 0,
            yChange : -set_bullet.speed
        }
        bullet.push(b)
        }
    }

    else if (shootDown){
        if (bullet.length < 1){
        let b = {
            x : player.x + player.w/2 -2,
            y : player.y + player.h,
            size : 5,
            w :  set_bullet.w,
            h : set_bullet.h,
            xChange : 0,
            yChange : set_bullet.speed
            }
        bullet.push(b)
       
        }
        
        
    };
    for (let b of bullet){
        context.fillStyle = "yellow";
        b.x = b.x + b.xChange;
        b.y = b.y + b.yChange;
        context.fillRect(b.x, b.y, b.w, b.h);
        }

    for (let b of bullet){
        spawn_bullet(b)
    }

    for (let e of enemy){
        if (player_collides(e)){
            if (lives > 0){
                lives = lives - 1;
                enemy = [];
                player.x = 320;
                player.y =256;

            }
            else{
                gameover()
            }
            return;
        }
    }
    
    if (moveRight) {
        player.x = player.x + player.speed;
        player.frameY = 2
    }
    if (moveLeft) {
        player.x = player.x - player.speed;
        player.frameY = 1
    }
    if (moveUp) {
        player.y = player.y - player.speed;
        player.frameY = 3
    }
    if (moveDown) {
        player.y = player.y + player.speed;
        player.frameY = 0
    }

   
    
    if (player.x  < 0) {
        player.x = 0;
    } 
    if (player.x + player.w >=canvas.width) {
        player.x =canvas.width- player.w;
    }
    if (player.y  < 0 ){
        player.y = 0;
    }
    if (player.y + player.h >= canvas.height){
        player.y =canvas.height - player.h;
    }

    kills()

    set_high_score()
    
    update_round()
    update_score();
    
};


function is_shooting(event){
    let key = event.key;
    if (/* key === "ArrowLeft" */ key === "a"){
        shootLeft = true;
    
    };
    if (/* key === "ArrowRight" */key === "d"){
        shootRight = true;

    };
    if (/* key === "ArrowUp" */ key === "w" ){
        shootUp = true;
        
    };
    if (/* key === "ArrowDown" */ key === "s"){
        shootDown = true;
        
    };
};

function spawn_bullet(b){
    context.fillStyle = "yellow";
    if (shootDown || shootUp){
        
        context.fillRect(b.x, b.y, b.w, b.h); 
        b.x = b.x + b.xChange;
        b.y = b.y + b.yChange;
    };
    if(shootRight || shootLeft){
        
            b.x = b.x + b.xChange;
            b.y = b.y + b.yChange;
            context.fillRect(b.x, b.y, b.h, b.w);
            
    };
};

let bullet_del = false;
function del_bullet(){
    bullet.shift();
    bullet_del = true;
}

function not_shooting(event){
    let key = event.key;
    
    if(bullet_del){
        if (/* key === "ArrowLeft" */ key === "a" || key === "d"/* key === "ArrowRight" */|| key === "w" /* key === "ArrowUp" */ || key === "s"/* key === "ArrowDown" */) {
            shootDown = false;
            shootLeft = false;
            shootRight = false
            shootUp = false; 
        };
    };
};


function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft"  /* || key === "a" */  ) {
        moveLeft = true;
    }
    else if (key === "ArrowRight"  /* || key === "d" */) {
        moveRight = true;
    }
    else if (key === "ArrowUp"  /* || key === "w" */) {
        moveUp = true; 
    }
    else if (key === "ArrowDown"  /* || key === "s" */) {
        moveDown = true;    
    };
};



function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft" /* || key === "a" */) {
        moveLeft = false;
    } else if (key === "ArrowRight" /* ||  key === "d" */) {
        moveRight = false;
    } else if (key === "ArrowUp" /* || key === "w" */) {
        moveUp = false;
    } else if (key === "ArrowDown" /* || key === "s" */) {
        moveDown = false;
    }
} 


function spawn_enemy(){
   
    /* context.fillStyle = "blue"; */ 
    if (num_enemies < 1 && game_started){
        num_enemies = 1
    }
    if( enemy.length < num_enemies){
        let spawn_location =  randint(1,4) 
        // spawn top
         if( spawn_location === 1 ){
        let f = {
            x : randint(250,canvas.width-250-set_enemy.size),
            y : 0,
            size : set_enemy.size,
            frameX : set_enemy.frameX,
            frameY : set_enemy.frameY
        };
        enemy.push(f);
        };
        // spawn bottom
        if( spawn_location === 2){
            let f = {
                x : randint(250,canvas.width-250-set_enemy.size),
                y : canvas.height -set_enemy.size,
                size : set_enemy.size,
                frameX : set_enemy.frameX,
                frameY : set_enemy.frameY
            };
            enemy.push(f);
        };

        //spawn left
        if( spawn_location === 3 ){
            let f = {
                x : 0,
                y :  randint(225,canvas.height-225-set_enemy.size),
                size : set_enemy.size,
                frameX : set_enemy.frameX,
                frameY : set_enemy.frameY
            };
            enemy.push(f);
        };
        // spawn right
        if( spawn_location === 4 ){
            let f = {
                x : canvas.width-set_enemy.size,
                y :  randint(225,canvas.height-225-set_enemy.size),
                size : set_enemy.size,
                frameX : set_enemy.frameX,
                frameY : set_enemy.frameY
            };
            enemy.push(f);
        };
    
        
    };

    ///////////////////////////////////////////
    for (let e of enemy){
        //Move down
        if(e.y < player.y   ){
            e.y = e.y + set_enemy.speed;
            set_enemy.frameY = 0
            
        }
        
        //Move Up
        if(e.y  > player.y  ){
            e.y = e.y - set_enemy.speed;
            set_enemy.frameY = 3
            }
            
        
        // Move right
        if(e.x < player.x ){
            e.x = e.x + set_enemy.speed;
            set_enemy.frameY = 2
            
        }
        
        //Move  left
        if(e.x > player.x){
            e.x = e.x - set_enemy.speed;
            set_enemy.frameY = 1
            
            
        }
        
        
        //////////////////////////////////////////   
       

            context.drawImage(enemyImage,
                set_enemy.size*2  * set_enemy.frameX, set_enemy.size*2 *set_enemy.frameY, 48, 48,
                e.x, e.y, set_enemy.w, set_enemy.h);//24
            
    };

} 

function randint(min,max) {
    return Math.round(Math.random() * (max-min)) + min;
}

function kills() {
    for (let e of enemy){
        for (let b of bullet){
            if (b.x + b.size < e.x ||
                    e.x + e.size < b.x ||
                    b.y > e.y + e.size ||
                    e.y > b.y + b.size) {
                    
            } 
            else {
                enemies_killed = enemies_killed +1
                if (enemies_killed % 5 ===0 ){
                    
                    if (num_enemies < max_ememies){
                        num_enemies +=  1
                    }
                };
                
                let index = enemy.indexOf(e) 
                score += 10;
                hold_score += 10;   
                //update_score();
                enemy.splice(index,1)
                
                

                    
                 
            };
        };
    };
};

function player_collides(e){
    if (    e.x + e.size < player.x ||
            player.x + player.w < e.x ||
            e.y > player.y + player.h  ||
            player.y > e.y + e.size) {
        return false;
    }
    else {
        return true;
    }
} 

function update_score(){
    if (hold_score >= 1000){
        hold_score = 0;
        lives +=1;
    }
    let score_element = document.querySelector("#score");
    score_element.innerHTML= "Points:" + score;

};

function set_high_score(){
    if (score > high_score){
        high_score = score
    }
    if (round > best_round){
        best_round = round
    }
    let high_score_element = document.querySelector("#high_score");
    high_score_element.innerHTML= "High score: " + high_score;

    let best_round_element = document.querySelector("#best_round");
    best_round_element.innerHTML= "Best round: " + best_round;
}

function update_lives(){
    let lives_element = document.querySelector("#lives");
    lives_element.innerHTML= "Lives: " + lives;

};

function update_round(){
    let lives_element = document.querySelector("#round");
    lives_element.innerHTML= "Round:" + round;
};

function set_round(){

    /* if (enemies_killed === hold_round + kills_new_round && easy ) {
        round +=1
        //update_round()
        hold_round = enemies_killed
        set_enemy.speed += .1
        player.speed += .1
    }
    if (enemies_killed === hold_round +  kills_new_round && medium) {
            round +=1
            //update_round()
            hold_round = enemies_killed
            set_enemy.speed += .2
            player.speed += .2
        }
    if (enemies_killed === hold_round +  kills_new_round && hard) {
        round +=1
        //update_round(round)
        hold_round = enemies_killed
        set_enemy.speed += .3
        player.speed += .3
    }
    if (enemies_killed === hold_round +  kills_new_round && extreme) {
        round +=1
        //update_round()
        hold_round = enemies_killed
        set_enemy.speed += .4
        player.speed += .4
    } */
    if (enemies_killed === hold_round + kills_new_round){
        round +=1
        hold_round = enemies_killed
        if(easy){
            set_enemy.speed += .1
            player.speed += .1
        };
        if(medium){
            set_enemy.speed += .2
            player.speed += .2
            
        };
        if(hard){
            set_enemy.speed += .3
            player.speed += .3
        };
        if(extreme){
            set_enemy.speed += .4
            player.speed += .4
        };
    };

}

function update_dif(){
    if (easy){
        let dif_element = document.querySelector("#dif_selected");
        dif_element.innerHTML= "Difficulty: Easy"; }
    if (medium){
        let dif_element = document.querySelector("#dif_selected");
        dif_element.innerHTML= "Difficulty: Medium"; }
    if (hard){
        let dif_element = document.querySelector("#dif_selected");
        dif_element.innerHTML= "Difficulty: Hard"; }
    if (extreme){
        let dif_element = document.querySelector("#dif_selected");
        dif_element.innerHTML= "Difficulty: Extreme"; }
};

function started(){
    button_element.style.display = "none"
    game_started = true;
   
}


function start(){
    started();
}

function restart(){
    player.x = 320;
    player.y = 256;
    enemy = [];
    num_enemies = 0;
    lives = 3;
    score = 0;
    hold_score = 0;
    round = 1;
    hold_round = 0;
    enemies_killed = 0;
    update_round()
    update_score()
    game_started = false;
    gameover_element.style.display = "none"
    button_element.style.display = "block"
};

function dif_easy(){
    easy = true;
    medium = false;
    hard = false;
    extreme = false;
}
function dif_medium(){
    easy = false;
    medium = true;
    hard = false;
    extreme = false;
}
function dif_hard(){
    easy = false;
    medium = false;
    hard = true;
    extreme = false;
}
function dif_extreme(){
    easy = false;
    medium = false;
    hard = false;
    extreme = true;
}

function gameover(){
    let gameover_element = document.querySelector("#gameover")
    gameover_element.style.display = "block"   
    game_started = false;
   
    
}

/* function stop() {

    window.removeEventListener("keydown",activate,false);
    window.removeEventListener("keyup",deactivate,false);
    window.cancelAnimationFrame(request_id);
}  */
