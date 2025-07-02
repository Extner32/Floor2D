variables = new Map();


function onExpressionChanged(mathfield) {
    // console.log("edited");
    // let mathfields = getMathfields()
    // for (let i=0; i<mathfields.length; i++) {
    //     console.log(latexToMatrix(mathfields[i].value).toString());
    // }
    return;
}

function getMathfields() {
    return expressions.querySelectorAll('math-field');
}

//convertes a latex matrix (e.g.: \begin{bmatrix}1 & 0\\ 2 & 2\end{bmatrix})
//to a matrix object
function latexToMatrix(latex) {
    latex = latex.replace("\\begin{bmatrix}", "").replace("\\end{bmatrix}", "");
    latex = latex.replaceAll(" ", "");

    let result = latex.split("\\\\");

    for (let i=0; i<result.length; i++) {
        result[i] = result[i].split("&");

        //convert the string to a number
        for (let k=0; k<result[i].length; k++) {
            if (isNaN(result[i][k])) {throw new Error("matrix can only contain numbers or variables");}
            result[i][k] = new Decimal(result[i][k]);
        }
    }

    return new Matrix(result);
}

function containsVars(latex) {
    
}

function evalExpression(latex) {
    if (latex.includes("=")) {
        evalVariable(latex);
    }
}


function evalVariable(latex) {
    let varname = latex.split("=")[0];
    let varvalue = latex.split("=")[1];


}


function evalNumeric(latex) {

}