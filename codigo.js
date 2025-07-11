const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll(".btn");
const botonIgual = document.getElementById("igual");
const botonLimpiar = document.getElementById("limpiar");

let operacion = "";

botonLimpiar.addEventListener("click", ()=>{
    operacion = "";
    pantalla.textContent= "0";
});

botones.forEach(boton =>{
   boton.addEventListener("click", ()=>{
    const valor = boton.dataset.valor;

    if(valor !== undefined){    
        operacion += valor;
        pantalla.textContent = operacion;
    }
   }); 
});

function evaluarOperacion(operacion){
    try{
        const tokens  = operacion.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

        if(!tokens)return 0;

        let resultado = parseFloat(tokens[0]);

        for(let i = 1; i <tokens.length; i += 2){
            const operador = tokens[i];
            const siguienteNumero = parseFloat(tokens[i +1]);

            switch (operador) {
                case "+":
                    resultado += siguienteNumero;
                    break;
                case "-":
                    resultado -= siguienteNumero;
                    break;
                case "*":
                    resultado *= siguienteNumero;
                    break;
                case "/":
                    if(siguienteNumero == 0)return "error";//division por cero
                    resultado /= siguienteNumero;
                    break;
                default:
                    return "error";
                    
            }
        }
        return resultado;

    }catch(error){
        return "error";
    }
}


botonIgual.addEventListener("click", ()=>{
    const resultado = evaluarOperacion(operacion);
    pantalla.textContent = resultado;
    operacion = resultado.toString();
});