var instructions = function(game){};
 
instructions.prototype = {
    create: function(){
        var bg = this.add.image(0, 0, 'screen_inst');
        bg.alpha = 0;
        
        tween_bg = game.add.tween(bg).to({ alpha: 1}, 1000, Phaser.Easing.Linear.In, true);
        
        menuBtn = this.add.button(0, 0, 'menu'); 
        menuBtn.x = game.world.centerX - menuBtn.width / 2 - 15;      
        menuBtn.y = game.world.centerY - menuBtn.height + 50;      
        menuBtn.inputEnabled = true;
        menuBtn.input.useHandCursor = true;
        menuBtn.scale.set(1.5, 1.5);

        menuBtn.events.onInputDown.add(function(){ 
            showAd();
            this.game.state.start("Preloader");  
        }, this);

        instructions = this.add.text(400,  75, "Drag the fruits\n and release them over\nthe flowers", {
            font: '20px ' + font, fill: '#f7f7f7', align: 'center',
            stroke:'#00004c', strokeThickness: 5
        }); 
        instructions.angle = 15;

        instructions0 = this.add.text(160,  25, "Time left", {
            font: '19px ' + font, fill: '#f7f7f7', align: 'center',
            stroke:'black', strokeThickness: 5
        }); 
        instructions0.angle = -6;
                
        instructions1 = this.add.text(160,  112, "Current sum", {
            font: '19px ' + font, fill: '#f7f7f7', align: 'center',
            stroke:'darkyellow', strokeThickness: 5
        }); 
        instructions1.angle = -6;
        
        instructions2 = this.add.text(185,  184, "Your goal", {
            font: '19px ' + font, fill: '#f7f7f7', align: 'center',
            stroke:'darkblue', strokeThickness: 5
        }); 
        instructions2.angle = -6;
        
        instructions3 = this.add.text(26,  80, "\n^\nReach the goal\nwith the fewest\nmoves for max. bonus", {
            font: '18px ' + font, fill: '#f7f7f7', align: 'left',
            stroke:'purple', strokeThickness: 4
        }); 
        instructions3.angle = 8;
        
        name1 = this.add.text(-10,  310, "Addie\n     Addition flower (+)", {
            font: '15px ' + font, fill: 'black', align: 'center',
            stroke:'orange', strokeThickness: 3
        }); 

        name2 = this.add.text(150,  310, "Minus\n\nSubtraction flower (-)", {
            font: '15px ' + font, fill: 'black', align: 'center',
            stroke:'lightgreen', strokeThickness: 3
        }); 
  
        name3 = this.add.text(300,  310, "Axel\n\n\nMultiplication flower (* or X)", {
            font: '15px ' + font, fill: 'black', align: 'center',
            stroke:'lightblue', strokeThickness: 3
        }); 

        name4 = this.add.text(460,  310, "                            Clyde\n\n\n\nDivision flower (/ or ÷)", {
            font: '15px ' + font, fill: 'black', align: 'center',
            stroke:'yellow', strokeThickness: 3
        }); 
    }, 
};