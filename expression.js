const expressions = document.getElementById('expressions');
let lastSelectedMathfield = null;

function getSelectedMathfield() {
    if (document.activeElement instanceof MathfieldElement){
        return document.activeElement;
    }
    return null;
}


function insertMatrix(mathfield, rows, cols) {
  let latex = '\\begin{bmatrix}';

  for (let i = 0; i < rows; i++) {
    latex += Array(cols)
      .fill('\\placeholder{}')
      .join(' & ');
    if (i < rows - 1) latex += ' \\\\ ';
  }

  latex += '\\end{bmatrix}';

  // Insert matrix
  mathfield.insert(latex, {
  mode: 'math',              // or 'text'
  format: 'latex',           // 'latex', 'math-json', 'spoken-text'
  insertionMode: 'replaceSelection', // 'insertBefore', 'insertAfter', 'replaceAll'
  selectionMode: 'placeholder',      // 'after', 'before', 'item', 'placeholder'
  focus: true                // focus after insert
});
}



//make the new-expression button create a new mathfield
let expression_counter = 0;

function newExpression(value = '') {
  const expression = document.createElement('div');
  expression.className = 'expression';

  const drag_handle = document.createElement('img');
  drag_handle.src = 'dragabble-icon.svg';
  drag_handle.className = "drag-handle"


  const mf = new MathfieldElement();
  mf.id = `mf-${expression_counter++}`;
  mf.className = 'math-field';
  mf.value = value;

  mf.addEventListener('keydown', (event) => {
    const isDeleteKey = event.key === 'Backspace' || event.key === 'Delete';
    const isEmpty = mf.getValue('latex').trim() === '';

    if (isDeleteKey && isEmpty) {
      event.preventDefault();
      expression.remove();
    }
  });

  mf.addEventListener("focus", () => {lastSelectedMathfield = mf});

  //disable sounds when you do an illegal action in the mathfield
  //mf.soundsDirectory = null; //<- this doesn't work for some reason (even though the docs say it should work)
  mf.keypressSound = {
  spacebar: null,
  return: null,
  delete: null,
  default: null,
  }

  

  expression.appendChild(drag_handle);
  expression.appendChild(mf);
  expressions.appendChild(expression);

  mf.inlineShortcuts = INLINE_SHORTCUTS;

  mf.focus();
  lastSelectedMathfield = mf
}




window.addEventListener('DOMContentLoaded', () => {
    const new_expr_btn = document.getElementById('new-expression');
    new_expr_btn.addEventListener('click', newExpression);

    const new_vec_btn = document.getElementById('new-vector');
    new_vec_btn.addEventListener('click', () => {
        if (lastSelectedMathfield == null) {return}
        lastSelectedMathfield.focus()
        insertMatrix(lastSelectedMathfield, 2, 1);
    })

    const new_mat_btn = document.getElementById('new-matrix');
    new_mat_btn.addEventListener('click', () => {
        if (lastSelectedMathfield == null) {return}
        lastSelectedMathfield.focus()
        insertMatrix(lastSelectedMathfield, 2, 2);
    })
});