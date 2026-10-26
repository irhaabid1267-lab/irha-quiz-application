
let questions = [
    {
        question: "1. What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Language", "Home Tool Language", "Hyperlinks Text"],
        answer: 0
    },
    {
        question: "2. Which language styles a webpage?",
        options: ["JavaScript", "CSS", "SQL", "Python"],
        answer: 1
    },
    {
        question: "3. Which language adds interactivity?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 2
    },
    {
        question: "4. Which tag creates a paragraph?",
        options: ["<h1>", "<p>", "<div>", "<br>"],
        answer: 1
    },
    {
        question: "5. Which symbol is used for an ID in CSS?",
        options: [".", "#", "*", "&"],
        answer: 1
    },
    {
        question: "6. Which tag adds an image?",
        options: ["<image>", "<pic>", "<img>", "<src>"],
        answer: 2
    },
    {
        question: "7. Which keyword declares a variable?",
        options: ["let", "print", "write", "show"],
        answer: 0
    },
    {
        question: "8. Which method selects an element by ID?",
        options: ["getElementById()", "getClass()", "selectId()", "findElement()"],
        answer: 0
    },
    {
        question: "9. Which tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "10. Which storage saves data in the browser?",
        options: ["localStorage", "CSS", "HTML", "console"],
        answer: 0
    }
];

let index = 0;
let score = 0;
let selected = false;

function showQuestion() {
    selected = false;
    document.getElementById("result").innerText = "";

    let q = questions[index];
    document.getElementById("question").innerText = q.question;

    let options = document.getElementById("options");
    options.innerHTML = "";

    q.options.forEach(function (option, i) {
        let btn = document.createElement("button");
        btn.innerText = option;

        btn.onclick = function () {
            if (selected) return;

            selected = true;

            if (i === q.answer) {
                score++;
            }

            options.querySelectorAll("button").forEach(function (b) {
                b.disabled = true;
            });
        };

        options.appendChild(btn);
    });

    document.getElementById("nextBtn").innerText =
        index === questions.length - 1 ? "Finish Quiz" : "Next Question";
}

function showHistory() {
    let history = JSON.parse(localStorage.getItem("quizAttempts")) || [];
    let box = document.getElementById("history");

    box.innerHTML = "";

    history.forEach(function (attempt, i) {
        let div = document.createElement("div");
        div.className = "attempt";
        div.innerText = "Attempt " + (i + 1) +
            " | Score: " + attempt.score + "/" + attempt.total +
            " | Percentage: " + attempt.percentage + "%";

        box.appendChild(div);
    });
}

document.getElementById("nextBtn").onclick = function () {
    if (!selected) {
        alert("Please select an answer first!");
        return;
    }

    if (index < questions.length - 1) {
        index++;
        showQuestion();
    } else {
        let attempt = {
            score: score,
            total: questions.length,
            percentage: ((score / questions.length) * 100).toFixed(2)
        };

        let history = JSON.parse(localStorage.getItem("quizAttempts")) || [];
        history.push(attempt);

        localStorage.setItem("quizAttempts", JSON.stringify(history));

        document.getElementById("quiz").style.display = "none";
        document.getElementById("result").innerText =
            "Your Score: " + score + "/" + questions.length +
            " (" + attempt.percentage + "%)";

        showHistory();

        let restart = document.createElement("button");
        restart.innerText = "Try Again";
        restart.id = "nextBtn";
        restart.onclick = function () {
            index = 0;
            score = 0;
            document.getElementById("quiz").style.display = "block";
            restart.remove();
            showQuestion();
        };

        document.querySelector(".container").insertBefore(
            restart, document.querySelector("hr")
        );
    }
};

showQuestion();
showHistory();