let imcCalculado = 0

function calcularIMC(){

    let peso = document.getElementById("peso").value
    let altura = document.getElementById("altura").value

    let imc = peso / (altura * altura)

    imcCalculado = imc

    let mensagem = ""

    if(imc < 18.5){
        mensagem = "Abaixo do peso"
    }
    else if(imc >= 18.5 && imc < 24.9){
        mensagem = "Peso normal"
    }
    else if(imc >= 24.9 && imc < 29.9){
        mensagem = "Sobrepeso"
    }
    else{
        mensagem = "Obesidade"
    }

    document.getElementById("resultado").innerText =
    "IMC: " + imc.toFixed(2) + " - " + mensagem
}

function salvarDados(){

    let peso = document.getElementById("peso").value
    let altura = document.getElementById("altura").value

    fetch("/salvar",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            peso:peso,
            altura:altura,
            imc:imcCalculado
        })
    })

    alert("Dados salvos!")
}