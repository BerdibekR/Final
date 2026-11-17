document.addEventListener("DOMContentLoaded", function () {

    const questions = [
        {
            question: "In which year was Real Madrid founded?",
            options: ["1899", "1902", "1905", "1910"],
            answer: 1
        },
        {
            question: "How many Champions League titles had Real Madrid won by 2024?",
            options: ["10", "12", "14", "15"],
            answer: 3
        },
        {
            question: "Who scored the famous winning volley in the 2002 Champions League final?",
            options: ["Raúl", "Ronaldo", "Zinedine Zidane", "Roberto Carlos"],
            answer: 2
        },
        {
            question: "Who is Real Madrid's all-time leading goalscorer?",
            options: ["Raúl", "Cristiano Ronaldo", "Karim Benzema", "Alfredo Di Stéfano"],
            answer: 1
        },
        {
            question: "What is the name of Real Madrid's home stadium?",
            options: ["Camp Nou", "Wembley", "Santiago Bernabéu", "San Siro"],
            answer: 2
        },
        {
            question: "Which team did Real Madrid defeat in the 2014 Champions League final?",
            options: ["Barcelona", "Liverpool", "Atlético Madrid", "Juventus"],
            answer: 2
        },
        {
            question: "Who won the Ballon d'Or in 2018 while playing for Real Madrid?",
            options: ["Luka Modrić", "Sergio Ramos", "Karim Benzema", "Gareth Bale"],
            answer: 0
        },
        {
            question: "Which legendary player won five consecutive European Cups with Real Madrid?",
            options: ["Zinedine Zidane", "Alfredo Di Stéfano", "Raúl", "Iker Casillas"],
            answer: 1
        },
        {
            question: "What is Real Madrid's famous nickname?",
            options: ["The Blues", "The Reds", "Los Blancos", "The Citizens"],
            answer: 2
        },
        {
            question: "Who scored the winning goal in the 2022 Champions League final?",
            options: ["Vinícius Júnior", "Karim Benzema", "Luka Modrić", "Federico Valverde"],
            answer: 0
        }
    ];

    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");
    const quizNumber = document.getElementById("quizQuestionNumber");
    const quizScore = document.getElementById("quizScore");
    const quizFeedback = document.getElementById("quizFeedback");
    const nextButton = document.getElementById("nextQuestion");
    const progressBar = document.getElementById("quizProgress");

    const quizContainer = document.getElementById("quizContainer");
    const quizResult = document.getElementById("quizResult");

    const finalScore = document.getElementById("finalScore");
    const finalMessage = document.getElementById("finalMessage");
    const restartButton = document.getElementById("restartQuiz");

    const bestScoreElement = document.getElementById("bestScore");
    const lastScoreElement = document.getElementById("lastScore");

    const resultPercentage = document.getElementById("resultPercentage");
    const correctAnswersElement = document.getElementById("correctAnswers");
    const incorrectAnswersElement = document.getElementById("incorrectAnswers");
    const answerReview = document.getElementById("answerReview");

    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    let userAnswers = [];

    function getSavedScore(key) {
        const value = localStorage.getItem(key);
        return value === null ? null : Number(value);
    }

    function updateScoreRecords() {
        const bestScore = getSavedScore("rmBestScore");
        const lastScore = getSavedScore("rmLastScore");

        if (bestScoreElement) {
            bestScoreElement.textContent =
                bestScore === null
                    ? "0 / " + questions.length
                    : bestScore + " / " + questions.length;
        }

        if (lastScoreElement) {
            lastScoreElement.textContent =
                lastScore === null
                    ? "—"
                    : lastScore + " / " + questions.length;
        }
    }

    function saveQuizResult() {
        const previousBest = getSavedScore("rmBestScore");

        localStorage.setItem("rmLastScore", score);

        const isNewRecord =
            previousBest === null || score > previousBest;

        if (isNewRecord) {
            localStorage.setItem("rmBestScore", score);

            if (previousBest !== null) {
                alert("New personal record! Congratulations, Madridista!");
            }
        }

        updateScoreRecords();
    }

    function showQuestion() {
        answered = false;

        const question = questions[currentQuestion];

        quizQuestion.textContent = question.question;

        quizNumber.textContent =
            "QUESTION " + (currentQuestion + 1) +
            " / " + questions.length;

        quizScore.textContent = "SCORE: " + score;
        quizFeedback.textContent = "";
        nextButton.disabled = true;

        nextButton.textContent =
            currentQuestion === questions.length - 1
                ? "SEE MY RESULT"
                : "NEXT QUESTION";

        progressBar.style.width =
            ((currentQuestion + 1) / questions.length * 100) + "%";

        quizOptions.innerHTML = "";

        question.options.forEach(function (option, index) {
            const button = document.createElement("button");

            button.className = "quiz-option";
            button.textContent = option;

            button.addEventListener("click", function () {
                checkAnswer(index, button);
            });

            quizOptions.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex, selectedButton) {
        if (answered) return;

        answered = true;

        const question = questions[currentQuestion];
        const correctIndex = question.answer;

        userAnswers[currentQuestion] = selectedIndex;

        const optionButtons =
            quizOptions.querySelectorAll(".quiz-option");

        optionButtons.forEach(function (button, index) {
            button.disabled = true;

            if (index === correctIndex) {
                button.classList.add("correct");
            }
        });

        if (selectedIndex === correctIndex) {
            score++;

            quizFeedback.textContent = "Correct! Hala Madrid!";
            quizFeedback.style.color = "#27864a";
        } else {
            selectedButton.classList.add("incorrect");

            quizFeedback.textContent =
                "Not quite! The correct answer is: " +
                question.options[correctIndex];

            quizFeedback.style.color = "#c34d4d";
        }

        quizScore.textContent = "SCORE: " + score;
        nextButton.disabled = false;
    }

    function showAnswerReview() {
        answerReview.innerHTML = "";

        questions.forEach(function (question, index) {
            const selectedIndex = userAnswers[index];
            const correctIndex = question.answer;
            const isCorrect = selectedIndex === correctIndex;

            const reviewItem = document.createElement("div");

            reviewItem.className = "answer-review-item";

            if (isCorrect) {
                reviewItem.classList.add("review-correct");
            } else {
                reviewItem.classList.add("review-incorrect");
            }

            const questionTitle = document.createElement("h4");

            questionTitle.textContent =
                (index + 1) + ". " + question.question;

            const selectedAnswer = document.createElement("p");

            selectedAnswer.textContent =
                "Your answer: " +
                (selectedIndex === undefined
                    ? "Not answered"
                    : question.options[selectedIndex]);

            const correctAnswer = document.createElement("p");

            correctAnswer.textContent =
                "Correct answer: " +
                question.options[correctIndex];

            const status = document.createElement("span");

            status.textContent =
                isCorrect ? "CORRECT" : "INCORRECT";

            reviewItem.appendChild(questionTitle);
            reviewItem.appendChild(selectedAnswer);
            reviewItem.appendChild(correctAnswer);
            reviewItem.appendChild(status);

            answerReview.appendChild(reviewItem);
        });
    }

    function showResult() {
        quizContainer.hidden = true;
        quizResult.hidden = false;

        finalScore.textContent =
            score + " / " + questions.length;

        const percentage =
            Math.round((score / questions.length) * 100);

        const incorrectCount = questions.length - score;

        resultPercentage.textContent = percentage + "%";
        correctAnswersElement.textContent = score;
        incorrectAnswersElement.textContent = incorrectCount;

        let message;

        if (score === 10) {
            message = "Incredible! You are a true Madridista!";
        } else if (score >= 8) {
            message = "Excellent! You know Real Madrid very well!";
        } else if (score >= 5) {
            message = "Good job! Keep learning about the club!";
        } else {
            message =
                "Every Madridista starts somewhere. Keep exploring our museum!";
        }

        finalMessage.textContent = message;

        saveQuizResult();
        showAnswerReview();
    }

    nextButton.addEventListener("click", function () {
        if (!answered) return;

        currentQuestion++;

        if (currentQuestion >= questions.length) {
            showResult();
        } else {
            showQuestion();
        }
    });

    restartButton.addEventListener("click", function () {
        currentQuestion = 0;
        score = 0;
        answered = false;
        userAnswers = [];

        quizContainer.hidden = false;
        quizResult.hidden = true;

        showQuestion();
    });

    updateScoreRecords();
    showQuestion();

    const contactForm = document.getElementById("contactForm");

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const successMessage = document.getElementById("contactSuccess");

    if (contactForm && nameInput && emailInput && messageInput) {

        function validateName() {
            const name = nameInput.value.trim();

            if (name.length < 2) {
                nameError.textContent =
                    "Name must contain at least 2 characters.";

                return false;
            }

            if (!/^[\p{L}\s'-]+$/u.test(name)) {
                nameError.textContent =
                    "Please enter a valid name.";

                return false;
            }

            nameError.textContent = "";
            return true;
        }

        function validateEmail() {
            const email = emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!emailPattern.test(email)) {
                emailError.textContent =
                    "Please enter a valid email address.";

                return false;
            }

            emailError.textContent = "";
            return true;
        }

        function validateMessage() {
            const message = messageInput.value.trim();

            if (message.length < 10) {
                messageError.textContent =
                    "Message must contain at least 10 characters.";

                return false;
            }

            messageError.textContent = "";
            return true;
        }

        nameInput.addEventListener("input", validateName);
        emailInput.addEventListener("input", validateEmail);
        messageInput.addEventListener("input", validateMessage);

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            successMessage.textContent = "";

            const validName = validateName();
            const validEmail = validateEmail();
            const validMessage = validateMessage();

            if (validName && validEmail && validMessage) {
                successMessage.textContent =
                    "Thank you, " + nameInput.value.trim() +
                    "! Your message passed validation.";

                contactForm.reset();
            }
        });
    }

    if (window.jQuery) {
        $(".main-navbar .nav-link").on("click", function () {
            $(".navbar-collapse").collapse("hide");
        });

        $(".moment-card").on("mouseenter", function () {
            $(this).find("img").stop().animate(
                { opacity: 0.8 },
                250
            );
        });

        $(".moment-card").on("mouseleave", function () {
            $(this).find("img").stop().animate(
                { opacity: 1 },
                250
            );
        });
    }

    const navbar = document.querySelector(".main-navbar");
    const navLinks = document.querySelectorAll(
        '.main-navbar .nav-link[href^="#"]'
    );

    const sections = Array.from(navLinks)
        .map(function (link) {
            const targetId = link.getAttribute("href");
            return document.querySelector(targetId);
        })
        .filter(Boolean);

    function setActiveNavLink(sectionId) {
        navLinks.forEach(function (link) {
            const targetId = link.getAttribute("href").substring(1);
            link.classList.toggle("active", targetId === sectionId);
        });
    }

    function updateActiveNavOnScroll() {
        if (sections.length === 0) return;

        const navbarHeight = navbar
            ? navbar.getBoundingClientRect().height
            : 0;

        const activationPoint = navbarHeight + 100;
        let currentSection = sections[0];

        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= activationPoint) {
                currentSection = section;
            }
        });

        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            currentSection = sections[sections.length - 1];
        }

        setActiveNavLink(currentSection.id);
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const targetId = link.getAttribute("href").substring(1);
            setActiveNavLink(targetId);
        });
    });

    window.addEventListener("scroll", updateActiveNavOnScroll, {
        passive: true
    });

    window.addEventListener("resize", updateActiveNavOnScroll);

    window.addEventListener("hashchange", function () {
        const sectionId = window.location.hash.substring(1);

        if (sectionId) {
            setActiveNavLink(sectionId);
        }
    });

    updateActiveNavOnScroll();
});