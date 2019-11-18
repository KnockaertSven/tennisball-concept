(() => {

  function init() {
    document.addEventListener("DOMContentLoaded", () => {
      playBallGame();
    });
  }

  function playBallGame() {
    let racket = document.querySelector(".racket");
    let tennisball = document.querySelector(".tennisball");
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
    });
  }

  function tennisballRacketColliding(tennisball, racket) {
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

  function circleCircleColliding(a, b){
    let dx = a.position.x - b.position.x;
		let dy = a.position.y - b.position.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		return(distance < (a.radius + b.radius));
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