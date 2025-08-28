const canvas = document.querySelector("#diceCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth * 0.992, 2030);
  canvas.height = 200;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const diceImage = new Image();
diceImage.src = "./media/dice5.png";

let x = 0;
let angle = 0;

diceImage.onload = () => {
  requestAnimationFrame(animate);
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(x + 32, 100);
  ctx.rotate(angle);
  ctx.drawImage(diceImage, -32, -32, 64, 64); 
  ctx.restore();

  x += 4;
  angle += 0.1;

  if (x < canvas.width) {
    requestAnimationFrame(animate);
  } else {
   
    setTimeout(() => {
      location.href = "intro.html";
    }, 1000);
  }
}


document.querySelector("#skipBtn").addEventListener("click", () => {
  location.href = "intro.html";
});
