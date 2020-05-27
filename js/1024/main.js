var game_main = function(game){
    var next_numbers;
    
    score = 0;
    level = 0;
    time_left = 120;
    time_factor = 0;
    this_number = 0;
    moves = 0;
    total_score = 0;
    
    hit = false;
    
    LOC_A = -55;
    LOC_B = 120;
    LOC_C = 295;
    LOC_D = 470;
    
    level_time_bonus = [1, 2, 4, 8, 16, 32, 64, 0];
    scores_to_reach = [8, 16, 32, 64, 128, 256, 512, 1024];
    
    bonus_per_level = [50, 100, 150, 200, 250, 400, 500, 1000];
};

game_main.prototype = {
    create: function(){
        score = 0;
        level = 0;
        time_left = 120;
        time_factor = 0;
        this_number = 0;
        moves = 0;
        total_score = 0;
        
        bestScore = localStorage.getItem("1024-bestScore");
        if (bestScore == null) bestScore = 0;
    
        var bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.8;

        var timertextplate = this.add.image(0, 0, 'timertextplate');
        timertextplate.x = game.world.centerX - timertextplate.width / 2;
        
        bgTop = this.add.image(-120, -20, 'cave_top');

        plus = this.add.image(LOC_A + 70, 400, 'operations');
        plus.frame = 0;
        plus.scale.set(0.6, 0.6);
        
        minus = this.add.image(LOC_B + 72, 402, 'operations');
        minus.frame = 1;
        minus.scale.set(0.6, 0.6);
        
        multi = this.add.image(LOC_C + 74, 405, 'operations');
        multi.frame = 2;
        multi.scale.set(0.6, 0.6);
        
        divide = this.add.image(LOC_D + 76, 407, 'operations');
        divide.frame = 3;
        divide.scale.set(0.6, 0.6);

        buckets = game.add.group();
        buckets.enableBody = true;
        buckets.physicsBodyType = Phaser.Physics.ARCADE;
        
        bucketBounds = game.add.group();
        bucketBounds.enableBody = true;
        bucketBounds.physicsBodyType = Phaser.Physics.ARCADE;

        red_bucket = buckets.create(LOC_A ,337, 'red_idle');
        red_bucket.scale.set(1.2, 1.2);
        anim = red_bucket.animations.add('walk');
        anim.play(10, true);
        
        green_bucket = buckets.create(LOC_B ,332, 'green_idle');
        green_bucket.scale.set(1.2, 1.2);
        anim2 = green_bucket.animations.add('walk');
        anim2.play(10, true);
        
        blue_bucket = buckets.create(LOC_C ,337, 'blue_idle');
        blue_bucket.scale.set(1.2, 1.2);
        anim3 = blue_bucket.animations.add('walk');
        anim3.play(10, true);
        
        yellow_bucket = buckets.create(LOC_D ,342, 'yellow_idle');
        yellow_bucket.scale.set(1.2, 1.2);
        anim4 = yellow_bucket.animations.add('walk');
        anim4.play(10, true);
        
        red_bucketBound = bucketBounds.create(LOC_A + 80, red_bucket.y - 10, null);
        game.physics.enable(red_bucketBound, Phaser.Physics.ARCADE);
        red_bucketBound.body.setSize(red_bucket.width / 2 - 50, 1);
        
        green_bucketBound = bucketBounds.create(LOC_B + 80, green_bucket.y - 10, null);
        game.physics.enable(green_bucketBound, Phaser.Physics.ARCADE);
        green_bucketBound.body.setSize(green_bucket.width / 2 - 50, 1);
        
        blue_bucketBound = bucketBounds.create(LOC_C + 80, blue_bucket.y - 10, null);
        game.physics.enable(blue_bucketBound, Phaser.Physics.ARCADE);
        blue_bucketBound.body.setSize(blue_bucket.width / 2 - 50, 1);
        
        yellow_bucketBound = bucketBounds.create(LOC_D + 80, yellow_bucket.y - 10, null);
        game.physics.enable(blue_bucketBound, Phaser.Physics.ARCADE);
        yellow_bucketBound.body.setSize(yellow_bucket.width / 2 - 50, 1);

        buckets.forEach(function(item) { item.body.immovable = true; }, this);

        scoreLabel = this.add.text(320, 110, score, {
            font: '60px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
            stroke:'brown', strokeThickness: 4
        });
        scoreLabel.anchor.set(0.5,0.5);
        scoreLabel.padding.set(5, 0);
  
        goalLabel = this.add.text(320, 185, '(' + scores_to_reach[level] + ')', {
            font: '35px ' + font, fill: 'lightyellow', fontWeight: 'normal', align: 'center',
            stroke:'darkblue', strokeThickness: 4
        });
        goalLabel.anchor.set(0.5, 0.5);

        total_score_label = this.add.text(15, 20, 'Score: 0', {
            font: '22px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
            stroke:'black', strokeThickness: 3
        });

        level_score_label = this.add.text(15, 60, 'Bonus: 50', {
            font: '18px ' + font, fill: 'lightyellow', fontWeight: 'normal', align: 'center',
            stroke:'black', strokeThickness: 2
        });

        timeLabel = this.add.text(0, 3, format_time(time_left), {
            font: '33px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
            stroke:'darkblue', strokeThickness: 6
        });
        timeLabel.x = game.world.centerX - timeLabel.width / 2 + 4; 
        
        scoreLabel.setShadow(3, 3, 'rgba(60,10,50,0.6)', 5);
        level_score_label.setShadow(3, 3, 'rgba(60,10,50,0.9)', 5);
        total_score_label.setShadow(3, 3, 'rgba(60,10,50,0.9)', 5);
        goalLabel.setShadow(1, 1, 'rgba(60,10,50,0.6)', 5);
        
        exit_btn = this.add.button(WIDTH - 165, 432, 'menu');       
        exit_btn.inputEnabled = true;
        exit_btn.input.useHandCursor = true;
        exit_btn.scale.set(0.8, 0.8);
        exit_btn.alpha = 0.7;
        exit_btn.events.onInputDown.add(function(){ 
            showAd();
            game.state.start('Preloader');
        }, this);

        drops = game.add.group();
        drops.enableBody = true;
        drops.physicsBodyType = Phaser.Physics.ARCADE;
        
        game.time.events.loop(Phaser.Timer.SECOND, function(){
           if (time_left <= 0){
               gameOver('lost');
           }
           else{
               time_left--;
               timeLabel.text = format_time(time_left);
               time_factor = 120 - time_left;
           }
        }, this);

        next_numbers = [
            game.rnd.integerInRange(1, (4 + (level*2))),
            game.rnd.integerInRange(1, (4 + (level*2))),
            game.rnd.integerInRange(1, (4 + (level*2)))
        ];
        
        createDrop('loop');

        modal = new gameModal(game);

        createClouds();
    },
    
    update: function(){
        if (!hit){
            game.physics.arcade.overlap(drops, bucketBounds, drop_hit, null, this);
        }   
    }
};

