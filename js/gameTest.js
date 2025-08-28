<<<<<<< HEAD
const user1 = new User("John", "Doe", "johndoe", "123-456-7890", "New York", "john@example.com");
const user2 = new User("Jane", "Smith", "janesmith", "987-654-3210", "Los Angeles", "jane@example.com", 500);

console.assert(user1.firstName === "John", "User1 FirstName failed");
console.assert(user1.bank === 100, "User1 Default Bank should be 100");
console.assert(user2.bank === 500, "User2 Bank should be 500");

console.assert(user1.getFullName() === "John Doe", "User1 getFullName failed");
console.assert(user2.getFullName() === "Jane Smith", "User2 getFullName failed");

console.assert(user1.placeBet(50) === true, "User1 placeBet valid amount failed");
console.assert(user1.bank === 50, "User1 bank after betting 50 should be 50");

console.assert(user1.placeBet(101) === false, "User1 placeBet over bank should fail");
console.assert(user1.bank === 50, "User1 bank should remain 50 after failed bet");

console.assert(user1.placeBet(-10) === false, "User1 placeBet negative amount should fail");

user1.addWinnings(30);
console.assert(user1.bank === 80, "User1 bank should be 80 after winnings");

const dice = new Dice();


for (let i = 0; i < 100; i++) {
    let roll = dice.roll();
    console.assert(roll >= 1 && roll <= 6, `Dice roll out of bounds: ${roll}`);
}

let lastRoll = dice.roll();
console.assert(dice.getValue() === lastRoll, "Dice getValue should reflect last roll");

const testUser = new User("Alice", "Wonder", "alicew", "555-555-5555", "Wonderland", "alice@example.com", 200);
const game = new Game(testUser);

console.assert(game.user === testUser, "Game user assignment failed");

console.assert(game.placeBet(7, 50) === true, "Game placeBet case failed");
console.assert(game.targetNumber === 7, "Game targetNumber should be set to 7");
console.assert(game.betAmount === 50, "Game betAmount should be set to 50");
console.assert(testUser.bank === 150, "User bank should be reduced to 150 after placing bet");


const game2 = new Game(testUser);
try {
    game2.playRound();
    console.assert(false, "Game playRound without bet should throw error");
} catch (e) {
    console.assert(e.message === "Bet not placed.", "Wrong error message when playing without bet");
}

console.log("All tests ran. Check for any assertion errors above.");
=======
const user1 = new User("John", "Doe", "johndoe", "123-456-7890", "New York", "john@example.com");
const user2 = new User("Jane", "Smith", "janesmith", "987-654-3210", "Los Angeles", "jane@example.com", 500);

console.assert(user1.firstName === "John", "User1 FirstName failed");
console.assert(user1.bank === 100, "User1 Default Bank should be 100");
console.assert(user2.bank === 500, "User2 Bank should be 500");

console.assert(user1.getFullName() === "John Doe", "User1 getFullName failed");
console.assert(user2.getFullName() === "Jane Smith", "User2 getFullName failed");

console.assert(user1.placeBet(50) === true, "User1 placeBet valid amount failed");
console.assert(user1.bank === 50, "User1 bank after betting 50 should be 50");

console.assert(user1.placeBet(101) === false, "User1 placeBet over bank should fail");
console.assert(user1.bank === 50, "User1 bank should remain 50 after failed bet");

console.assert(user1.placeBet(-10) === false, "User1 placeBet negative amount should fail");

user1.addWinnings(30);
console.assert(user1.bank === 80, "User1 bank should be 80 after winnings");

const dice = new Dice();


for (let i = 0; i < 100; i++) {
    let roll = dice.roll();
    console.assert(roll >= 1 && roll <= 6, `Dice roll out of bounds: ${roll}`);
}

let lastRoll = dice.roll();
console.assert(dice.getValue() === lastRoll, "Dice getValue should reflect last roll");

const testUser = new User("Alice", "Wonder", "alicew", "555-555-5555", "Wonderland", "alice@example.com", 200);
const game = new Game(testUser);

console.assert(game.user === testUser, "Game user assignment failed");

console.assert(game.placeBet(7, 50) === true, "Game placeBet case failed");
console.assert(game.targetNumber === 7, "Game targetNumber should be set to 7");
console.assert(game.betAmount === 50, "Game betAmount should be set to 50");
console.assert(testUser.bank === 150, "User bank should be reduced to 150 after placing bet");


const game2 = new Game(testUser);
try {
    game2.playRound();
    console.assert(false, "Game playRound without bet should throw error");
} catch (e) {
    console.assert(e.message === "Bet not placed.", "Wrong error message when playing without bet");
}

console.log("All tests ran. Check for any assertion errors above.");
>>>>>>> 09ea05fbc7fac1d7172196021de3022988a457a1
