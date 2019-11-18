(() => {

  function init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      playBallGame();
    });
  }

  function playBallGame(){
    let racket = document.querySelector(".racket");
    let followMouse = false;
    let dist = {x: 0, y: 0};

    racket.addEventListener("click", (event) => {
      followMouse = !followMouse;
      racket.classList.toggle('racket-selected', followMouse);
      dist.x = racket.offsetLeft - event.clientX;
      dist.y = racket.offsetTop - event.clientY;
    });

    document.addEventListener("mousemove", (event) => {
      if(!followMouse) return;
      racket.style.left = (event.clientX + dist.x).toString() + "px";
      racket.style.top = (event.clientY + dist.y).toString() + "px";
    });
  }

  function getClientSizes() {
    return {
      width: Math.max(
        document.body.clientWidth,
      ),
      height: Math.max(
        document.documentElement["clientHeight"],
      ),
    };
  }
  init();

})();