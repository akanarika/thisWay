Game.Play = function (game) {};

Game.Play.prototype = {

	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.faceLeft = true;
        for(var i=0; i<lineWidth; i++){
            for(var j=0; j<lineHeight; j++){ this.game.add.sprite(60*i, 60*j, 'wall');}
        }
        this.level = 1;

        this.loadMap(this.level); 

        this.gravDir = 'D';


	},

    loadMap: function (i) {

        this.map = this.game.add.tilemap('level_'+i,600,600);
        this.map.addTilesetImage('collection_'+i); // Preloaded tileset
        this.map.addTilesetImage('thorns');
        //this.map.addTilesetImage('player'); // Preloaded tileset

        if(i==1){
            this.layer = this.map.createLayer(0);
            this.layer.resizeWorld();
            this.map.setCollisionBetween(0,100,true);
            this.goal = this.game.add.sprite(60, 60*9, 'goal');
            this.player = this.game.add.sprite(60*3/*60*19*/, 60*9/*60*14*/,'player', 18); //start position
            this.movePlat = this.game.add.sprite(60*13, 60*10, 'movePlat', 2);

            this.wall = this.game.add.sprite(0,0, 'wall_1');
            this.wall.bringToTop();

            /* arcade enable ************/
            this.game.physics.enable( [this.player, this.layer, this.movePlat, this.goal], Phaser.Physics.ARCADE);
                    //movePlat tween was cancelled 
            this.isOnMovePlat = false;
            //this.player.body.setSize(30,60,0,0);
            this.movePlat.body.immovable = true;
        }

        if(i==2){
            this.clearMap();
            this.layer = this.map.createLayer(0);
            this.layer.resizeWorld();

            this.map.setCollisionBetween(0,100,true);
            this.goal = this.game.add.sprite(60*10, 60*3, 'goal', 2);
            //this.player.kill();      
            this.player = this.game.add.sprite(60*11,60*2,/*60*6,60*15,*/ 'player', 18);
            this.movePlat.kill();

            this.wall.kill();
            this.wall = this.game.add.sprite(0,0, 'wall_2');
            this.wall.bringToTop();

            this.thornList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 
                0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 
                9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0]; 
            this.addThorn(this.thornList);
            this.addGear(/*later*/);


            this.gravList = [new this.gravCube('R',7,16), new this.gravCube('R',8,7), new this.gravCube('R',8,8),
                            new this.gravCube('R',16,14), new this.gravCube('D',14,6), new this.gravCube('L',15,3),
                            new this.gravCube('L',24,10), new this.gravCube('U',19,4), new this.gravCube('L',21,2),
                            ];
            this.addGravity(this.gravList);

            this.boxList = [26,2,26,3,26,4,26,5,18,8,19,10,19,11];
            this.addBox(this.boxList);

             /* arcade enable ************/
            this.game.physics.enable( [this.player, this.layer, this.goal], Phaser.Physics.ARCADE);
        }
        this.player.anchor.set(.5);
        this.game.camera.follow(this.player);
        this.stopLAnim = this.player.animations.add('stopL', [0,1,2,3,4,5], 20, true);
        this.stopRAnim = this.player.animations.add('stopR', [6,7,8,9,10,11], 20, true);
        this.moveLAnim = this.player.animations.add('left', [12,13,14], 20, true);
        this.moveRAnim = this.player.animations.add('right', [15,16,17], 20, true);
         
        this.player.body.collideWorldBounds = true;
        /* gravity *********************/
        this.player.body.gravity.y = 600;

        this.cursor = this.game.input.keyboard.createCursorKeys();
        
    },

    addBox: function(a){
        this.boxes = this.game.add.group();
        for(var i=0; i<a.length/2; i++){
            this.box = this.boxes.create(60*a[2*i],60*a[2*i+1],'box');
            this.game.physics.arcade.enable(this.box);
        }
    },

    addThorn: function(a){
        this.thorns = this.game.add.group();
        //this.game.physics.enable(this.thorns,Phaser.Physics.ARCADE);
        this.thornNum = 0;

        for(var i=0; i<a.length; i++){
            if(a[i]!=0) this.thornNum++;
        }
        //this.thorns.createMultiple(this.thornNum,'thornsheet', 3);
        
        for(var i=0; i<a.length; i++){
            if(a[i]!=0){
                switch(a[i]-8){
                    case 1: 
                        this.thorn = this.thorns.create(60*(i%lineWidth),60*((i-i%lineWidth)/lineWidth),'thornsheet',0);
                        this.game.physics.arcade.enable(this.thorn);
                        this.thorn.body.immovable = true;
                        this.thorn.body.setSize(60,30,0,30);
                        break;
                    case 2: this.thorn = this.thorns.create(60*(i%lineWidth),60*((i-i%lineWidth)/lineWidth),'thornsheet',1);
                        this.game.physics.arcade.enable(this.thorn);
                        this.thorn.body.immovable = true;
                        this.thorn.body.setSize(30,60,0,0);
                        //if(this.thorn.body.blocked.right) this.player.kill();
                        break;
                    case 3: this.thorn = this.thorns.create(60*(i%lineWidth),60*((i-i%lineWidth)/lineWidth),'thornsheet',2);
                        this.game.physics.arcade.enable(this.thorn);
                        this.thorn.body.immovable = true;
                        this.thorn.body.setSize(60,30,0,0);
                        if(this.thorn.body.blocked.down) this.player.kill();
                        break;
                    case 4: this.thorn = this.thorns.create(60*(i%lineWidth),60*((i-i%lineWidth)/lineWidth),'thornsheet',3);
                        this.game.physics.arcade.enable(this.thorn);
                        this.thorn.body.immovable = true;
                        this.thorn.body.setSize(30,60,30,0);
                        if(this.thorn.body.blocked.left) this.player.kill();
                        break;

                }
            }
        }


    },

    addGear: function(){
        this.gears = this.game.add.group();
        this.game.physics.enable(this.gears,Phaser.Physics.ARCADE);
        this.gearNum = 3;
        //this.thorns.createMultiple(this.thornNum,'thornsheet', 3);
        for(var i=0; i<this.gearNum; i++){
            this.gear= this.gears.create(60*(9+i)+30,60*(lineHeight-2)+30,'gearsheet',2);
            this.game.physics.arcade.enable(this.gear);
            this.gear.body.immovable = true;
        }

    },

    gravCube: function(arrow, x, y){
        this.arrow = arrow; //u 0, r 8, d 16, l 24
        this.x = x;
        this.y = y;
    },

    addGravity:function(a){
        //this.gravObj = new this.gravCube("R", 7, 16);
        this.gravs = this.game.add.group();
        //this.game.physics.enable(this.gravs,Phaser.Physics.ARCADE);
        for(var i=0; i<a.length; i++){
            this.gravity = this.gravs.create(60*a[i].x+30, 60*a[i].y+30, 'gravity', 8);
            this.gravity.anchor.set(0.5);
            this.gravity.arrow = a[i].arrow; //2014.10.15addByDandanDu
            if(a[i].arrow == 'R')this.gravAnim = this.gravity.animations.add('grav', [8,9,10,11,12,13,14,15], 14, true); 
            else if(a[i].arrow == 'U')this.gravAnim = this.gravity.animations.add('grav', [0,1,2,3,4,5,6,7], 14, true); 
            else if(a[i].arrow == 'D')this.gravAnim = this.gravity.animations.add('grav', [16,17,18,19,20,21,22,23], 14, true); 
            else if(a[i].arrow == 'L')this.gravAnim = this.gravity.animations.add('grav', [24,25,26,27,28,29,30,31,32], 14, true); 
            this.game.physics.arcade.enable(this.gravity);
            this.gravity.body.immovable = true;
        }

    },

    clearMap: function(){
        this.layer.destroy();
        this.goal.destroy();
        this.player.destroy();

    },


	update: function() {
        var self = this;
        if(this.player.inWorld == false){
            this.gameOver();
        }
		this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.thorns);
        this.game.physics.arcade.collide(this.player, this.gears);
        this.game.physics.arcade.collide(this.player, this.gravs);
        if(this.boxes){
            this.game.physics.arcade.collide(this.player, this.boxes);
            this.game.physics.arcade.collide(this.layer, this.boxes);
            this.game.physics.arcade.collide(this.boxes);
        }

        if(this.level == 1) this.game.physics.arcade.collide(this.player, this.movePlat);
        //this.player.body.velocity.set(0);
        if(this.gravDir == "D"){
            this.player.body.gravity.y = 600;
            this.player.body.gravity.x = 0;
            this.player.angle = 0;
            if (this.cursor.left.isDown)
            {
                this.player.body.velocity.x = -200;
                this.player.play('left');
                this.faceLeft = true;
            }
            else if (this.cursor.right.isDown)
            {
                this.player.body.velocity.x = 200;
                this.player.play('right');
                this.faceLeft = false;
            }
            else
            {
                if(this.faceLeft) this.player.animations.play('stopL');
                else this.player.animations.play('stopR');
                if(this.level==1){
                    if (this.isOnMovePlat) {
                        this.player.body.velocity.x = this.movePlat.body.velocity.x; 
                    }
                    else this.player.body.velocity.x = 0;
                }
                else this.player.body.velocity.x = 0;
            }

            if (this.cursor.up.isDown && this.player.body.blocked.down){
                this.player.body.velocity.y = -420;
            }
        }
        else if(this.gravDir == "R"){
            this.player.body.gravity.x = 600;
            this.player.body.gravity.y = 0;
            this.player.angle = -90;
            //this.player.body.rotation = -90;
            if (this.cursor.down.isDown)
            {
                this.player.body.velocity.y = 200;
                this.player.play('left');
                this.faceLeft = true;
            }
            else if (this.cursor.up.isDown)
            {
                this.player.body.velocity.y = -200;
                this.player.play('right');
                this.faceLeft = false;
            }
            else
            {
                if(this.faceLeft) this.player.animations.play('stopL');
                else this.player.animations.play('stopR');
                this.player.body.velocity.y = 0;
            }

            if (this.cursor.left.isDown && this.player.body.blocked.right){
                this.player.body.velocity.x = -420;
            }
        }
        else if(this.gravDir == "U"){
            this.player.body.gravity.y = -600;
            this.player.body.gravity.x = 0;
            this.player.angle = -180;
            if (this.cursor.left.isDown)
            {
                this.player.body.velocity.x = -200;
                this.player.play('right');
                this.faceLeft = true;
            }
            else if (this.cursor.right.isDown)
            {
                this.player.body.velocity.x = 200;
                this.player.play('left');
                this.faceLeft = false;
            }
            else
            {
                if(this.faceLeft) this.player.animations.play('stopR');
                else this.player.animations.play('stopL');
                this.player.body.velocity.x = 0;
            }

            if (this.cursor.down.isDown && this.player.body.blocked.up){
                this.player.body.velocity.y = 420;
            }
        }
        else if(this.gravDir == "L"){
            this.player.body.gravity.x = -600;
            this.player.body.gravity.y = 0;
            this.player.angle = 90;
            if (this.cursor.down.isDown)
            {
                this.player.body.velocity.y = 200;
                this.player.play('right');
                this.faceLeft = true;
            }
            else if (this.cursor.up.isDown)
            {
                this.player.body.velocity.y = -200;
                this.player.play('left');
                this.faceLeft = false;
            }
            else
            {
                if(this.faceLeft) this.player.animations.play('stopR');
                else this.player.animations.play('stopL');
                this.player.body.velocity.y = 0;
            }

            if (this.cursor.right.isDown && this.player.body.blocked.left){
                this.player.body.velocity.x = 420;
            }
        }


        /** movePlat tween****************/
        if(this.level == 1){
            if(this.movePlat.body.x < 1020 && this.movePlat.body.velocity.x >0) {
                this.movePlat.body.velocity.x = 100;
            }
            else {
                if(this.movePlat.body.x > 720) this.movePlat.body.velocity.x = -100;
                else this.movePlat.body.velocity.x = 100;
            }
                    /*is the player On the movePlat????*******************/
            if ((this.player.body.y==this.movePlat.body.y-this.movePlat.body.height)
                && ((this.player.body.x<this.movePlat.body.x+this.movePlat.body.width)
                    &&this.player.body.x>this.movePlat.body.x)){
                this.isOnMovePlat = true;
            }
            else{
                this.isOnMovePlat = false;
            }
        }


        /****************/

        if(this.level==1){
            if (this.player.body.x == this.goal.body.x && this.player.body.y == this.goal.body.y){
            this.win = true;
            this.level+=1;
            this.loadMap(this.level);
           }
        }

        if(this.level==2){
            var self = this;
            if (this.player.body.x == this.goal.body.x && this.player.body.y == this.goal.body.y){            

                this.label = this.game.add.text(620,200,'WIN! \n and ... to be continued \n ', { font: '40px Indie Flower', fill: '#fff', align: 'center' });
                this.label.anchor.setTo(0.5, 0.5);
    
            }
            
        }



