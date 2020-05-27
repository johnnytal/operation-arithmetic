var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        font = 'Luckiest Guy';
         
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });

        // load assets
        game.load.image('inst', 'assets/1024/images/inst.png');
        game.load.image('ok', 'assets/1024/images/ok.png');
        game.load.image("playBtn","assets/1024/images/playbtn.png");
        game.load.image('menu', 'assets/1024/images/menu.png');
        game.load.image('replay', 'assets/1024/images/replay.png');
        game.load.image('panel', 'assets/1024/images/panel.png');

        game.load.image('bg', 'assets/1024/images/bg.png');
        game.load.image('cave_top', 'assets/1024/images/cave_top.png');
        
        game.load.image('screen', 'assets/1024/images/screen_open.png');
        game.load.image('screen_inst', 'assets/1024/images/screen_inst.png');
        game.load.image('timertextplate', 'assets/1024/images/timer-text-plate.png');

        game.load.image('mush1', 'assets/1024/images/mush1.png');
        game.load.image('mush2', 'assets/1024/images/mush2.png');
        game.load.image('mush3', 'assets/1024/images/mush3.png');
        game.load.image('mush4', 'assets/1024/images/mush4.png');
        game.load.image('mush5', 'assets/1024/images/mush5.png');
        game.load.image('mush6', 'assets/1024/images/mush6.png');
        game.load.image('mush7', 'assets/1024/images/mush7.png');
        game.load.image('mush8', 'assets/1024/images/mush8.png');
        game.load.image('mush9', 'assets/1024/images/mush9.png');
        game.load.image('mush10', 'assets/1024/images/mush10.png');
        game.load.image('mush11', 'assets/1024/images/mush11.png');
        game.load.image('mush12', 'assets/1024/images/mush12.png');
        game.load.image('mush13', 'assets/1024/images/mush13.png');
        game.load.image('mush14', 'assets/1024/images/mush14.png');
        game.load.image('mush15', 'assets/1024/images/mush15.png');
        game.load.image('mush16', 'assets/1024/images/mush16.png');
        
        game.load.spritesheet('operations', 'assets/1024/images/operations.png', 384/5, 71);
                
        game.load.spritesheet('blue_attack', 'assets/1024/images/blue_attack.png', 1200/6, 498/3, 16);
        game.load.spritesheet('green_attack', 'assets/1024/images/green_attack.png', 1200/6, 498/3, 16);
        game.load.spritesheet('red_attack', 'assets/1024/images/red_attack.png', 1200/6, 498/3, 16);
        game.load.spritesheet('yellow_attack', 'assets/1024/images/yellow_attack.png', 1200/6, 498/3, 16);
        game.load.spritesheet('blue_idle', 'assets/1024/images/blue_idle.png', 1200/6, 664/4, 20);
        game.load.spritesheet('green_idle', 'assets/1024/images/green_idle.png', 1200/6, 664/4, 20);
        game.load.spritesheet('red_idle', 'assets/1024/images/red_idle.png', 1200/6, 664/4, 20);
        game.load.spritesheet('yellow_idle', 'assets/1024/images/yellow_idle.png', 1200/6, 664/4, 20);
        
        game.load.spritesheet('fish_left', 'assets/1024/images/fish_left.png', 700/6, 117);
        game.load.spritesheet('fish_right', 'assets/1024/images/fish_right.png', 700/6, 117);
    },
    
    create: function(){
        var bg = this.add.image(0, 0, 'screen');
        bg.alpha = 0;
        
        tween_bg = game.add.tween(bg).to({ alpha: 1}, 1000, Phaser.Easing.Linear.In, true);
        
        playBtn = this.add.button(0, 0, 'playBtn'); 
        playBtn.x = game.world.centerX - playBtn.width / 2;      
        playBtn.y = game.world.centerY - playBtn.height / 2 - 50;      
        playBtn.inputEnabled = true;
        playBtn.input.useHandCursor = true;
        playBtn.scale.set(1, 1.1);
        playBtn.alpha = 0;
        game.add.tween(playBtn).to({ alpha: 1}, 2000, Phaser.Easing.Linear.In, true);

        playBtn.events.onInputDown.add(function(){ 
            this.game.state.start("Game");  
        }, this);
        
        instBtn = this.add.button(0, 0, 'inst'); 
        instBtn.x = game.world.centerX + instBtn.width * 2;      
        instBtn.y = game.world.centerY - playBtn.height / 2;      
        instBtn.inputEnabled = true;
        instBtn.input.useHandCursor = true;
        instBtn.alpha = 0;
        game.add.tween(instBtn).to({ alpha: 1}, 2000, Phaser.Easing.Linear.In, true);

        instBtn.events.onInputDown.add(function(){ 
            this.game.state.start("Instructions");  
        }, this);

        titleLebal = this.add.text(0, 0, "Arithmetivorous", {
            font: '42px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
            stroke:'black', strokeThickness: 4
        });
        titleLebal.x = game.world.centerX - titleLebal.width / 2;
        titleLebal.y = 20;
        titleLebal.padding.set(5, 0);
        titleLebal.setShadow(3, 3, 'rgba(60,10,50,0.6)', 5);
        titleLebal.alpha = 0;
        tween_title = game.add.tween(titleLebal).to({ alpha: 1}, 4000, Phaser.Easing.Linear.In, true);
                
        bestScore = localStorage.getItem("1024-bestScore");
        if (bestScore == null || bestScore == undefined || bestScore == 'undefined') bestScore = 0;

        bestScoreLebal = this.add.text(15, 30, "Best score\n" + bestScore, {
            font: '16px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
            stroke:'black', strokeThickness: 2
        });
        bestScoreLebal.alpha = 0;
        game.add.tween(bestScoreLebal).to({ alpha: 1}, 2000, Phaser.Easing.Linear.In, true);
        
        initAd();
        
        createClouds();
        
        setTimeout(function(){
            try{
                StatusBar.hide();
            }catch(e){}
        }, 1000);
    }, 
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};

function initAd(){
    var admobid = {};

    admobid = {
        interstitial: 'ca-app-pub-9795366520625065/1134991422'
    };
    
    try{
        if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false, isTesting:false} );
    } catch(e){}
}

function showAd(){
    try{
        if(AdMob) AdMob.showInterstitial();
    } catch(e){}
}