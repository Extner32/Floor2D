'use strict';
let cam_pos = newVec2(-window.innerWidth / 2.0, -window.innerHeight / 2.0)
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

  drawVec2(newVec2(window.innerWidth / 2.0, window.innerHeight / 2.0), newVec2(100, 50), "green", 3);

  drawVec2(newVec2(window.innerWidth / 2.0, window.innerHeight / 2.0), newVec2(-200, 100), "blue");

  

}

function renderGrid() {
  let view_origin = view_xform(newVec2(0, 0));
  //draw x-axis
  drawLine(newVec2(0, view_origin.get(1, 0)), newVec2(window.innerWidth, view_origin.get(1, 0)), "rgb(255, 0, 0)", 1);
  //draw y-axis
  drawLine(newVec2(view_origin.get(0, 0), 0), newVec2(view_origin.get(0, 0), window.innerHeight), "rgb(0, 255, 0)", 1);
}
