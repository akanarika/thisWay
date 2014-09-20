Game.Play = function (game) {};

Game.Play.prototype = {

	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.faceLeft = true;
        for(var i=0; i<28; i++){
            for(var j=0; j<12; j++){ this.game.add.sprite(60*i, 60*j, 'wall');}
        }
		this.map = this.game.add.tilemap('level_1',600,600);
		this.map.addTilesetImage('collection_1'); // Preloaded tileset
		this.map.addTilesetImage('player'); // Preloaded tileset
   	    this.layer = this.map.createLayer(0);
   	    this.layer.resizeWorld();
        this.map.setCollisionBetween(0,100,true);

		this.player = this.game.add.sprite(60*19, 60*10-90, 'player', 18);
        this.movePlat = this.game.add.sprite(60*13, 60*4, 'movePlat', 2)
        this.stopLAnim = this.player.animations.add('stopL', [0,1,2,3,4,5], 20, true);
        this.stopRAnim = this.player.animations.add('stopR', [6,7,8,9,10,11], 20, true);
        this.moveLAnim = this.player.animations.add('left', [12,13,14], 20, true);
        this.moveRAnim = this.player.animations.add('right', [15,16,17], 20, true);
		this.game.physics.enable( [this.player, this.layer, this.movePlat], Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.body.gravity.y = 900;

	   this.cursor = this.game.input.keyboard.createCursorKeys();
		this.game.camera.follow(this.player);
        this.movePlat.body.immovable = true;
        
        //movePlat tween
        this.tween = this.game.add.tween(this.movePlat).to({ x: 60*17 }, 2000, Phaser.Easing.Linear.None)
    .to({ x:60*13 }, 2000, Phaser.Easing.Linear.None)
    .loop()
    .start();

	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.movePlat);

        
        this.player.body.velocity.set(0);

        if (this.cursor.left.isDown)
        {
            this.player.body.velocity.x = -300;
            this.player.play('left');
            this.faceLeft = true;
        }
        else if (this.cursor.right.isDown)
        {
            this.player.body.velocity.x = 300;
            this.player.play('right');
            this.faceLeft = false;
        }
        else
        {
            if(this.faceLeft) this.player.animations.play('stopL');
            else this.player.animations.play('stopR');
        }

        if (this.cursor.up.isDown && this.player.body.blocked.down){
            this.player.body.velocity.y = -2000;
        }

        if (this.cursor.up.isDown && this.player.body.blocked.down) {
            this.player.body.velocity.y = -600;
            //if (sound) this.jump_s.play();
            this.playerJumpCount = 1;
        }
        else if (this.cursor.up.isDown && this.playerJumpCount < 18 && this.playerJumpCount != 0) { 
            this.playerJumpCount += 1;
            this.player.body.velocity.y = -650;
        }
        else 
            this.playerJumpCount = 0;

        /*if(this.player.body.blocked.down) this.player.body.gravity.y = 100;
        else this.player.body.gravity.y = 6000;*/

	},

    render: function() {
        this.game.time.advancedTiming = true;
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#ffffff");
    },
};

