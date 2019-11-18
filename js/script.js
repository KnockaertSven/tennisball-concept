(() => {

  let OFFSET_RACKET_CENTER = { x: 65, y: 40 };
  let RACKET_SIZE = 90; // diameter
  let BALL_SIZE = 40; // diameter
  let debugEnabled = false;

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
      racket.classList.toggle('racket-selected', followMouse);
      dist.x = racket.offsetLeft - event.clientX;
      dist.y = racket.offsetTop - event.clientY;
    });

    document.addEventListener("mousemove", (event) => {
      if (!followMouse) return;

      racket.style.left = (event.clientX + dist.x).toString() + "px";
      racket.style.top = (event.clientY + dist.y).toString() + "px";
      if (debugEnabled) updateDebugPosition(racket, debugOverlay);

      let ballLaunched = tennisballRacketColliding(tennisball, racket);
      if (ballLaunched) {

      }
      // TODO:
      // 1. if ball launched, set a variable to false so it cant be hit again
      // 2. launch it effectively, by calculating angle of hit
      // 3. check for collisions with words
      // 4. just play the animation on those words
      // 5. ??
      // 6. profit
    });
  }

  function angleOf(p1, p2) {
    // NOTE: Remember that most math has the Y axis as positive above the X.
    // However, for screens we have Y as positive below. For this reason, 
    // the Y values are inverted to get the expected results.
    let deltaY = (p1.y - p2.y);
    let deltaX = (p2.x - p1.x);
    let result = Math.toDegrees(Math.atan2(deltaY, deltaX));
    // return (result < 0) ? (360d + result) : result;
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
    return (distance < (BALL_SIZE / 2 + RACKET_SIZE / 2));
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

  function updateDebugPosition(racket, debugOverlay) {
    debugOverlay.style.left = (racket.offsetLeft + OFFSET_RACKET_CENTER.x).toString() + "px";
    debugOverlay.style.top = (racket.offsetTop + OFFSET_RACKET_CENTER.y).toString() + "px";
  }

  init();

})();