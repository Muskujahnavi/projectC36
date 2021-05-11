//Create variables here
var dog,dogimg,dogimg1;
var database;
var foodStock,foods;
var lastFed;

function preload(){
  dogimg=loadImage("images/dogImg.png");
  dogimg1=loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
database=firebase.database();
	createCanvas(500,500);

  foodObj=new Food();    
  
foodStock=database.ref('Food');
foodStock.on("value",readStock);



dog=createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale=0.15;

feed=createButton("Feed the Dog");
feed.position(600,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(700,95);
addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87);

foodObj.display();



fedTime=database.ref('FeedTme');
fedTime.on("value",function(data){
  lastFed=data.val();
});

  
  //add styles here

  fill(255,255,254);   
textSize(15);
if(lastFed>=12){
  text("Last Feed:"+lastFed%12+ "PM" ,350,30);
}
else if(lastFed===0){
  text("Last Feed:12 AM",350,30);
}
else{
  text("Last Feed:"+lastFed+ "AM" ,350,30);
}

drawSprites();
}

function readStock(data){
foods=data.val();
foodObj.updateFoodStock(foods);
}

//function writeStock(x){
 // if(x<=0){
 // x=0;
 // }
  //else{
  //  x=x-1;
  //}
  //database.ref('/').update({
  //  Food:x
 // })
//}

function feedDog(){
  dog.addImage(dogimg1);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
FeedTme:hour()
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}