function createDrop(loop){   
    if (time_left <= 0){
        gameOver('lost');
    }
    
    else{
        time_to_next = 3080 - (time_factor * 9);
        
        var x_num_location = 260 + (red_bucket.width / 2) - 310;
        
        var number = next_numbers[this_number];

        this_number++;  
        
        var pushNumber = game.rnd.integerInRange(1, (4 + (level*2)));
        if (pushNumber > 16) pushNumber = game.rnd.integerInRange(1, 16);
        
        next_numbers.push(pushNumber);

        var x = game.rnd.integerInRange(0, 3);
        var y_location = -5;
        
        var angular = game.rnd.integerInRange(-10, 10);
        
        var drop_to_create = 'mush' + number;

        switch(x){
            case 0:
                x_location = LOC_A + (red_bucket.width / 2);
            break;
            case 1:
                x_location = LOC_B + (red_bucket.width / 2);
            break;
            case 2:
                x_location = LOC_C + (red_bucket.width / 2);
            break;
            case 3:
                x_location = LOC_D + (red_bucket.width / 2);
            break;
        }
    
        drop = drops.create(x_location - 9, y_location, drop_to_create);
        
        drop.scale.set(0.5, 0.5); 
        drop.anchor.set(0.5, 0.5); 
        
        tween_drop = game.add.tween(drop.scale).to({ x: 1.2, y: 1.2}, time_to_next / 3, Phaser.Easing.Linear.In, true);
        drop.body.angularVelocity = angular;
        
        game.physics.enable(drop, Phaser.Physics.ARCADE);
 
        var num = this.game.add.text(x_num_location - 75, y_location + drop.height / 2, number, {
            font: '20px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
            stroke:'black', strokeThickness: 2
        });
        num.anchor.set(0.5, 0.5);
        num.setShadow(3, 3, 'rgba(60,10,50,0.2)', 9);
        
        //iterate over drops and if its alive with gravity 0 and pointer is not over it - give gravity
        tween_drop.onComplete.add(function(){
            for(x = 0; x < drops.children.length; x++){ 
                if (drops.getChildAt(x).alive && 
                    drops.getChildAt(x).body.gravity.y == 0 &&
                   !(drops.getChildAt(x).input.pointerOver())){
                        drops.getChildAt(x).body.gravity.y = 28 + (time_factor / 2);  
                    break;
                }
            }
        });

        drop.addChild(num);
        drop.inputEnabled = true;
        drop.input.enableDrag();
       
        drop.checkWorldBounds = true;
        drop.events.onOutOfBounds.add(dropOut, this);

        drop.events.onDragStart.add(onDragStart, this);
        drop.events.onInputUp.add(onOut, this);

        if (loop == 'loop'){
            drop_timer = game.time.events.add(time_to_next, function(){
                createDrop('loop'); 
            }, this, []);
        }
    }
}

