class User {
  constructor(
    firstName,
    lastName,
    username,
    phoneNumber,
    city,
    email,
    bank = 100
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.email = email;
    this.bank = parseInt(bank, 10);
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  placeBet(amount) {
    if (amount > 0 && amount <= this.bank) {
      this.bank -= amount;
      return true;
    }
    return false;
  }

  addWinnings(amount) {
    this.bank += amount;
  }
}

class Dice {
  constructor(imgElement) {
    this.value = 1;
    this.imgElement = imgElement;
  }

  roll() {
    this.value = Math.ceil(Math.random() * 6);
    this.updateImage();
    return this.value;
  }

  getValue() {
    return this.value;
  }

  updateImage() {
    this.imgElement.src = `./media/dice${this.value}.png`;
    this.imgElement.alt = `Dice showing ${this.value}`;

    this.imgElement.classList.add("diceRoll");

    setTimeout(() => {
      this.imgElement.classList.remove("diceRoll");
    }, 500);
  }
}

class Game {
  constructor(user) {
    this.user = user;
    this.dice1 = new Dice(document.querySelector("#dice1"));
    this.dice2 = new Dice(document.querySelector("#dice2"));
    this.targetNumber = null;
    this.betAmount = 0;
  }

  placeBet(targetNumber, amount) {
    if (targetNumber < 3 || targetNumber > 12) {
      throw new Error("Invalid target number. Choose between 3 and 12.");
    }
    if (this.user.placeBet(amount)) {
      this.targetNumber = targetNumber;
      this.betAmount = amount;
      return true;
    }
    return false;
  }

  rollDice() {
    const roll1 = this.dice1.roll();
    const roll2 = this.dice2.roll();
    return roll1 + roll2;
  }