/*        if (this.player.body.x == this.goal.body.x && this.player.body.y == this.goal.body.y){
            this.win = true;
            this.level+=1;
            this.loadMap(this.level);
        }*/


        /**thorn kills***********/
        if(this.level == 2){
            //if(this.player.body.blocked.down){console.log("a");}
            this.thorns.forEach(function(item) {
                switch(item.frame){
                    case 0: if(item.body.touching.up) {this.game.state.start('Boot');break;}
                    case 1: if(item.body.touching.right) {this.game.state.start('Boot');break;}
                    case 2: if(item.body.touching.down) {this.game.state.start('Boot');break;}
                    case 3: if(item.body.touching.left) {this.game.state.start('Boot');break;}
                }
            });
            
            this.gears.forEach(function(item){
                item.anchor.set(.5);
                item.rotation += -.2;
                this.game.physics.arcade.enable(item);
                if(item.body.touching.left||item.body.touching.up||item.body.touching.right||item.body.touching.down){
                    this.game.state.start('Boot');
                }
            });

            this.gravs.forEach(function(item){
                item.play('grav');
                //if(item.body.blocked.up) {console.log("aaa");} 
                /*console.log(item.body.blocked.up);*/
                if(this.isStanding(item)){
                    this.gravDir = item.arrow;
                }
            }, this/*this 'this' is important but I don't know why!!!*/);
            //this.gravity.play('grav'+this.gravObj.arrow);
            if(this.gravity.body.touching.up){
                //this.player.body.gravity.y=0;
                //this.player.body.gravity.x=600;
                console.log("aaa");
            }

            var self = this;

            this.boxes.forEach(function(item){
                item.body.gravity.x = self.player.body.gravity.x*1.1;
                item.body.gravity.y = self.player.body.gravity.y*1.1;
                if(self.gravDir=="D"||self.gravDir=="U"){item.body.velocity.x=0;}
                else{item.body.velocity.y=0;}

                self.isOnBox(item);
            });
        }
        /***************/

	},

    isStanding: function(item) {
        var self = this;
        //console.log(self.player);
        //console.log(this);
        /*console.log((item.position.y == (this.player.position.y-60))&&
                    ((item.position.x-60)<=this.player.position.x)&&
                    (item.position.x>=(this.player.position.x-60)));
        console.log(item.position.y == (this.player.position.y-60));
        console.log((item.position.x-60)<=this.player.position.x);
        console.log(item.position.x>=(this.player.position.x-60));*/
        switch (this.gravDir){
            case "D":
                if((item.position.y == (this.player.position.y+60))&&
                    ((item.position.x-60)<=this.player.position.x)&&
                    (item.position.x>=(this.player.position.x-60)))
                    return true;
            case "U":
                if((item.position.y == (this.player.position.y-60))&&
                    ((item.position.x-60)<=this.player.position.x)&&
                    (item.position.x>=(this.player.position.x-60))&&
                    this.player.body.touching.up) 
                    return true;
            case "L":
                if((item.position.x == (this.player.position.x-60))&&
                    ((item.position.y-60)<=this.player.position.y)&&
                    (item.position.y>=(this.player.position.y-60))&&
                    this.player.body.touching.left) 
                    return true;
            case "R":
                if(item.position.x == (this.player.position.x+60)&&
                    ((item.position.y-60)<=this.player.position.y)&&
                    (item.position.y>=(this.player.position.y-60))&&
                    this.player.body.touching.right)
                    return true;
            default:
                return false;
        }
    },

    isOnBox: function(item) {
        switch(this.gravDir){
            case "D":
                if(parseInt(item.position.y/60)*60 == (parseInt(this.player.position.y/60)*60+60)){
                    if (this.cursor.up.isDown){this.player.body.velocity.y = -420;}
                }
            case "U":
                if(parseInt(item.position.y/60)*60 == (parseInt(this.player.position.y/60)*60-60)){
                    if (this.cursor.down.isDown){this.player.body.velocity.y = 420;}
                }               
            case "L":
                if(parseInt(item.position.x/60)*60 == (parseInt(this.player.position.x/60)*60-60)){
                    if (this.cursor.right.isDown){this.player.body.velocity.x = 420;}
                }
            case "R":
                if(parseInt(item.position.x/60)*60 == (parseInt(this.player.position.x/60)*60+60)){
                    if (this.cursor.left.isDown){this.player.body.velocity.x = -420;}
                }
            default:
                return false;
            
        }

    },

    render: function() {
        //this.game.time.advancedTiming = true;
        //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#ffffff");
        
/*        this.game.debug.body(this.player);
       
        this.game.debug.text(this.player.position || '--', 2, 14, "#ffffff");
        if(this.level==2){
                var i = 1;
                this.boxes.forEach(function(item){
                this.game.debug.text(parseInt(item.position.y/60) || '--', 2, 34+20*i++, "#ffffff");
 
            });
        }*/
    },
};

