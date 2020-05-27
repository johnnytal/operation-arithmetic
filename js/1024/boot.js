document.addEventListener("deviceready", start, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

//window.onload = start;

function start(){
    WIDTH = 640; 
    HEIGHT = 480;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'game');

    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Instructions", instructions);
    game.state.add("Game", game_main);
    game.state.add("GameOver", game_over);
    
    game.state.start("Boot");  
};

var boot = function(game){};

boot.prototype = {
    preload: function(){},
    
    create: function(){  

        game.stage.backgroundColor = '#f1f1f1';
       
        if (this.game.device.desktop){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = (window.innerWidth * window.devicePixelRatio) / 1.7; 
            this.scale.maxHeight = (window.innerHeight * window.devicePixelRatio) / 1.7;
            
            this.game.scale.pageAlignHorizontally = true;
        } 
        
        else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            
            this.scale.forceOrientation(false, true);
        }
        
        game.state.start('Preloader');
    }
};

function onPause(){
    game.paused = true;
}

function onResume(){
    game.paused = false;
    setTimeout(function(){
        try{
            StatusBar.hide();
        }catch(e){}   
    }, 1000);
}