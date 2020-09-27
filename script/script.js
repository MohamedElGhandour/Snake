(function () {

    const game = document.querySelector('.game'),
        pexelNumber = (625 / 25) * (400 / 25);
    var arr = [],
        gameIsWorked = true;
    var arrSnakeBody = [],
        newNum,
        indexScore = 0;
    document.querySelector('.background-sound').play();
    //create Pexel
    for (var index = 0; index < pexelNumber; index++) {
        var pexel = document.createElement("div");
        pexel.setAttribute('number', index);
        if (index % 2 == 0) // even
            pexel.classList.add('box', 'even');
        else // odd
            pexel.classList.add('box', 'odd');
        arr.push(pexel);
        game.appendChild(pexel);
    }
    //create snake
    var snake = document.createElement("div"),
        randomArrItem = Math.round(Math.random() * (arr.length));
    snake.classList.add('snake_Head');
    function createSnake(snake, randomArrItem) {
        snake.setAttribute("number", randomArrItem);
        snake.classList.add('snake_Box');
        game.appendChild(snake);
        snake.style.left = ` ${arr[snake.getAttribute("number")].offsetLeft}px`;
        snake.style.top = ` ${arr[snake.getAttribute("number")].offsetTop}px`;
        return snake;
    }
    createSnake(snake, randomArrItem);

    //move Snake
    window.addEventListener('keydown', function (e) {
        snakeMove(e, snake, arr, randomArrItem);
    });

    // Class Interval
    function Interval(fn, time) {
        var timer = false;
        this.start = function () {
            if (!this.isRunning())
                timer = setInterval(fn, time);
        };
        this.stop = function () {
            clearInterval(timer);
            timer = false;
        };
        this.isRunning = function () {
            return timer !== false;
        };
    }

    var arrowValRFN = new Interval(arrowValR, 250),
        arrowValLFN = new Interval(arrowValL, 250),
        arrowValUFN = new Interval(arrowValU, 250),
        arrowValDFN = new Interval(arrowValD, 250),
        arrFN = [arrowValRFN, arrowValLFN, arrowValUFN, arrowValDFN];

    // create fruit
    var fruit = document.createElement("img"),
        testFruit = true;
    function createFruit() {
        var randomfruit = Math.round(Math.random() * (arr.length));
        fruit.classList.add('fruit');
        while (testFruit) {
            if (arrSnakeBody.length) {
                if (randomfruit == randomArrItem) {
                    testFruit = true;
                    randomfruit = Math.round(Math.random() * (arr.length));
                } else {
                    testFruit = false;
                }
                arrSnakeBody.forEach(element => {
                    testFruit = false;
                    if (parseInt(element.getAttribute("number")) == randomfruit) {
                        testFruit = true;
                        randomfruit = Math.round(Math.random() * (arr.length));
                    }
                });
            } else {
                if (randomfruit == randomArrItem) {
                    testFruit = true;
                    randomfruit = Math.round(Math.random() * (arr.length));
                } else {
                    testFruit = false;
                }
            }
        }
        fruit.setAttribute("number", randomfruit);
        fruit.setAttribute("src", "img/tomato.png");
        game.appendChild(fruit);
        fruit.style.left = ` ${arr[fruit.getAttribute("number")].offsetLeft}px`;
        fruit.style.top = ` ${arr[fruit.getAttribute("number")].offsetTop}px`;
    }
    createFruit();

    function snakeMove(e) {
        if (gameIsWorked) {
            if (arrSnakeBody.length) {
                switch (e.which) {
                    case 39: // Arrow Right
                        if (!(arrowValRFN.isRunning())) {
                            if (arrowValLFN.isRunning()) {
                                console.log('Dimensions cannot be reversed');
                            } else {
                                arrFN.forEach(element => {
                                    if (element.isRunning())
                                        element.stop();
                                });
                                arrowValR();
                                arrowValRFN.start();
                            }
                        }
                        break;
                    case 37: // Arrow Left
                        if (!(arrowValLFN.isRunning())) {
                            if (arrowValRFN.isRunning()) {
                                console.log('Dimensions cannot be reversed');
                            } else {
                                arrFN.forEach(element => {
                                    if (element.isRunning())
                                        element.stop();
                                });
                                arrowValL();
                                arrowValLFN.start();
                            }
                        }
                        break;
                    case 38: // Arrow Up
                        if (!(arrowValUFN.isRunning())) {
                            if (arrowValDFN.isRunning()) {
                                console.log('Dimensions cannot be reversed');
                            } else {
                                arrFN.forEach(element => {
                                    if (element.isRunning())
                                        element.stop();
                                });
                                arrowValU();
                                arrowValUFN.start();
                            }
                        }
                        break;
                    case 40: // Arrow Down
                        if (!(arrowValDFN.isRunning())) {
                            if (arrowValUFN.isRunning()) {
                                console.log('Dimensions cannot be reversed');
                            } else {
                                arrFN.forEach(element => {
                                    if (element.isRunning())
                                        element.stop();
                                });
                                arrowValD();
                                arrowValDFN.start();
                            }
                        }
                        break;
                    default:
                        break;
                };
            } else {
                switch (e.which) {
                    case 39: // Arrow Right
                        if (!(arrowValRFN.isRunning())) {
                            arrFN.forEach(element => {
                                if (element.isRunning())
                                    element.stop();
                            });
                            arrowValR();
                            arrowValRFN.start();
                        }
                        break;
                    case 37: // Arrow Left
                        if (!(arrowValLFN.isRunning())) {
                            arrFN.forEach(element => {
                                if (element.isRunning())
                                    element.stop();
                            });
                            arrowValL();
                            arrowValLFN.start();
                        }
                        break;
                    case 38: // Arrow Up
                        if (!(arrowValUFN.isRunning())) {
                            arrFN.forEach(element => {
                                if (element.isRunning())
                                    element.stop();
                            });
                            arrowValU();
                            arrowValUFN.start();
                        }
                        break;
                    case 40: // Arrow Down
                        if (!(arrowValDFN.isRunning())) {
                            arrFN.forEach(element => {
                                if (element.isRunning())
                                    element.stop();
                            });
                            arrowValD();
                            arrowValDFN.start();
                        }
                        break;
                    default:
                        break;
                };
            }

        }
    }

    // create the snake body

    function setCookie(name, value, expires) {
        document.cookie = name + "=" + value + ((expires == null) ? "" : ";expires=" + expires.toGMTString())
    }
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    if (getCookie("best_Score_Number") == undefined) {
        setCookie("best_Score_Number", indexScore);
        document.querySelector('.best_Score_Number').innerText = getCookie("best_Score_Number");
    } else {
        document.querySelector('.best_Score_Number').innerText = getCookie("best_Score_Number");
    }

    function moved(number) {
        if (arrSnakeBody.length) {
            arrSnakeBody.forEach(element => {
                if (parseInt(element.getAttribute('number')) == number) {
                    console.log('LOSE');
                    gameIsWorked = false;
                    fail();
                }
            });
        }
        snake.style.left = ` ${arr[parseInt(snake.getAttribute("number"))].offsetLeft}px`;
        snake.style.top = ` ${arr[parseInt(snake.getAttribute("number"))].offsetTop}px`;
        if (arr[parseInt(snake.getAttribute("number"))] == arr[parseInt(fruit.getAttribute("number"))]) {
            document.querySelector('.eat-sound').play();
            createFruit();
            var snakeBody = document.createElement("div"),
                snakeBodyItem = createSnake(snakeBody, parseInt(snake.getAttribute("number")));
            arrSnakeBody.push(snakeBodyItem);
            document.querySelector('.score_Number').innerText = ++indexScore;
            if (parseInt(getCookie("best_Score_Number")) < parseInt(document.querySelector('.score_Number').innerText)) {
                setCookie("best_Score_Number", indexScore);
                document.querySelector('.best_Score_Number').innerText = getCookie("best_Score_Number");
            }
        }
        if (arrSnakeBody.length) {
            newNum = snakeBodyMove(number, arrSnakeBody[0]);
        }
        if (arrSnakeBody.length > 1) {
            for (var index = 1; index < arrSnakeBody.length; index++) {
                newNum = snakeBodyMove(newNum, arrSnakeBody[index]);
            }
        }
    }
    function snakeBodyMove(number, tail) {
        tail.style.left = ` ${arr[number].offsetLeft}px`;
        tail.style.top = ` ${arr[number].offsetTop}px`;
        var lastNum = parseInt(tail.getAttribute("number"));
        tail.setAttribute("number", number);
        return lastNum;
    }

    function fail() {
        document.querySelector('.end').style.transform = 'scale(1)';
        document.querySelector('.die-sound').play();
        document.querySelector('.end').addEventListener("click", function () {
            location.reload();
        });
        window.addEventListener("keydown", function (e) {
            if (e.which == 13)
                location.reload();
        });
        arrFN.forEach(element => {
            if (element.isRunning())
                element.stop();
        });
    }

    function arrowValR() {
        if ((parseInt(snake.getAttribute("number")) + 1) % 25 == 0) {
            console.log('LOSE');
            gameIsWorked = false;
            fail();
        } else {
            var lastNum = parseInt(snake.getAttribute("number"));
            snake.setAttribute("number", parseInt(snake.getAttribute("number")) + 1);
            moved(lastNum);
        }
    };

    function arrowValL() {
        if ((parseInt(snake.getAttribute("number"))) % 25 == 0) {
            console.log('LOSE');
            gameIsWorked = false;
            fail();
        } else {
            var lastNum = parseInt(snake.getAttribute("number"));
            snake.setAttribute("number", parseInt(snake.getAttribute("number")) - 1);
            moved(lastNum);
        }
    };

    function arrowValU() {
        if (parseInt(snake.getAttribute("number")) - 25 < 0) {
            console.log('LOSE');
            gameIsWorked = false;
            fail();
        } else {
            var lastNum = parseInt(snake.getAttribute("number"));
            snake.setAttribute("number", parseInt(snake.getAttribute("number")) - 25);
            moved(lastNum);
        }
    };

    function arrowValD() {
        if (parseInt(snake.getAttribute("number")) + 25 > 399) {
            console.log('LOSE');
            gameIsWorked = false;
            fail();
        } else {
            var lastNum = parseInt(snake.getAttribute("number"));
            snake.setAttribute("number", parseInt(snake.getAttribute("number")) + 25);
            moved(lastNum);
        }
    };
}())