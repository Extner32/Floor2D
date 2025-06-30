'use strict';
let cam_pos = new vec2(-window.innerWidth / 2.0, -window.innerHeight / 2.0)
let cam_scale = 1.0; //≃ zoom

//transform a world position to view position
function view_xform(world_pos) {
  let view_pos = world_pos.sub(cam_pos);
  return view_pos;
}

function render() {
  //clear the screen
  canvasFill("black")
  
  renderGrid();

  drawVec2(new vec2(window.innerWidth / 2.0, window.innerHeight / 2.0), new vec2(100, 100), "tomato");

  drawVec2(new vec2(window.innerWidth / 2.0, window.innerHeight / 2.0), new vec2(-200, 100), "blue");

  

}

function renderGrid() {
  let view_origin = view_xform(new vec2(0, 0));
  //draw x-axis
  drawLine(new vec2(0, view_origin.y), new vec2(window.innerWidth, view_origin.y), "rgb(255, 0, 0)", 1);
  //draw y-axis
  drawLine(new vec2(view_origin.x, 0), new vec2(view_origin.x, window.innerHeight), "rgb(0, 255, 0)", 1);
}
