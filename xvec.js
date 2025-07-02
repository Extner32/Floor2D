class Matrix {
  constructor(data) {
    // Validate that data is a 2D array and convert all elements to Decimal
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error("Input must be a 2D array");
    }

    this.rows = data.length;
    this.cols = data[0].length;
    this.data = data.map(row =>
    row.map(val => Decimal.isDecimal(val) ? val : new Decimal(val))
    );
  }

  static zero(rows, cols) {
    return new Matrix(Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => new Decimal(0))
    ));
  }

  static identity(size) {
    const data = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => new Decimal(i === j ? 1 : 0))
    );
    return new Matrix(data);
  }

  get(i, j) {
  if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
    throw new Error("Index out of bounds");
  }
  return this.data[i][j];
  }

  set(i, j, value) {
  if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
    throw new Error("Index out of bounds");
  }
  this.data[i][j] = new Decimal(value);
  }

  add(other) {
    this._checkDimensions(other);
    const result = this.data.map((row, i) =>
      row.map((val, j) => val.add(other.data[i][j]))
    );
    return new Matrix(result);
  }

  sub(other) {
    this._checkDimensions(other);
    const result = this.data.map((row, i) =>
      row.map((val, j) => val.sub(other.data[i][j]))
    );
    return new Matrix(result);
  }

  mul(other) {
    if (typeof other === 'number' || Decimal.isDecimal(other)) {
      // Scalar multiplication
      const scalar = new Decimal(other);
      const result = this.data.map(row =>
        row.map(val => val.mul(scalar))
      );
      return new Matrix(result);
    }

    // Matrix multiplication
    if (this.cols !== other.rows) {
      throw new Error("Incompatible dimensions for matrix multiplication");
    }

    const result = Array.from({ length: this.rows }, (_, i) =>
      Array.from({ length: other.cols }, (_, j) => {
        let sum = new Decimal(0);
        for (let k = 0; k < this.cols; k++) {
          sum = sum.add(this.data[i][k].mul(other.data[k][j]));
        }
        return sum;
      })
    );

    return new Matrix(result);
  }

  dot(other) {
    if (!this._checkVector(other)) {throw new Error("incompatible vectors or not both vectors")}
    let result = new Decimal(0);

    for (let i=0; i<this.rows; i++) {
      result = result.add(this.get(i, 0).mul(other.get(i, 0)));
    }

    return result;

  }

  length() {
    if (!this._isVector(this)) {throw new Error("matrix must be a vector")}
    let result = new Decimal(0);
    for (let i=0; i<this.rows; i++) {
      result = result.add((this.get(i, 0)).pow(2));
    }
    result = result.sqrt();
    return result;
  }

  normalized() {
    if (!this._isVector(this)) {throw new Error("matrix must be a vector")}
    let result = [];
    let len = this.length();
    if (len==0) {return newVec(Array(this.length).fill(0))}


    for (let i=0; i<this.rows; i++) {
      result.push(this.get(i, 0).div(len));
    }

    return newVec(result);
  }

  transpose() {
    const result = Array.from({ length: this.cols }, (_, i) =>
      Array.from({ length: this.rows }, (_, j) => this.data[j][i])
    );
    return new Matrix(result);
  }

  _checkDimensions(other) {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match");
    }
  }

  _isVector(matrix) {
    return (matrix.cols == 1)
  }

  _checkVector(other) {
    if (this.rows != other.rows) {return false}
    if (this.cols != 1 || other.cols != 1) {return false}
    return true;
  }

  toString() {
    let str = "";
    for (let i=0; i<this.rows; i++) {
      str += "[";
      for (let k=0; k<this.cols; k++) {
        str = str+(this.get(i, k).toPrecision(5))+"\t";
      }
      str += "]\n";
    }

    return str;
  }

  toArray() {
    return this.data.map(row => row.map(val => val.toNumber()));
  }
}


function newVec2(x=0, y=0) {
  return new Matrix([[x], [y]]);
}

function newVec3(x=0, y=0, z=0) {
  return new Matrix([[x], [y], [z]]);
}

function newVec(components) {
  elem = []
  for (let i=0; i<components.length; i++) {
    elem.push([components[i]]);
  }
  return new Matrix(elem);
}