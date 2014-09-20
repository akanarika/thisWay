Game = {};

/*var w = 350;
var h = 350;*/
var height = 600-60;
var width = 600;
var score = 0;

/*WebFontConfig = {
    google: {
      families: ['Play','Indie Flower','Press Start 2P']
    }

};*/

//function rand(num){ return Math.floor(Math.random() * num) };

Game.Boot = function (game) { };

Game.Boot.prototype = {
	preload: function () {
		this.game.stage.backgroundColor = "#FFFFFF";//"#81C7D4";
	},
	create: function() {
		this.game.state.start('Load');
	}
};

Game.Load = function (game) { };

Game.Load.prototype = {
	preload: function () {
		//this.game.load.tilemap('map_1', 'map/level_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('wall', 'assets/wall.png');
		this.load.tilemap('level_1', 'map/level_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('collection_1', 'assets/collection_1.png');
		this.load.image('movePlat', 'assets/movePlat.png');
		this.load.spritesheet('player', 'assets/player/player.png', 60, 60);
	
	},
	create: function () {
		game.state.start('Play');
	}
};
