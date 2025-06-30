'use strict';
// Get the canvas element and its drawing context
const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

//fill the entire canvas with color
function canvasFill(color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLine(start, end, color, width = 2) {
  ctx.beginPath(); // Start a new path
  ctx.strokeStyle = color
  ctx.lineWidth = width;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke(); // Render the path
}

function drawVec2(position, vector, color, width = 2) {
  const end = position.add(vector);
  const tip_size = width * 2.5;

  //scale factor between the height and the base of the triangle tip
  //(height*scale_factor = base)

  const scale_factor = 1.154700538;
  const vec_normalized = vector.normalized();
  const perp = new vec2(-vec_normalized.y, vec_normalized.x);

  const tip0 = end;
  const tip1 = end
    .add(vec_normalized.scale(-tip_size))
    .add(perp.scale((tip_size * scale_factor) / 2));
  const tip2 = end
    .add(vec_normalized.scale(-tip_size))
    .add(perp.scale((-tip_size * scale_factor) / 2));

  drawLine(position, end, color, width);

  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.fillStyle = color
  ctx.moveTo(tip0.x, tip0.y);
  ctx.lineTo(tip1.x, tip1.y);
  ctx.lineTo(tip2.x, tip2.y);
  ctx.lineTo(tip0.x, tip0.y);
  ctx.fill();
  ctx.closePath();
}
