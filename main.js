onCanvasResize();

function onCanvasResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

const resizer = document.getElementById("resizer");
const sidebar = document.getElementById("sidebar");

let isResizing = false;

resizer.addEventListener("mousedown", function (e) {
  isResizing = true;
  document.body.style.cursor = "ew-resize";
});

document.addEventListener("mousemove", function (e) {
  if (!isResizing) return;

  let newWidth = e.clientX;
  if (newWidth < 100) newWidth = 100; // minimum width
  if (newWidth > 600) newWidth = 600; // maximum width

  sidebar.style.width = `${newWidth}px`;
});

document.addEventListener("mouseup", function () {
  if (isResizing) {
    isResizing = false;
    document.body.style.cursor = "default";
  }
});

// Resize on window resize
window.addEventListener("resize", onCanvasResize);
