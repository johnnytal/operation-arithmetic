var game_over = function(game){};

game_over.prototype = {
    preload: function(){},
     
    init: function(level, best, win){     
        var message;
        var bestMessage;
        
        if (win == 'win'){
            bestMessage = '\nYou Win!';
        }
        
        else{
            if (best){
                bestMessage = '\nNew High Score!';
            }
            else{
                bestMessage = '\nTry Again!';
            }
        }

        message = 'Your score: ' + total_score + bestMessage; 

        modal.createModal({
            type:"game_over",
            includeBackground: false,
            modalCloseOnInput: false,
            itemsArr: 
            [
                 {
                    type: "image",
                    content: "panel",
                    contentScale: 1.35
                },
                {
                    type: "text",
                    content: message,
                    fontFamily: font,
                    fontSize: 28,
                    offsetY: -100,
                    color: "0xffdd11",
                    stroke: "0xff0ff0",
                    strokeThickness: 4
                },
                {
                    type: "image",
                    content: "menu",
                    offsetY: 80,
                    offsetX: 60,
                    contentScale: 1.5,
                    callback: function () { // menu
                        showAd();
                        game.state.start('Preloader');
                    }
                },            
                {
                    type: "image",
                    content: "replay",
                    offsetY: 80,
                    offsetX: -60,
                    contentScale: 1.5,
                    callback: function () { // new game
                        showAd();
                        game.state.start('Game');
                    }
                }
            ]
        });   
            
        modal.showModal("game_over");
        for (n=0; n<4; n++){
            game.add.tween(modal.getModalItem('game_over',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
        }
        
        replayImg = modal.getModalItem('game_over',2);
        replayImg.input.useHandCursor = true;
        
        playImg = modal.getModalItem('game_over',3);
        playImg.input.useHandCursor = true;
    }
};