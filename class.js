//------------------------------------------------------------------------
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.multiply = 0; 
        this.directions = [];

    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

     mul() {
         this.multiply++;
         if (this.multiply >= 3) {
             var fundCords = this.getDirections(0);
             var cord = random(fundCords);
             if (cord) {
                 var x = cord[0];
                 var y = cord[1];

                 var norXot = new Grass(x, y);
                 xotArr.push(norXot);

                 matrix[y][x] = 1;
                 this.multiply = 0;
             }
         }
     }
}
//------------------------------------------------------------------------
class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 25;
        this.directions =[];
    }

   
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    
    move() {
        
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
           
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }


    eat() {
        
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
           
            this.multiply++;
            
            this.energy++;

            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            if (this.multiply >= 2) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            
            this.move();
            this.energy--;
             if (this.energy <= 0) { 
                 this.die();
             }
        }
    }

    mul() {
        
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord){
            var x = cord[0];
            var y = cord[1];
            
            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            matrix[y][x] = 2;
            
        } 
    }

    
     die() {
         
         matrix[this.y][this.x] = 0;

         for (var i in eatArr) {
             if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                 eatArr.splice(i, 1);
             }
         }
     }

}
// -----------------------------------------------------------------------
class Hunter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 7;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    eat() {
        var fundCords = this.getDirections(2);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;
 
            this.energy++;

            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }

            if (this.multiply == 5) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) { 
                this.die();
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord){
            var x = cord[0];
            var y = cord[1];
            var norHunter = new Hunter(x, y);
            huntArr.push(norHunter);

            matrix[y][x] = 2;
        } 
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (var i in huntArr) {
            if (this.x == huntArr[i].x && this.y == huntArr[i].y) {
                huntArr.splice(i, 1);
            }
        }
    }

}
//------------------------------------------------------------------------
class Knight {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 45;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y - 1],
            [this.x + 1, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 1, this.y + 2],
            [this.x + 1, this.y + 2]
        ];
    }

    
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    
    move() {
        
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }


    
    eat() {
        
        var fundHunts = this.getDirections(3);
        var cord = random(fundHunts);
        var fundCords = this.getDirections(1);
        var place = random(fundCords);

        
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            
            this.x = x;
            this.y = y;

            this.multiply++;
 
            
            this.energy++;

            
            for (var i in huntArr) {
                if (x == huntArr[i].x && y == huntArr[i].y) {
                    huntArr.splice(i, 1);
                }
            }

            
            if (this.multiply >= 5) {
                this.mul()
                this.multiply = 0;
            }


        } 
        else if (place) {
            var x = place[0];
            var y = place[1];

            
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            
            this.x = x;
            this.y = y;

            
            this.multiply++;
 
           
            this.energy++;

            
            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            
            if (this.multiply >= 10) {
                this.mul()
                this.multiply = 0;
            }


        }
        else {

           
            this.move();
            this.energy--;
             if (this.energy <= 0) {
            
                 this.die();
             }
        }
    }

    
    mul() {
        
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        
        if (cord){
            var x = cord[0];
            var y = cord[1];
            
            var newKnight = new Knight(x, y);
            knightArr.push(newKnight);

            matrix[y][x] = 4;
        } 
    }

    
     die() {
        
         matrix[this.y][this.x] = 0;

         for (var i in knightArr) {
             if (this.x == knightArr[i].x && this.y == knightArr[i].y) {
                 knightArr.splice(i, 1);
             }
         }
     }

}
//-------------------------------------------------------------------------
class Bishop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 25;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y - 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
      
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
           
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }


    
    eat() {
        
        var fundKnights = this.getDirections(4);
        var cord = random(fundKnights);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in knightArr) {
                if (x == knightArr[i].x && y == knightArr[i].y) {
                    knightArr.splice(i, 1);
                }
            }

     
            if (this.multiply >= 5) {
                this.mul()
                this.multiply = 0;
            }


        } 
        
        else {
           
            this.move();
            this.energy--;
             if (this.energy <= 0) { 
                 this.die();
             }
        }
    }

    
    mul() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord){
            var x = cord[0];
            var y = cord[1];
            var newBishop = new Bishop(x, y);
            bishopArr.push(newBishop);

            matrix[y][x] = 5;
        } 
    }

     die() {
         matrix[this.y][this.x] = 0;

         for (var i in bishopArr) {
             if (this.x == bishopArr[i].x && this.y == bishopArr[i].y) {
                 bishopArr.splice(i, 1);
             }
         }
     }

}