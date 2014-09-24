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
            this.goal = this.game.add.sprite(60, 60*9, 'goal', 2);
            this.player = this.game.add.sprite(60*2, 60*9,'player', 18);
            this.movePlat = this.game.add.sprite(60*13, 60*10, 'movePlat', 2);
            /* arcade enable ************/
            this.game.physics.enable( [this.player, this.layer, this.movePlat, this.goal], Phaser.Physics.ARCADE);
                    //movePlat tween was cancelled 
            this.isOnMovePlat = false;

            this.movePlat.body.immovable = true;
        }
        if(i==2){
            this.clearMap();
            this.layer = this.map.createLayer(0);
            this.layer.resizeWorld();
            
            
            this.map.setCollisionBetween(0,100,true);
            this.goal = this.game.add.sprite(60, 60*9, 'goal', 2);      
            this.player = this.game.add.sprite(60*19, 60*16-90, 'player', 18);
            this.movePlat.kill();


            //this.thornList = new Array() 
            //this.addThorn();

          /*  this.thorns = this.game.add.group();
            this.thorns.createMultiple(30,'thorns', 2);

            this.thorn1 = this.thorns.getFirstDead();
            this.thorn1.anchor.set(0.5,0.5);
            this.thorn1.reset(60*18, 60*15-90);*/


             /* arcade enable ************/
            this.game.physics.enable( [this.player, this.layer, this.goal], Phaser.Physics.ARCADE);
        }
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

    addThorn: function(a){
        this.thorns = this.game.add.group();
        this.thorns.createMultiple(a.length(),'thornsheet', 3);
        this.thornBoxes = this.game.add.group();
        this.thornBoxes.createMultiple(4,'thornsheet', 1);
        for(var i=0; i<3; i++){
            this.thorn = this.thorns.getFirstDead();
            this.thorn.reset(60*28-60*4, 60*18-60*(5+i));
        }
        for(var i=0; i<3; i++){
            this.thorn = this.thorns.getFirstDead();
            this.thorn.reset(60*28-60*4, 60*18-60*(5+i));
        }

    },

    clearMap: function(){
        this.layer.destroy();
        this.goal.kill();
        this.player.kill();

    },

	update: function() {
		this.game.physics.arcade.collide(this.player, this.layer);
        if(this.level == 1) this.game.physics.arcade.collide(this.player, this.movePlat);
        //this.player.body.velocity.set(0);

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
            if(this.level==1){if (this.isOnMovePlat) {
                this.player.body.velocity.x = this.movePlat.body.velocity.x; 
            }
            else this.player.body.velocity.x = 0;}
            else this.player.body.velocity.x = 0;
        }

        if (this.cursor.up.isDown && this.player.body.blocked.down){
            this.player.body.velocity.y = -420;
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


        if (this.player.body.x == this.goal.body.x && this.player.body.y == this.goal.body.y){
            this.win = true;
            this.level+=1;
            this.loadMap(this.level);
        }


        /**thorn kills***********/

        /***************/
        

	},

    over: function() {

    },

    render: function() {
        this.game.time.advancedTiming = true;
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#ffffff");

    },
};

