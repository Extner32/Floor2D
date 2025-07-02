'use strict';
// Get the canvas element and its drawing context
const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

//fill the entire canvas with color
function canvasFill(color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLine(start, end, color, width = 3) {
  ctx.beginPath(); // Start a new path
  ctx.strokeStyle = color
  ctx.lineWidth = width;
  ctx.moveTo(start.get(0, 0), start.get(1, 0));
  ctx.lineTo(end.get(0, 0), end.get(1, 0));
  ctx.stroke(); // Render the path
}

function drawVec2(position, vector, color, width = 3) {
  const end = position.add(vector);
  
  const tip_size = width * 3;

  //scale factor between the height and the base of the triangle tip
  //(height*scale_factor = base)

  const scale_factor = 1.154700538;
  const vec_normalized = vector.normalized();
  const perp = newVec2(vec_normalized.get(1, 0).neg(), vec_normalized.get(0, 0));

  const tip0 = end;
  const tip1 = end
    .add(vec_normalized.mul(-tip_size))
    .add(perp.mul((tip_size * scale_factor) / 2));
  const tip2 = end
    .add(vec_normalized.mul(-tip_size))
    .add(perp.mul((-tip_size * scale_factor) / 2));

  drawLine(position, end.sub(vec_normalized.mul((tip_size))), color, width);

  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.fillStyle = color
  ctx.moveTo(tip0.get(0, 0), tip0.get(1, 0));
  ctx.lineTo(tip1.get(0, 0), tip1.get(1, 0));
  ctx.lineTo(tip2.get(0, 0), tip2.get(1, 0));
  ctx.lineTo(tip0.get(0, 0), tip0.get(1, 0));
  ctx.fill();
  ctx.closePath();
}
