const OPERATORS = {
  '*': '\\cdot',
  '@': '\\bullet',
  'sqrt': '\\sqrt{#?}',
};

const GREEK_LETTERS = {
  'alpha': '\\alpha',
  'beta': '\\beta',
  'gamma': '\\gamma',
  'delta': '\\delta',
  'epsilon': '\\epsilon',
  'zeta': '\\zeta',
  'eta': '\\eta',
  'theta': '\\theta',
  'iota': '\\iota',
  'kappa': '\\kappa',
  'lambda': '\\lambda',
  'mu': '\\mu',
  'µ': '\\mu',
  'nu': '\\nu',
  'xi': '\\xi',
  'pi': '\\pi',
  'rho': '\\rho',
  'sigma': '\\sigma',
  'tau': '\\tau',
  'upsilon': '\\upsilon',
  'phi': '\\phi',
  'chi': '\\chi',
  'psi': '\\psi',
  'omega': '\\omega',
};

const TRIG = {
  'sin': '\\sin',
  'cos': '\\cos',
  'tan': '\\tan',
  'arccos': '\\arccos',
  'arcsin': '\\arcsin',
  'arctan': '\\arctan',
};

const INLINE_SHORTCUTS = {
  ...OPERATORS,
  ...GREEK_LETTERS,
  ...TRIG,
};


const ALLOWED_VARNAMES = [
  ...'abcdefghijklmnopqrstuvwxyz'.split(''),
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  ...new Set(Object.values(GREEK_LETTERS)),
];

console.log(ALLOWED_VARNAMES);