class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
   
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd()
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      for(var i=0;i>-displayHeight*4;i=i-1000){
           stone1 = createSprite(475,i)
            stone1.addImage("stone",stoneImg)
            stone1.scale = 0.5
            stone1.lifetime = 500
           if (stone1.isTouching(car1)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
        if (stone1.isTouching(car2)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
        if (stone1.isTouching(car3)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
        if (stone1.isTouching(car4)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
if(keyDown("h")){
  Honk.play()
}
         
           // stoneGroup.add(stone)
      }
       for(var i=500;i>-displayHeight*4;i=i-1000){
           stone2 = createSprite(1175,i)
            stone2.addImage("stone",stoneImg)
            stone2.scale = 0.5
            stone2.lifetime = 500
            if (stone2.isTouching(car1)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
         if (stone2.isTouching(car2)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
         if (stone2.isTouching(car3)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
         if (stone2.isTouching(car4)) {
          alert("Game Over !!!!!")
          gameState = 2
        }
            //stoneGroup.add(stone)
      }
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        //x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        //cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10)
          fill("red")
          ellipse(cars[player.index - 1].x,y,60,60)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }



    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=75
      player.update(); 
    }
   if(keyIsDown(LEFT_ARROW) && player.index !== null){
      cars[player.index - 1].x -= 20
      //player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      cars[player.index-1].x += 20
      //player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=20
      player.update();
    }

    if(player.distance > 4400){
      gameState = 2;
      player.rank = player.rank+1
      Player.updateCarsAtEnd(player.rank)

      textSize(30)
    rectMode(CENTER)
    fill("white")
    strokeWeight(3)
    stroke("blue")
    rect(displayWidth/2, cars[player.index-1].y-300, 500, 250)
    fill("red")
    text("Your Rank is: "+ player.rank, displayWidth/2 - 70, cars[player.index-1].y - 300)
    }
   
    drawSprites();
     
    /* if (player.index !== null) {
      //fill code here, to destroy the objects.
      for (var i = 0; i < stoneGroup.length; i++) {
        if (stoneGroup.get(i).isTouching(allPlayers)) {
          text("Game Over !!!!!",100,100)
        }
      }
 }*/
  }

  end(){
    console.log("Game Ended");
    
  }
}
