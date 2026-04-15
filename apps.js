import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();  //instancia do express
const PORT = 3000;  //porta de comunicação com o server 

const dadosFilePath = path.join(__dirname, 'dados.json');

app.use(express.json());
app.use(express.static('public'));

//rota para servir o html
app.get('/', (req, res)=>{
   res.sendFile(path.join(__dirname, 'public', 'index.html'));    

});

function lerDados(){
    try{
   const dados = fs.readFileSync(dadosFilePath, 'utf8');
   return JSON.parse(dados);


    }catch(error){
      console.error('Erro ao ler o arquivo', error)
      return[];

    }
}
function salvarDados(novoDado){
   const dados = lerDados();
   dados.push(novoDado);

try{
  fs.writeFileSync(dadosFilePath, 
    JSON.stringify(dados, null, 2), 'utf-8');
    console.log('Dados salvos com sucesso!!')

}catch(error){
    console.error('Erro ao salvar os dados', (error))


}

}

app.post('/salvar',(req, res)=>{
    const dadosParaEnviar = req.body;
    console.log('Dados recebidos', dadosParaEnviar);

if(!dadosParaEnviar.pedidos || !dadosParaEnviar.total){
    return res.status(400).send('Dados inválidos');
}

salvarDados(dadosParaEnviar);
res.send('Dados salvos com sucesso')

})



app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)

});