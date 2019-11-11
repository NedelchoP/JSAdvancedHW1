function jumpingJimmy(tower, jumpHeight) {
    let total = 0;
    const len = tower.length;
    for(let i = 0; i < len; i++) {
        if (tower[i] > jumpHeight) {
            return total;
        }
        total += tower[i];
    }
    return total;
}

// Change values below for different outputs
let tower = [5, 1, 8, 2, 4, 3, 1, 9, 8, 5, 1];
let jumpHeight = 5;

console.log(jumpingJimmy(tower, jumpHeight));