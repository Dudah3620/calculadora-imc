const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use(express.static("public"))

app.post("/salvar",(req,res)=>{

    const dados = req.body

    fs.readFile("dados.json","utf8",(err,conteudo)=>{

        let lista = []

        if(conteudo){
            lista = JSON.parse(conteudo)
        }

        lista.push(dados)

        fs.writeFile("dados.json",JSON.stringify(lista,null,2),()=>{})
    })

    res.send("ok")
})

app.listen(3000,()=>{
    console.log("Servidor rodando")
})