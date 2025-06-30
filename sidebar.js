const resizer = document.getElementById("resizer");
const sidebar = document.getElementById("sidebar");

const min_width = 200
const max_width = 800

let isResizing = false;

resizer.addEventListener("mousedown", function (e) {
  isResizing = true;
  document.body.style.cursor = "ew-resize";
});

document.addEventListener("mousemove", function (e) {
  if (!isResizing) return;

  let newWidth = e.clientX;
  if (newWidth < min_width) newWidth = min_width;
  if (newWidth > max_width) newWidth = max_width;

  sidebar.style.width = `${newWidth}px`;
});

document.addEventListener("mouseup", function () {
  if (isResizing) {
    isResizing = false;
    document.body.style.cursor = "default";
  }
});


new Sortable(document.getElementById('expressions'), {
  animation: 150,
  handle: '.drag-handle',
});
