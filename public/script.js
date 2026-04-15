function calcularIMC(){

    let peso = document.getElementById("peso").value
    let altura = document.getElementById("altura").value

    let imc = peso / (altura * altura)

    let mensagem = ""

    if(imc < 18.5){
        mensagem = "Abaixo do peso"
    }
    else if(imc < 24.9){
        mensagem = "Peso normal"
    }
    else if(imc < 29.9){
        mensagem = "Sobrepeso"
    }
    else{
        mensagem = "Obesidade"
    }

    document.getElementById("resultado").innerText =
    "IMC: " + imc.toFixed(2) + " - " + mensagem
}

async function salvarDados(){

    let peso = document.getElementById("peso").value
    let altura = document.getElementById("altura").value
    let imc = (peso / (altura * altura)).toFixed(2)

    await fetch("/salvar",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            peso:peso,
            altura:altura,
            imc:imc
        })
    })

    carregar()
}

async function carregar(){

    const resposta = await fetch("/dados")
    const dados = await resposta.json()

    const lista = document.getElementById("lista")

    lista.innerHTML = ""

    dados.forEach(item => {

        const li = document.createElement("li")

        li.textContent =
        `Peso: ${item.peso} | Altura: ${item.altura} | IMC: ${item.imc}`

        lista.appendChild(li)

    })

}

document.addEventListener("DOMContentLoaded", carregar)