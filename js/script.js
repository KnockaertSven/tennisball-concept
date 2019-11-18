(() => {

  let OFFSET_RACKET_CENTER = {x: 65, y: 40};

  function init() {
    document.addEventListener("DOMContentLoaded", () => {
      playBallGame();
    });
  }

  function playBallGame() {
    let racket = document.querySelector(".racket");
    let tennisball = document.querySelector(".ball");
    let debugOverlay = document.querySelector(".debug");
    let followMouse = false;
    let dist = { x: 0, y: 0 };

    racket.addEventListener("click", (event) => {
      followMouse = !followMouse;
      racket.classList.toggle('racket-selected', followMouse);
      dist.x = racket.offsetLeft - event.clientX;
      dist.y = racket.offsetTop - event.clientY;
    });

    document.addEventListener("mousemove", (event) => {
      if (!followMouse) return;
      racket.style.left = (event.clientX + dist.x).toString() + "px";
      racket.style.top = (event.clientY + dist.y).toString() + "px";
      debugOverlay.style.left = (racket.offsetLeft + OFFSET_RACKET_CENTER.x).toString() + "px";
      debugOverlay.style.top = (racket.offsetTop + OFFSET_RACKET_CENTER.y).toString() + "px";
      let ballLaunched = tennisballRacketColliding(tennisball, racket);
      console.log(ballLaunched);
    });
  }

  function tennisballRacketColliding(ball, racket) {
    let BALL_SIZE = 40;
    let RACKET_SIZE = 90;
    let ballPos = {
      x: ball.offsetLeft + BALL_SIZE / 2,
      y: ball.offsetTop + BALL_SIZE / 2,
    };
    let racketPos = {
      x: racket.offsetLeft + OFFSET_RACKET_CENTER.x,
      y: racket.offsetTop + OFFSET_RACKET_CENTER.y,
    };

    let dx = ballPos.x - racketPos.x;
    let dy = ballPos.y - racketPos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < (BALL_SIZE / 2 + RACKET_SIZE/2));
  }

  function tennisballElementColliding(tennisball, element) {
    let circle = {
      x: tennisball.offsetLeft,
      y: tennisball.offsetTop,
    };
    let rect = {
      x: element.offsetLeft,
      y: element.offsetTop,
    };
    return rectCircleColliding(circle, rect);
  }

  // MarkE is my hero
  // https://stackoverflow.com/a/21096179/4576996
  function rectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) { return false; }
    if (distY > (rect.h / 2 + circle.r)) { return false; }

    if (distX <= (rect.w / 2)) { return true; }
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
  }

  function getClientSizes() {
    return {
      width: Math.max(document.body.clientWidth),
      height: Math.max(document.body.clientHeight),
    };
  }
  init();

})();