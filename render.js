let cam_pos = new vec2(0, 0);

//transform a world position to view position
function view_xform(world_pos) {
  let view_pos = world_pos - cam_pos;
}

function render() {
  drawVec2(
    new vec2(window.innerWidth / 2.0, window.innerHeight / 2.0),
    new vec2(100, 100),
    new vec3(0.1, 0.2, 0.9),
  );
}

function renderGrid() {}
