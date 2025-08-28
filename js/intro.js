$(document).ready(function () {
  const keys = [
    "diceGame_firstName",
    "diceGame_lastName",
    "diceGame_username",
    "diceGame_phone",
    "diceGame_city",
    "diceGame_email",
    "diceGame_money",
    "diceGame_lastVisit",
  ];
  const allExist = keys.every((key) => localStorage.getItem(key) !== null);
  if (allExist) {
    window.location.href = "game.html";
    return;
  }

  $.validator.addMethod(
    "divisibleByThree",
    function (value, element) {
      const num = parseInt(value, 10);
      return this.optional(element) || num % 3 === 0;
    },
    "Amount must be divisible by 3."
  );

  $.validator.addMethod("regex", function (value, element, pattern) {
    const regex = new RegExp(pattern);
    return this.optional(element) || regex.test(value);
  });

  $("#gameForm").validate({
    rules: {
      firstName: {
        required: true,
        maxlength: 20,
        regex: "^[A-Za-z][A-Za-z '\\-`]{0,18}[^`]$",
      },
      lastName: {
        required: true,
        maxlength: 30,
        regex: "^[A-Za-z][A-Za-z '\\-`]{0,28}[^`]$",
      },
      username: {
        required: true,
        regex: "^[A-Z][a-z]{3}[0-5]$",
      },
      phone: {
        required: true,
        regex: "^\\(\\d{3}\\) \\d{3}-\\d{4}$",
      },
      city: {
        required: true,
        maxlength: 42,
        regex: "^[A-Za-z]{1,42}$",
      },
      email: {
        required: true,
        regex: "^[\\w.-]+@[\\w]+\\.(ca|org)$",
      },
      money: {
        required: true,
        digits: true,
        min: 5,
        max: 5000,
        divisibleByThree: true,
      },
    },
    messages: {
      firstName:
        "First name must start with a letter, only contain letters, space, ', `, or -, and not end with `.",
      lastName:
        "Last name must start with a letter, only contain letters, space, ', `, or -, and not end with `.",
      username:
        "Username must start with uppercase, followed by 3 lowercase letters and end with a digit (0-5).",
      phone: "Phone number must be in format (###) ###-####.",
      city: "City must contain only letters and max 42 characters.",
      email: "Email must be in format name@domain.ca or name@domain.org.",
      money:
        "Enter a whole number between 5 and 5000 that is divisible by 3.",
    },
    submitHandler: function (form, event) {
      event.preventDefault();

      const data = {
        diceGame_firstName: $("#firstName").val().trim(),
        diceGame_lastName: $("#lastName").val().trim(),
        diceGame_username: $("#username").val().trim(),
        diceGame_phone: $("#phone").val().trim(),
        diceGame_city: $("#city").val().trim(),
        diceGame_email: $("#email").val().trim(),
        diceGame_money: parseInt($("#money").val().trim(), 10),
        diceGame_lastVisit: new Date().toString(),
      };

      Object.entries(data).forEach(([key, value]) =>
        localStorage.setItem(key, value)
      );

      window.location.href = "game.html";
    },
  });

  window.onerror = function (msg, url, lineNo, columnNo, error) {
    alert("An unexpected error occurred. Returning to start...");
    window.location.href = "intro.html";
    return true;
  };
});
