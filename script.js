var side = 25;
var xotArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var huntArr = []; 
var knightArr = [];
var bishopArr = [];

let matrix = []; 
let rows = 30; 
let columns = 30; 

for (let y = 0; y < rows; y++) {
matrix[y] = []; 
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random()*100);
         if (a >= 0 && a < 30) {
         matrix[y][x] = 0; 
         } 
        if (a >= 30 && a < 40) {
        matrix[y][x] = 1; 
        } 
         else if (a >= 40 && a < 60) {
         matrix[y][x] = 2; 
         } 
         else if (a >= 60 && a < 80) {
         matrix[y][x] = 3; 
         } 
        else if(a >= 80 && a < 90) {
        matrix[y][x] = 4; 
        } 
         else if(a >= 90 && a < 100) {
         matrix[y][x] = 5; 
         } 
    }
}



function setup() {
    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } 
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var hunt = new Hunter(x, y);
                huntArr.push(hunt);
            }
            else if (matrix[y][x] == 4) {
                var knight = new Knight(x, y);
                knightArr.push(knight);
            }
            else if (matrix[y][x] == 5) {
                var bishop = new Bishop(x, y);
                bishopArr.push(bishop);
            }
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill('red');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill('black');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill('white');
                rect(j * side, i * side, side, side);
            }
        }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in xotArr) {
        xotArr[i].mul();
    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ

    for (var i in eatArr) {
        eatArr[i].eat();
    }

    for (var i in huntArr) {
        huntArr[i].eat();
    }
    for (var i in knightArr) {
        knightArr[i].eat();
    }
    for (var i in bishopArr) {
        bishopArr[i].eat();
    }
}