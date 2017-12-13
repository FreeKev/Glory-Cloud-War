console.log("in menu.js");
var menuState = {
  create: function () {
    console.log("in the create function");
    var nameLabel = game.add.text(80, 80, 'Glory Cloud War', {font: '50px Press Start 2P', fill: '#ffffff'});
    var startLabel = game.add.text(80, game.world.height-80, 'Press Spacebar to Begin!', {font: '25px Press Start 2P', fill: '#ffffff'});
    var spaceKey = game.input.keyboard.addKey(Phaser.keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },

  start: function () {
    game.state.start('play');
    // game.state.add('Game', PhaserGame, true);
  },






//ENDING BRACKET
};



// TITLE BUTTON
// game.menu = function(game) {
//
// };
//
// game.menu.prototype = {
//     create: function(game){
//       this.createButton(game, "Play", game.world.centerX,game.world.centerY + 32, 300, 100, function() {
//         this.state.start('Level1');
//       })
//
//       titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 192, 'title');
//       titlescreen.anchor.setTo(0.5, 0.5);
//     },
//
//     update: function(game){
//
//     }
//
//     createButton: function(game, string, x,y,w,h, callback){
//
//       var buttonS = game.add.button(x,y, 'button', callback, this, 2,1,0);
//
//       buttoS.anchor.setTo(0.5, 0.5);
//       buttonS.width = w;
//       buttonS.height = h;
//
//       var txt = game.add.text(buttonS.x, buttonS.y, string);
//
//       txt.anchor.setTo(0.5, 0.5);
//     }
//
// };

// MUSIC
// toggleAudio: function () {
//   if (music.isPlaying) {
//       music.pause();
//     } else {
//   music.resume();
//   }
// },