  playRound() {
    if (!this.targetNumber || this.betAmount <= 0) {
      throw new Error("Bet not placed.");
    }

    const rollSum = this.rollDice();

    if (rollSum === 2) {
      return "lose";
    }

    if (rollSum === this.targetNumber) {
      this.user.addWinnings(this.betAmount * 2);
      return "win";
    }

    return "continue";
  }
}

function validateTargetNumber(value) {
  const targetInput = parseInt(value);
  const targetError = document.querySelector("#targetInputError");

  if (isNaN(targetInput)) {
    targetError.textContent = "Please enter a valid number.";
    return false;
  } else if (targetInput < 3 || targetInput > 12) {
    targetError.textContent = "Target number must be between 3 and 12.";
    return false;
  } else {
    targetError.textContent = "";
    return true;
  }
}

function validateBetAmount(value, maxBet) {
  const betInput = parseInt(value);
  const betError = document.querySelector("#betInputError");

  if (isNaN(betInput)) {
    betError.textContent = "Please enter a valid number.";
    return false;
  } else if (betInput <= 0) {
    betError.textContent = "Bet amount must be greater than 0.";
    return false;
  } else if (betInput > maxBet) {
    betError.textContent = `You can't bet more than your current bankroll ($${maxBet}).`;
    return false;
  } else {
    betError.textContent = "";
    return true;
  }
}

window.onload = function () {
  const firstName = localStorage.getItem("diceGame_firstName");
  const lastName = localStorage.getItem("diceGame_lastName");
  const username = localStorage.getItem("diceGame_username");
  const phone = localStorage.getItem("diceGame_phone");
  const city = localStorage.getItem("diceGame_city");
  const email = localStorage.getItem("diceGame_email");
  const bank = localStorage.getItem("diceGame_money");

  const date = localStorage.getItem("diceGame_lastVisit");
  if (date) {
    document.querySelector(
      ".lastVisit"
    ).textContent = `Your last visit was: ${date}`;
  } else {
    document.querySelector(".lastVisit").textContent =
      "This is your first visit!";
  }

  localStorage.setItem("diceGame_lastVisit", new Date().toString());

  const user = new User(
    firstName,
    lastName,
    username,
    phone,
    city,
    email,
    bank
  );
  const game = new Game(user);

  document.querySelector(
    ".userInfo"
  ).textContent = `Welcome, ${user.getFullName()}!`;
  document.querySelector(".bankroll").textContent = `Bankroll: $${user.bank}`;
  document.querySelector(
    ".username"
  ).textContent = `Username: ${user.username}`;
  document.querySelector(
    ".phone"
  ).textContent = `Phone Number: ${user.phoneNumber}`;
  document.querySelector(".city").textContent = `City: ${user.city}`;
  document.querySelector(".email").textContent = `Email: ${user.email}`;

  const lastVisit = localStorage.getItem("diceGame_lastVisit");
  document.querySelector(
    ".lastVisit"
  ).textContent = `Your last visit was: ${lastVisit}`;
  document.querySelector(
    ".notName"
  ).innerHTML = `Not ${user.getFullName()}? <a href="#" id="changeCreds">Change your credentials</a>`;

  document.querySelector(".notName").addEventListener("click", function () {
    const keysToRemove = [
      "diceGame_firstName",
      "diceGame_lastName",
      "diceGame_username",
      "diceGame_phone",
      "diceGame_city",
      "diceGame_email",
      "diceGame_money",
      "diceGame_lastVisit",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    location.href = "intro.html";
  });

  const targetInputElement = document.querySelector("#targetInput");
  const betInputElement = document.querySelector("#betInput");

  let betPlaced = false;

  targetInputElement.addEventListener("input", function () {
    validateTargetNumber(this.value);
  });

  betInputElement.addEventListener("input", function () {
    validateBetAmount(this.value, user.bank);
  });

  document.querySelector("#playButton").addEventListener("click", function () {
    const targetInputValue = targetInputElement.value;
    const betInputValue = betInputElement.value;

    const isTargetValid = validateTargetNumber(targetInputValue);
    const isBetValid = validateBetAmount(betInputValue, user.bank);

    if (!isTargetValid || !isBetValid) {
      return;
    }

    const targetInput = parseInt(targetInputValue);
    const betInput = parseInt(betInputValue);

    try {
      if (game.placeBet(targetInput, betInput)) {
        document.querySelector("#rollButton").disabled = false;
        document.querySelector("#resultMessage").textContent =
          "Bet placed. Now roll the dice!";
        document.querySelector("#resultMessage").className = "result info";
        document.querySelector("#playButton").disabled = true;
        betPlaced = true;
      } else {
        document.querySelector("#resultMessage").textContent =
          "Failed to place bet. Check your bet amount.";
      }
    } catch (error) {
      document.querySelector("#resultMessage").textContent = error.message;
    }
  });

  document.querySelector("#rollButton").addEventListener("click", function () {
    console.log("Roll button clicked");
    console.log("betPlaced:", betPlaced);
    if (!betPlaced) {
      document.querySelector("#resultMessage").textContent =
        "Place a bet first!";
      return;
    }

    try {
      const result = game.playRound();
      console.log("Roll Result:", result);
      console.log("User Bank after round:", user.bank);

      if (result === "win") {
        document.querySelector(
          "#resultMessage"
        ).textContent = `You rolled your target number! You win $${
          game.betAmount * 2
        }!`;
        document.querySelector("#resultMessage").className = "result win";
        betPlaced = false; // Reset for the next bet
        document.querySelector("#rollButton").disabled = true; // Disable roll until a new bet is placed
        document.querySelector("#playButton").disabled = false; // Enable placing a new bet
      } else if (result === "lose") {
        document.querySelector("#resultMessage").textContent =
          "Snake Eyes! You lose your bet!";
        document.querySelector("#resultMessage").className = "result lose";
        betPlaced = false;
        document.querySelector("#rollButton").disabled = true;
        document.querySelector("#playButton").disabled = false;
      } else {
        document.querySelector(
          "#resultMessage"
        ).textContent = `Keep rolling...`;
        document.querySelector("#resultMessage").className = "result neutral";
      }

      document.querySelector(
        ".bankroll"
      ).textContent = `Bankroll: $${user.bank}`;
      localStorage.setItem("diceGame_money", user.bank);

      if (user.bank <= 0) {
        document.querySelector("#resultMessage").textContent =
          "You are out of money! Game over.";
        document.querySelector("#playButton").disabled = true;
        document.querySelector("#rollButton").disabled = true;
      }
    } catch (error) {
      document.querySelector("#resultMessage").textContent = error.message;
    }
  });

  document.querySelector("#leaveGame").addEventListener("click", function () {
    alert(
      `Thanks for playing, ${firstName}! Your final bankroll is $${user.bank}.`
    );
    window.location.href = "intro.html";
  });
};

window.onerror = function (message, source, lineno, colno, error) {
  console.error("JavaScript Error:", {
    message,
    source,
    lineno,
    colno,
    error,
  });

  alert("Something went wrong! Returning to the intro screen...");
  localStorage.clear();
  window.location.href = "intro.html";

  return true;
};