function onDragStart(_drop){
    _drop.body.velocity.y = 0;
    _drop.body.gravity.y = 0;     
    _drop.body.angularVelocity = 0;
}

function onOut(_drop){
    _drop.body.gravity.y = 256 + (time_factor / 2);
}

function dropOut(_drop){
    if (time_left > 0){
        plus_move(-2);
    }
    _drop.kill();
}

function drop_hit(_drop, _bucket){
    hit = true;
    
    var number = parseInt(_drop.children[0].text);

    if (_bucket.x == LOC_A + 80){
        score += number;
        animate(red_bucket, _drop);
    }
    else if (_bucket.x == LOC_B + 80){
        score -= number;
        animate(green_bucket, _drop);
    }
    else if (_bucket.x == LOC_C + 80){
        score *= number;
        animate(blue_bucket, _drop);
    }
    else if (_bucket.x == LOC_D + 80){
        score /= number;
        animate(yellow_bucket, _drop);
    }
    
    plus_move(0);

    score = Math.round(score * 10) / 10;
    scoreLabel.text = score; 
    
    if (Math.floor(score) == scores_to_reach[level]){
        next_level();
    }

}

function animate(_bucket, _drop){
        
    var tween_drop = game.add.tween(_drop.scale).to({ x: 0, y: 0}, 300, Phaser.Easing.Linear.In, true);
    tween_drop.onComplete.add(function(){
        _drop.kill();
    }, this);
    
    var new_key;
    
    if (_bucket == red_bucket){
        new_key = 'red_attack';
    }
    else if (_bucket == green_bucket){
        new_key = 'green_attack';
    }
    else if (_bucket == blue_bucket){
        new_key = 'blue_attack';
    }
    else if (_bucket == yellow_bucket){
        new_key = 'yellow_attack';
    }
    
    _bucket.kill();

    eat = game.add.sprite(_bucket.x, _bucket.y, new_key);
    eat.scale.set(1.2, 1.2);
    eat.animations.add('walk');
    eatIt = eat.animations.play('walk', 35, false, true);
    
    eatIt.onComplete.add(function(){
        _bucket.revive();
        hit = false;
    }, this);
}

