//let title = new Phaser.scene('Title');
var winArr = [false,false,false,false,false,false,false,false]



class StartScene extends Phaser.Scene{
  constructor() {
    super()
    // super({key: "StartScene"})
    Phaser.Scene.call(this, {key: 'StartScene'})
  }
  preload() {
    this.load.image('title', 'images/title.jpg');
  }
  create() {
    var title = this.add.image(400, 200, 'title');
    title.displayHeight = 800;
    title.displayWidth = 800;
    title.rotation = 1.5708;

    this.add.text(50, 150, 'Oh no! Kobe cant lace his shoe in a freak bowling accident!', {fontFamily: 'Roboto Condensed', color: 'orange', fontSize:'24px', backgroundColor:'black'})
    this.add.text(50, 250, 'Use the mouse to help him lace up his shoes!', {fontFamily: 'Roboto Condensed', color: 'orange', fontSize:'16px', backgroundColor:'black'})
    this.add.text(50, 350, 'Click anywhere to begin', {fontFamily: 'Roboto Condensed', color: 'orange', fontSize:'36px', backgroundColor:'black'})

    this.input.on('pointerdown', function(){
      this.scene.start('GameScene')
    }, this);
  }
}


class GameScene extends Phaser.Scene{
  constructor() {
    super()
    // super({key: 'GameScene'})
    Phaser.Scene.call(this, {key: 'GameScene'})
  }
   preload() {
    this.load.image('boot', 'images/boot.jpg')
    this.load.image('lace', 'images/shoe-lace-chunk.png')
  }

 create() {
  this.matter.world.setBounds();

// background image
var boot = this.add.image(400, 420, 'boot');
boot.displayHeight = 1600;
boot.displayWidth = 1200;
boot.rotation = 1.5708;

//Setting up zones in which I want to check if there are laces
var zone1 = this.matter.add.rectangle(275, 370, 20, 80, {
  isSensor: true,
  label: 'zone1',
  debug: true,
  isStatic: true
})

var zone2 = this.matter.add.rectangle(550, 370, 20, 80, {
  isSensor: true,
  label: 'zone2',
  debug: true,
  isStatic: true
})

var zone3 = this.matter.add.rectangle(275, 255, 20, 80, {
  isSensor: true,
  label: 'zone3',
  debug: true,
  isStatic: true
})

var zone4 = this.matter.add.rectangle(550, 255, 20, 80, {
  isSensor: true,
  label: 'zone4',
  debug: true,
  isStatic: true
})

var zone5 = this.matter.add.rectangle(275, 140, 20, 80, {
  isSensor: true,
  label: 'zone5',
  debug: true,
  isStatic: true
})


var zone6 = this.matter.add.rectangle(550, 140, 20, 80, {
  isSensor: true,
  label: 'zone6',
  debug: true,
  isStatic: true
})


var zone7 = this.matter.add.rectangle(275, 25, 20, 80, {
  isSensor: true,
  label: 'zone7',
  debug: true,
  isStatic: true
})


var zone8 = this.matter.add.rectangle(550, 25, 20, 80, {
  isSensor: true,
  label: 'zone8',
  debug: true,
  isStatic: true
})


this.matter.add.mouseSpring({});
//setting up the holes via invis Walls
let invisWall1 = this.matter.add.rectangle(275, 420, 20, 20,{
  isStatic: true,
  debug: true,
});
let invisWall2 = this.matter.add.rectangle(550, 420, 20, 20,{
  isStatic: true,
  debug: true
});
let invisWall3 = this.matter.add.rectangle(275, 305, 20, 20,{
  isStatic: true,
  debug: true
});
let invisWall4 = this.matter.add.rectangle(550, 305, 20, 20,{
  isStatic: true,
  debug: true
});
let invisWall5 = this.matter.add.rectangle(275, 190, 20, 20,{
  isStatic: true,
  debug: true
});
let invisWall6 = this.matter.add.rectangle(550, 190, 20, 20,{
  isStatic: true,
  debug: true
});
let invisWall7 = this.matter.add.rectangle(275, 75, 20, 20,{
  isStatic: true,
  debug: true
});
let invisWall8 = this.matter.add.rectangle(550, 75, 20, 20,{
  isStatic: true,
  debug: true
});


let group = this.matter.world.nextGroup(true)
//setting up the lace via bridge matter physics
  const newLace = (x, y) => {
    return this.matter.add
      .image(x, y, 'lace')
      .setBody(
        {type: 'rectangle'},
        {collisionFilter: {group:group}, chamfer: 5, density: .005, frictionAir:0.05, label:'lace'}
      )
      .setScale(.05)
    }
//letting the initial positions be put into an array
  var lacePositions = [];
  const NUM_LACES = 200;
//filling up lace positions with actual coordinates
  for (var i = 0; i < NUM_LACES; i++){
    lacePositions.push({x:4 + i * 4, y:400})
  }
  //placing the laces
  let laces = lacePositions.map(pos => newLace (pos.x, pos.y))
  //attaxhing the laces together
  for (var i = 0; i < NUM_LACES - 1; i++){
    this.matter.add.constraint(laces[i], laces[i+1], 10, 1, {
      pointA: {x: 2, y: 0},
      pointB: {x: -2, y:0}
    })
  }
  this.matter.world.on('collisionstart', function (event, bodyA, bodyB){
    if (bodyB.label === 'lace' && bodyA.label === 'zone1') {
      winArr[0] = true
      checkWin()
    }
    else if (bodyB.label === 'lace' && bodyA.label === 'zone2'){
      winArr[1] = true
      checkWin()
    }
    else if (bodyB.label === 'lace' && bodyA.label === 'zone3'){
      winArr[2] = true
      checkWin()
    }
    else if (bodyB.label === 'lace' && bodyA.label === 'zone4'){
      winArr[3] = true
      checkWin()
    }
    else if (bodyB.label === 'lace' && bodyA.label === 'zone5'){
      winArr[4] = true
      checkWin()
    }
    else if (bodyB.label === 'lace' && bodyA.label === 'zone6'){
      winArr[5] = true
      checkWin()
    }
    else if (bodyB.label === 'lace' && bodyA.label === 'zone7'){
      winArr[6] = true
      checkWin()
    }
    else if (bodyB.label === 'lace' && bodyA.label === 'zone8'){
      winArr[7] = true
      checkWin()
    }
  })
  function checkWin(){
    if (winArr[0] === true && winArr[1] === true && winArr[2] === true && winArr[3] === true && winArr[4] === true && winArr[5] === true && winArr[6] === true && winArr[7] === true) {
     game.scene.start('WinScene')
    console.log('win')
    }
  }
}
}

class WinScene extends Phaser.Scene{
  constructor() {
    super()
    Phaser.Scene.call(this, {key:'WinScene'})
  }
  preload() {

  }
  create() {

  }
}



var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'matter'
        },
    scene: [StartScene, GameScene, WinScene],
    }
var game = new Phaser.Game(config)

game.scene.start('StartScene')

// function startGame(){
//   game.scene.start('GameScene')
// }
