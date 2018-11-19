$(document).ready(function() {
  $("#start").on("click", function() {
    $("#start").remove();
    game.loadQuestion();
  });
  $(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
  });
  $(document).on("click", "#reset", function() {
    game.reset();
  });

  var questions = [
    {
      question: "Who is the drummer for Black Sabbath?",
      answers: ["Bill Ward", "Ginger Baker", "Phil Collins", "Dave Grohl"],
      correctAnswer: "Bill Ward",
      img: "assets/images/pic.jpg"
    },
    {
      question: "Who is the guitarist for Black Sabbath?",
      answers: ["Vivian Campbell", "Zakk Wylde", "Jimmy Page", "Tony Iommi"],
      correctAnswer: "Tony Iommi",
      img: "assets/images/pic.jpg"
    },
    {
      question: "Who is the bass player for Black Sabbath?",
      answers: [
        "Stanley Clarke",
        "John Entwistle",
        "Geezer Butler",
        "John Campbell"
      ],
      correctAnswer: "Geezer Butler",
      img: "assets/images/pic.jpg"
    },
    {
      question: "Who is the original singer for Black Sabbath?",
      answers: [
        "Ronnie James Dio",
        "Ozzy Osbourne",
        "David Coverdale",
        "Ian Gillan"
      ],
      correctAnswer: "Ozzy Osbourne",
      img: "assets/images/pic.jpg"
    }
  ];

  var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function() {
      game.counter--; //references the counter var, starting at 30
      $("#counter").html(game.counter); //prints the counter to the HTML
      if (game.counter <= 0) {
        console.log("TIME UP!");
        game.timeUp(); //calls the timeUp method
      }
    },
    loadQuestion: function() {
      timer = setInterval(game.countdown, 1000); //setInterval is predefined JS.
      $("#subwrapper").html(
        "<h2>Time Remaining: <SPAN id='counter'>30</span> Seconds</h2>"
      );
      $("#subwrapper").append(
        "<h2>" + questions[game.currentQuestion].question + "</h2>"
      );
      //extracts current question and writes to dom
      for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
        $("#subwrapper").append(
          '<button class="answer-button" id="button-' +
            i +
            '" data-name="' +
            questions[game.currentQuestion].answers[i] +
            '">' +
            questions[game.currentQuestion].answers[i] +
            "</button"
        );
      }
    },
    nextQuestion: function() {
      game.counter = 30;
      $("#counter").html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function() {
      clearInterval(timer);
      game.unanswered++;
      $("#subwrapper").html("<h2>OUT OF TIME</h2>");
      $("#subwrapper").append(
        "<h3>The correct answer was: " +
          questions[game.currentQuestion].correctAnswer +
          "</h3>"
      );
      if (game.currentQuestion == questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    results: function() {
      clearInterval(timer);
      $("#subwrapper").html("<h2>ALL DONE!</h2>");
      $("#subwrapper").append("<h3>Correct: " + game.correct + "</h3>");
      $("#subwrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
      $("#subwrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
      $("#subwrapper").append("<button id='reset'>RESET</button>");
    },
    clicked: function(e) {
      clearInterval(timer);
      if (
        $(e.target).data("name") ==
        questions[game.currentQuestion].correctAnswer
      ) {
        game.answeredCorrectly();
      } else {
        game.answeredIncorrectly();
      }
    },
    answeredCorrectly: function() {
      console.log("YOU GOT IT");
      clearInterval(timer);
      game.correct++;
      $("#subwrapper").html("<h2>YOU GOT IT RIGHT!</h2>");
      if (game.currentQuestion == questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    answeredIncorrectly: function() {
      console.log("WRONG ANSWER");
      clearInterval(timer);
      game.incorrect++;
      $("#subwrapper").html("<h2>YOU GOT IT WRONG!</h2>");
      $("#subwrapper").append(
        "<h3>The correct answer was: " +
          questions[game.currentQuestion].correctAnswer +
          "</h3>"
      );
      if (game.currentQuestion == questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    reset: function() {
      game.currentQuestion = 0;
      game.counter = 0;
      game.correct = 0;
      game.incorrect = 0;
      game.unanswered = 0;
      game.loadQuestion();
    }
  };

  console.log("ready!");
});