function plus_move(_time){ 
    time_left += _time;
    timeLabel.text = format_time(time_left);

    if (_time == 0){
        var score = (bonus_per_level[level] - (5 * moves));
        
        if (score > 0){
            moves++;
            level_score_label.text = 'Bonus: ' + (bonus_per_level[level] - (5 * moves));
        }
    }
    else{
        timeLabel.fill = 'orange';
        
        setTimeout(function() {
           timeLabel.fill = 'white';
        }, 500);
    }  
}

function next_level(){
    time_left += level_time_bonus[level];
    timeLabel.text = format_time(time_left);
    
    timeLabel.fill = 'lightgreen';
    
    setTimeout(function() {
       timeLabel.fill = 'white';
    }, 500);
    
    var the_score = (bonus_per_level[level] - (5 * moves));
    
    tween_goal = game.add.tween(goalLabel.scale).to({ x: 0.2, y:0.2 }, 600, Phaser.Easing.Linear.In, true);
    tween_goal.onComplete.add(function(){
        game.add.tween(goalLabel.scale).to({ x: 1, y:1 }, 600, Phaser.Easing.Linear.In, true);
        level++;
        
        if (level == 8){
            gameOver('win');
        }
        
        goalLabel.text = '(' + scores_to_reach[level] + ')';

        score = 0;
        scoreLabel.text = score;   
        
        total_score += the_score;
        total_score_label.text = 'Score: ' + total_score;
        tween = game.add.tween(total_score_label.scale).to({ x: 1.1, y:1.1 }, 500, Phaser.Easing.Linear.In, true);
        tween.yoyo(true, 150);

        moves = 0;
        level_score_label.text = 'Bonus: ' + (bonus_per_level[level] - (5 * moves));
    });
}

function createClouds(){
    clouds = game.add.group();
    clouds.enableBody = true;
    clouds.physicsBodyType = Phaser.Physics.ARCADE;

    var time_to_next = game.rnd.integerInRange(6500, 22000);
    var start_y = game.rnd.integerInRange(75, 310);
    var velocity_x = game.rnd.integerInRange(-100, 100);
    var cloud_alpha = game.rnd.integerInRange(7, 9);
    var scalingX = game.rnd.integerInRange(70, 95);
    var scalingY = game.rnd.integerInRange(70, 95);
    var type = game.rnd.integerInRange(0, 2);
    var fish;
    
    if (velocity_x < 0){
        start_x = 950;
        fish = 'fish_left';
    } 
    else{ 
        start_x = -200; 
        fish = 'fish_right';
    }
    
    cloud = clouds.create(start_x ,start_y, fish);
    anim = cloud.animations.add('walk');
    anim.play(10, true);
    
    cloud.tint = Math.random() * 0xffffff;
    
    var rndNum = game.rnd.integerInRange(0, 3000);

    cloud.body.velocity.x = velocity_x;
    cloud.alpha = '0.' + cloud_alpha;
    cloud.scale.set(scalingX / 80, scalingY / 80);

    if (cloud.body.x < -200 || cloud.body.x > 950) cloud.kill();

    cloud_timer = game.time.events.add(time_to_next, function(){
        createClouds(); 
    }, this, []);
}

function gameOver(win){
    time_left = 0;
    timeLabel.text = ('00:00');
    
    game.state.start('GameOver', false, false, level, save_score(), win); 
}

function save_score(){ // if it's the best score ever, save it to local storage
    if (total_score > bestScore){
        localStorage.setItem( "1024-bestScore", total_score);
        return true;
    }
    else{
        return false;
    }
}

function format_time(sec){
    var totalSec = sec;
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = totalSec % 60;

    var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    return result;
}
