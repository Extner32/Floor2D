onCanvasResize();

let isMiddleDragging = false;
let lastMousePos = null;

function onCanvasResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

// Resize on window resize
window.addEventListener("resize", onCanvasResize);


//camera drag===========================
canvas.addEventListener("mousedown", (e) => {
  if (e.button === 1) { // 1 = middle mouse
    isMiddleDragging = true;
    lastMousePos = newVec2(e.clientX, e.clientY);
    e.preventDefault(); // prevent middle-click scroll
    sidebar.querySelectorAll("math-field").forEach(elem => elem.blur())
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (isMiddleDragging) {
    const currentMousePos = newVec2(e.clientX, e.clientY);
    const delta = currentMousePos.sub(lastMousePos);

    cam_pos = cam_pos.sub(delta.mul(1 / cam_scale));

    lastMousePos = currentMousePos;
    render(); // re-render scene
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (e.button === 1) {
    isMiddleDragging = false;
  }
});
