(() => {

  let OFFSET_RACKET_CENTER = { x: 65, y: 40 };
  let RACKET_SIZE = 90; // diameter
  let BALL_SIZE = 40; // diameter
  let debugEnabled = false;

  // TODO:
  // 1. if ball launched, set a variable to false so it cant be hit again
  // 2. launch it effectively, by calculating angle of hit
  // 3. check for collisions with words
  // 4. just play the animation on those words
  // 5. ??
  // 6. profit

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
    let dist = { x: 0, y: 0 }; // position mouse clicked on racket, this is pure for visuals

    racket.addEventListener("click", (event) => {
      followMouse = !followMouse;
      document.querySelector(".racketglow").style.opacity = 0;
      racket.classList.toggle('racket-selected', followMouse);

      if (followMouse) {
        dist.x = racket.offsetLeft - event.clientX;
        dist.y = racket.offsetTop - event.clientY;
      }
    });

    document.addEventListener("mousemove", (event) => {
      if (!followMouse) return;

      racket.style.left = (event.clientX + dist.x).toString() + "px";
      racket.style.top = (event.clientY + dist.y).toString() + "px";
      if (debugEnabled) updateDebugPosition(racket, debugOverlay);

      let check = tennisballRacketColliding(tennisball, racket);
      if (check.colliding) {
        followMouse = !followMouse;
        racket.classList.toggle('racket-selected', followMouse);
        let collisionAngle = angleOf(check.ballPos, check.racketPos);
        let headingVector = {
          x: Math.cos(collisionAngle),
          y: Math.sin(collisionAngle),
        };
        $('.ball').animate({
          left: tennisball.offsetLeft - (1000 * headingVector.x),
          top: tennisball.offsetTop - (1000 * headingVector.y),
        }, 400);

        let elements = document.querySelectorAll(".shoot-me");
        let interval = setInterval(() => {
          elements.forEach((element) => {
            let boundingRect = element.getBoundingClientRect();
            // this can be optimized since it doesnt change. get it out of the loop
            let el = {
              x: element.offsetLeft,
              y: element.offsetTop,
              w: boundingRect.width,
              h: boundingRect.height,
            };
            let b = {
              x: tennisball.offsetLeft + BALL_SIZE / 2,
              y: tennisball.offsetTop + BALL_SIZE / 2,
              r: BALL_SIZE / 2,
            };
            let collid = tennisballElementColliding(b, el);
            if (collid){
              element.classList.toggle("lobaway", true);
            }
          });
        }, 1000 / 30);

        setTimeout(() => clearInterval(interval), 400);
      }
    });
  }

  function angleOf(p1, p2) {
    let deltaY = (p2.y - p1.y);
    let deltaX = (p2.x - p1.x);
    return Math.atan2(deltaY, deltaX);
  }

  function tennisballRacketColliding(ball, racket) {
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

    return {
      colliding: (distance < (BALL_SIZE / 2 + RACKET_SIZE / 2)),
      racketPos: racketPos,
      ballPos: ballPos,
    };
  }

  // MarkE is my hero
  // https://stackoverflow.com/a/21096179/4576996
  function tennisballElementColliding(ball, rect) {
    var distX = Math.abs(ball.x - rect.x - rect.w / 2);
    var distY = Math.abs(ball.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + ball.r)) { return false; }
    if (distY > (rect.h / 2 + ball.r)) { return false; }

    if (distX <= (rect.w / 2)) { return true; }
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (ball.r * ball.r));
  }

  function updateDebugPosition(racket, debugOverlay) {
    debugOverlay.style.left = (racket.offsetLeft + OFFSET_RACKET_CENTER.x).toString() + "px";
    debugOverlay.style.top = (racket.offsetTop + OFFSET_RACKET_CENTER.y).toString() + "px";
  }

  init();

})();