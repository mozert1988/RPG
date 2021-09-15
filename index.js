//Variaveis e listas globais do jogo 
let motorista = [];
let clima = [];
let localidades = ["Area de Risco", "Bairros", "Região Central", "Região Metropolitana"];
let localidadeAtual;
let horaAtual = new Date();
let climaAtual;
let translado = [];
let postos = [];
let refeicao = [];
let usuario = [];
let transladoInfo;

//Execução das funcões com a inicialização dos objetos e listas necessarias para inicar o jogo 
SetarAtributosIniciais();
SetarTranslado();
SetarClima();
SetarAlmoco();
SetarAbastecimento();
SetarUsuario();

//Função que que inicia o jogo
InicioDoJogo();


console.log(horaAtual);
console.log(
    "\nHumor: " + motorista[0].humor +
    "  |  Energia: " + motorista[0].energia + 
    "  |  Gasolina: " + motorista[0].gasolina.toFixed(2) +
    "  |  Dinheiro: " + motorista[0].dinheiro);

//--------------------------------------------------------------------

function SetarAtributosIniciais(){

  //Inicializando os atributos iniciais do motorista
  let atributos = new Object();
  atributos.humor = 50;
  atributos.energia = 50;
  atributos.gasolina = 2.00;
  atributos.dinheiro = 120;

  //Adicionando o objeto dos atributos na lista motorista
  motorista.push(atributos);

  //Definindo a hora inicial do jogo
  horaAtual.setHours(06);
  horaAtual.setMinutes(00);

  //Definindo o local de inicio do game
  localidadeAtual = localidades[0];
}


function InicioDoJogo(){

  //Frase de abertura do jogo 
  console.log("Bom dia, são 06:00 da manhã, é hora de levantar e começar o dia! Tome seu café e decida qual vai ser a sua primeira atividade!\n");

  //Imprimindo a informação dos atributos iniciais do jogado 
  console.log(
    "Humor: " + motorista[0].humor +
    "  |  Energia: " + motorista[0].energia + 
    "  |  Gasolina: " + motorista[0].gasolina.toFixed(2) +
    "  |  Dinheiro: " + motorista[0].dinheiro);

  //Informando sobre o nivel de gasolina, dando uma dica para inicio do jogo
  console.log("\nVocê está com o nível de gasolina baixo, deseja abastecer ou vamos ligar o aplicativo e começar as corridas?\n")

  //Apresentando uma opção para que o usuario iniciar o jogo 
  let acao = prompt(
    "1 = Abastecer\n" +
    "2 = Iniciar as Corridas\n"
  );

  console.clear();
  
  //Verificando a ação que o usuário escolheu 
  if(acao == 1){
    Abastecer();
  }
  
  //Executando a função que inicia as corridas do dia
  IniciarCorridas();
  
}

function IniciarCorridas(){
  
  let finalizado = false;

  while(!finalizado){
    let destino = ProximoDestino();
    horaAtual.setMinutes(horaAtual.getMinutes() + transladoInfo.espera);

    console.clear();

    console.log(
      "Humor: " + motorista[0].humor +
      "  |  Energia: " + motorista[0].energia + 
      "  |  Gasolina: " + motorista[0].gasolina.toFixed(2) +
      "  |  Dinheiro: " + motorista[0].dinheiro);

    console.log("\n" + horaAtual);

    //Imprimindo um novo chamado com todas as informaçoes sobre a corrida
    console.log("\n\nPililin!! Você recebeu uma nova corrida!!\n");
    console.log("Informações:");
    console.log("De: " + localidadeAtual);
    console.log(`Para:  ${destino}`);
    console.log("Distancia: " + transladoInfo.quilometro + " km ");
    console.log("Tempo de viagem: " + transladoInfo.tempo * transladoInfo.quilometro + " minutos ");
    console.log("Valor da Corrida: R$" + transladoInfo.valor);

    //Apresentando ao motorista a opção de aceitar o cancelar a corrida
    let confirmacao = prompt(
      "\n\nDeseja aceitar a Corrida? \n" +
      "1 = Aceitar\n" +
      "2 = Recusar\n"
    );

    //Verificando a escolha do usuario
    if(confirmacao == 2){
      RejeitarCorrida();
    }else{
      AceitarCorrida(destino);
    }

    //Verificando se algum atributo foi zerado o que leva ao final do jogo 
    if(motorista[0].humor == 0 || motorista[0].energia == 0 || motorista[0].dinheiro == 0 || motorista[0].gasolina == 0){
      console.clear();
      console.log("------ Game Over -----");
      finalizado = true;
    }
    
    //Verificando se algum atributo está abaixo e apresentando opção para aumentar esse atributo
    if(motorista[0].energia < 30 || motorista[0].humor < 30){
      console.log(horaAtual + "\n\n" + "Localidade atual: " + localidadeAtual);
      console.log("Você está rodando muito e ficou bem cansado!");
      let rodar = prompt(
        "1 = Continuar Rodando\n" +
        "2 = Dormir\n" +
        "3 = Comer\n"
      );

      //Verificando a ação do motorista
      if(rodar == 2){
        Dormir();
      }else if(rodar == 3){
        Comer();
      }

      //verificando regra de tempo para finalizar o jogo 
      if(horaAtual.getHours() >= 18){
        console.clear();
        console.log("Fim do dia, é hora de ir pra casa!");
        console.log(" Sua meta diaria era de R$ 300.00 você finalizou o dia com R$ " + motorista[0].dinheiro);
        if(motorista[0].dinheiro < 300){

          console.log("Você não atingiu a meta diaria, mais sorte nas corridas amanhã");
        }else {

          console.log("Parabéns, você teve um dia muito lucrativo bateu a meta diaria, agora é hora de descansar que amanha tem mais!");
        }
        finalizado = true;
      }
    }

    //Verificando o nivel de gasolina no tanque e oferecendo solução para abastecimento 
    if(motorista[0].gasolina < 5){
      console.log(horaAtual + "\n\n" + "Localidade: " + localidadeAtual);
      console.log("Você está com o nível de gasolina muito baixo!");
      let abastecer = prompt("\nDeseja Abastecer?\n" +
        "1 = Sim\n" +
        "2 = Não"
      );

      if(abastecer == 1){
        Abastecer();
      }
    }
  }
}

// Definindo uma função para alimentação, excluido a area central para gerar um pouco de dificuldade
function Comer(){
  
  if(localidadeAtual == localidades[2]){
    console.clear();
    console.log("Você se encontra no momento na Área Central, e não possuímos restaurantes com locais para estacionar  nessa região!\n");
    console.log("Você precisa se locomover para outra região para se alimentar!\n");


    //Apresentando as opçoes para o motorista se alimentar 
    let destino = prompt(
      "2 = " + localidades[1] +
      "\n3 = " + localidades[0] +
      "\n4 = " + localidades[3] +
      "\n"
    );

    //Verificando a escolha do usuário
    switch (destino){
      case "2":
        CalcularTranslado(localidades[1]);
        break;
      case "3":
        CalcularTranslado(localidades[0]);
        break
      case "4":
        CalcularTranslado(localidades[3]);
        break;
    }
  }

  //Procurando o objeto do restaurante referente a localidade dentro da lista de restaurantes disponíveis
  let refeicaoObj = refeicao.find(local => local.area == localidadeAtual);
  
  //Adicionando/Removendo valores dos atributos do usuario com base no restaurante
  motorista[0].dinheiro -= refeicaoObj.preco;
  motorista[0].energia += refeicaoObj.energiapositiva;
  motorista[0].humor += refeicaoObj.humorpositivo;

  //Adicionando o tempo de pausa do almoço no tempo do jogo
  horaAtual.setMinutes(horaAtual.getMinutes() + 60);

  console.clear();
  console.log("------ Você Almoçou ---------\n")
  prompt(
    "Agora você está de barriguinha cheia sua energia e seu humor aumentaram!\n" + 
    "Deixa de preguiça e volte ao trabalho, Hoje é dia de luta, você ainda tem que trabalhar muito para os dias de gloria!\n" + 
    "Digite enter para continuar!"
  );

  console.clear();

}

//Definindo as regras para o cochilo como localidade e aumento de energia e humor
function Dormir(){
  if(localidadeAtual != localidades[0]){
    CalcularTranslado(localidades[0]);
  }
  
  motorista[0].energia += 20;
  motorista[0].humor += 20;

  //Acrescentando o tempo de descanso ao jogo 
  horaAtual.setMinutes(horaAtual.getMinutes() + 30);


  //Imprimindo a informaco sobre a soneca
  console.clear();
  console.log("------ Você deu uma cochilada revigorante ----------");

  prompt(
    "Sua energia e seu humor aumentaram 20\n " + 
    "Digite enter para iniciar as corridas"
  );

  console.clear();

}
//Criando a função para sortear o passageiro, já subtraindo as perdas de energia e o ganho de dinheiro
function AceitarCorrida(destino){
  CalcularTranslado(destino);
  let mensagem;
  motorista[0].dinheiro += transladoInfo.valor;
  motorista[0].energia -= 5;

  //Sorteando o passageiro dentro da lista de usuarios desponiveis que realizou a chamada
  let passageiro = usuario[Math.floor(Math.random() * (10 - 0)) + 0];

  //Adicionando/Removendo valores dos atributos dependendo do passageiro que fez a chamada
  switch(passageiro.tipo){
    case "Legal":
      motorista[0].humor += passageiro.humor;
      mensagem = "Você deu sorte, o passageiro " + passageiro.nome + " era legal, seu Humor aumentou: " + passageiro.humor
      break;
    case "Gorjeta":
      motorista[0].humor += passageiro.humor;
      mensagem = "Você deu sorte, o passageiro " + passageiro.nome + " te deu uma Gorjeta, seu Humor aumentou: " + passageiro.humor
      motorista[0].dinheiro += 5;
      break;
    case "Chato":
      motorista[0].humor -= passageiro.humor;
      mensagem = "Que azar, o passageiro " + passageiro.nome + " era chato, seu Humor diminuiu: " + passageiro.humor
      break;
    case "Compras":
      motorista[0].humor -= passageiro.humor;
      mensagem = "Que azar, o passageiro " + passageiro.nome + " era tinha compras, seu Humor diminuiu: " + passageiro.humor
      break;
  }

  //Imprimindo a mensagem final quando a corrida for finalizada
  console.clear();
  console.log("----- Corrida Finalizada!! -----\n");
  console.log(mensagem);
  prompt("\nDigite Enter para finalizar o resumo da corrida! ");
  console.clear();
  
}

//Funçao para rejeitar a corrida, atualizar a hora 
function RejeitarCorrida(){
  horaAtual.setMinutes(horaAtual.getMinutes() + transladoInfo.espera);
  console.clear();
}

//Gerando aleatoriamente o destino da proxima chamada
function ProximoDestino(){
  let novoDestino = localidades[Math.floor(Math.random() * (4 - 0)) + 0];
  
  //Executando a função que calcula os gastos do translado da localidade atual com o proximo destino
  transladoInfo = AcharLocalidade(novoDestino);
  
  return novoDestino;
}

//Funçao que executa as regras sobre o abastecimento!
function Abastecer(){
  
  //Verificando se o motorista se encontra na area de risco, onde nao há postos de gasolina disponíveis
  if(localidadeAtual == localidades[0]){
    console.log("Você se encontra no momento na Área de Risco, e não possuí postos de gasolina disponível nessa região!\n");
    console.log("Você precia se locomover para outra região para abastecer seu carro!\n");

    //Apresentando locais onde tem postos disponiveis para o usuário
    let destino = prompt(
      "2 = " + localidades[1] +
      "\n3 = " + localidades[2] +
      "\n4 = " + localidades[3] +
      "\n"
    );

    //Verificando a escolha do usuario
    switch (destino){
      case "2":
        CalcularTranslado(localidades[1]);
        break;
      case "3":
        CalcularTranslado(localidades[2]);
        break
      case "4":
        CalcularTranslado(localidades[3]);
        break;
    }
  }

  //Adicionando/Removendo os atributos do motorista com base no posto que ele realizou o abastecimento
  motorista[0].gasolina += 10;
  let postoObj = postos.find(local => local.area == localidadeAtual);
  let valorAbastecimento = postoObj.preco * 10;
  motorista[0].dinheiro -= valorAbastecimento;
  motorista[0].energia -= postoObj.energia;
  motorista[0].humor -= postoObj.humor;

  console.clear();
  console.log("------- Carro Abastecido -------\n");
  prompt("Para iniciar as corridas, digite enter!");
  console.clear();
}

//Funçao que executa as regras de calculo de uma região para outra.
function CalcularTranslado(destino){
  let deslocamento;
  let tempoGasto;
  let gasolinaGasta;
  
  //Executando a função que acha os valores de translado da regiao atual com o novo destino
  deslocamento = AcharLocalidade(destino)

  //Adicionando/Removendo valores nos atributos com base nos calculos de translado de uma região para outra
  tempoGasto = deslocamento.tempo * deslocamento.quilometro;
  horaAtual.setMinutes(horaAtual.getMinutes() + tempoGasto);
  gasolinaGasta = 0.1 * deslocamento.quilometro;
  motorista[0].gasolina -= gasolinaGasta; 
  localidadeAtual = destino;
}

//Função que verifica a origem e o destido e retorna os valores de translado entre essas duas regioes
function AcharLocalidade(destino){
  if((localidadeAtual == localidades[0] && destino == localidades[1]) || (localidadeAtual == localidades[1] && destino == localidades[0])){
    return translado.find(local => local.tag == "BA");
  }else if((localidadeAtual == localidades[0] && destino == localidades[2]) || (localidadeAtual == localidades[2] && destino == localidades[0])){
    return translado.find(local => local.tag == "CA");
  }else if((localidadeAtual == localidades[0] && destino == localidades[3]) || (localidadeAtual == localidades[3] && destino == localidades[0])){
    return translado.find(local => local.tag == "MA");
  }else if(localidadeAtual == localidades[2] && destino == localidades[2]){
    return translado.find(local => local.tag == "CC");
  }else if((localidadeAtual == localidades[1] && destino == localidades[2]) || (localidadeAtual == localidades[2] && destino == localidades[1])){
    return translado.find(local => local.tag == "CB");
  }else if((localidadeAtual == localidades[2] && destino == localidades[3]) || (localidadeAtual == localidades[3] && destino == localidades[2])){
    return translado.find(local => local.tag == "CM");
  }else if(localidadeAtual == localidades[1] && destino == localidades[1]){
    return translado.find(local => local.tag == "BB");
  }else if((localidadeAtual == localidades[1] && destino == localidades[3]) || (localidadeAtual == localidades[3] && destino == localidades[1])){
    return translado.find(local => local.tag == "BM");
  }else if(localidadeAtual == localidades[0] && destino == localidades[0]){
    return translado.find(local => local.tag == "AA");
  }else if(localidadeAtual == localidades[3] && destino == localidades[3]){
    return translado.find(local => local.tag == "MM");
  }
}

//Criando os objetos dos passageiros e adicionando em uma lista
function SetarUsuario(){
  let passageiroLegal = new Object();
  passageiroLegal.humor = 5;
  passageiroLegal.energia = 5;
  passageiroLegal.nome = "João";
  passageiroLegal.tipo = "Legal";

  usuario.push(passageiroLegal);

  let passageiroLegal2 = new Object();
  passageiroLegal2.humor = 5;
  passageiroLegal2.energia = 5;
  passageiroLegal2.nome = "Pedro";
  passageiroLegal2.tipo = "Legal";

  usuario.push(passageiroLegal2);

  let passageiroLegal3 = new Object();
  passageiroLegal3.humor = 5;
  passageiroLegal3.energia = 5;
  passageiroLegal3.nome = "Victor";
  passageiroLegal3.tipo = "Legal";

  usuario.push(passageiroLegal3);

  let passageiroLegal4 = new Object();
  passageiroLegal4.humor = 5;
  passageiroLegal4.energia = 5;
  passageiroLegal4.nome = "Matheus";
  passageiroLegal4.tipo = "Legal";

  usuario.push(passageiroLegal4);

  let passageiroChato = new Object();
  passageiroChato.humor = 10;
  passageiroChato.energia = 5;
  passageiroChato.nome = "Thiago";
  passageiroChato.tipo = "Chato";

  usuario.push(passageiroChato);

  let passageiroChato2 = new Object();
  passageiroChato2.humor = 10;
  passageiroChato2.energia = 5;
  passageiroChato2.nome = "Tulio";
  passageiroChato2.tipo = "Chato";

  usuario.push(passageiroChato2);

  let passageiroChato3 = new Object();
  passageiroChato3.humor = 10;
  passageiroChato3.energia = 5;
  passageiroChato3.nome = "Gustavo";
  passageiroChato3.tipo = "Chato";

  usuario.push(passageiroChato3);

  let passageiroChato4 = new Object();
  passageiroChato4.humor = 10;
  passageiroChato4.energia = 5;
  passageiroChato4.nome = "Lucas";
  passageiroChato4.tipo = "Chato";

  usuario.push(passageiroChato);

  let passageiroCompras = new Object();
  passageiroCompras.humor = 5;
  passageiroCompras.energia = 5;
  passageiroCompras.nom = "Maria";
  passageiroCompras.tipo = "Compras";

  usuario.push(passageiroCompras);
 
 let passageiroGorjeta = new Object();
 passageiroGorjeta.humor = 10;
 passageiroGorjeta.energia = 5;
 passageiroGorjeta.nome = "Marcus";
 passageiroGorjeta.tipo = "Gorjetas"; 

  usuario.push(passageiroGorjeta);

}

//Criando os objetos dos restaurantes e adicionando em uma lista
function SetarAlmoco(){
  let almocoARisco = new Object();
  almocoARisco.area = localidades[0]
  almocoARisco.preco = 10;
  almocoARisco.energiapositiva = 20;
  almocoARisco.humorpositivo = 15;

  refeicao.push(almocoARisco);

  let almocoBairro = new Object();
  almocoBairro.area = localidades[1];
  almocoBairro.preco = 15;
  almocoBairro.energiapositiva = 30;
  almocoBairro.humorpositivo = 20;

  refeicao.push(almocoBairro);

  let almocoMetropolitana = new Object();
  almocoMetropolitana.area = localidades[3];
  almocoMetropolitana.preco = 20;
  almocoMetropolitana.energiapositiva = 35;
  almocoMetropolitana.humorpositivo = 20;

  refeicao.push(almocoMetropolitana);
}
//Criando os objetos dos postos e adicionando em uma lista
function SetarAbastecimento(){
  let postoBairro = new Object();
  postoBairro.area = localidades[1];
  postoBairro.preco = 7;
  postoBairro.energia = 10;
  postoBairro.humor = 25;

  postos.push(postoBairro);

  let postoCentral = new Object();
  postoCentral.area = localidades[2];
  postoCentral.preco = 5;
  postoCentral.energia = 10;
  postoCentral.humor = 20;
  
  postos.push(postoCentral);

  let postoMetropolitana = new Object();
  postoMetropolitana.area = localidades[3];
  postoMetropolitana.preco = 9;
  postoMetropolitana.energia = 10;
  postoMetropolitana.humor = 30;

  postos.push(postoMetropolitana);
}

//Criando os objetos de translado entre as regioes e adicionando em uma lista
function SetarTranslado(){
  let centralCentral = new Object();
  centralCentral.tag = "CC";
  centralCentral.origem = localidades[2];
  centralCentral.destino = localidades[2];
  centralCentral.quilometro = 3;
  centralCentral.tempo = 5;
  centralCentral.valor = 5;
  centralCentral.espera = 1;

  translado.push(centralCentral);

  let centralBairro = new Object();
  centralBairro.tag = "CB";
  centralBairro.origem = localidades[2];
  centralBairro.destino = localidades[1];
  centralBairro.quilometro = 6;
  centralBairro.tempo = 4;
  centralBairro.valor = 14;
  centralBairro.espera = 1;

  translado.push(centralBairro);

  let centralMetropolitana = new Object();
  centralMetropolitana.tag = "CM";
  centralMetropolitana.origem = localidades[2];
  centralMetropolitana.destino = localidades[3];
  centralMetropolitana.quilometro = 20;
  centralMetropolitana.tempo = 2;
  centralMetropolitana.valor = 40;
  centralMetropolitana.espera = 1;

  translado.push(centralMetropolitana);

  let centralARisco = new Object();
  centralARisco.tag = "CA";
  centralARisco.origem = localidades[2];
  centralARisco.destino = localidades[0];
  centralARisco.quilometro = 20;
  centralARisco.tempo = 2;
  centralARisco.valor = 40;
  centralARisco.espera = 1;

  translado.push(centralARisco);

  let bairroBairro = new Object();
  bairroBairro.tag = "BB";
  bairroBairro.origem = localidades[1];
  bairroBairro.destino = localidades[1];
  bairroBairro.quilometro = 3;
  bairroBairro.tempo = 3;
  bairroBairro.valor = 8;
  bairroBairro.espera = 5;

  translado.push(bairroBairro);

  let bairroARisco = new Object();
  bairroARisco.tag = "BA";
  bairroARisco.origem = localidades[1];
  bairroARisco.destino = localidades[0];
  bairroARisco.quilometro = 5;
  bairroARisco.tempo = 5;
  bairroARisco.valor = 14;
  bairroARisco.espera = 5;

  translado.push(bairroARisco);

  let bairroMetropolitana = new Object();
  bairroMetropolitana.tag = "BM";
  bairroMetropolitana.origem = localidades[1];
  bairroMetropolitana.destino = localidades[3];
  bairroMetropolitana.quilometro = 15;
  bairroMetropolitana.tempo = 3;
  bairroMetropolitana.valor = 40;
  bairroMetropolitana.espera = 5;

  translado.push(bairroMetropolitana);

  let metropolitanaMetropolitana = new Object();
  metropolitanaMetropolitana.tag = "MM";
  metropolitanaMetropolitana.origem = localidades[3];
  metropolitanaMetropolitana.destino = localidades[3];
  metropolitanaMetropolitana.quilometro = 5;
  metropolitanaMetropolitana.tempo = 5;
  metropolitanaMetropolitana.valor = 12;
  metropolitanaMetropolitana.espera = 25;
  
  translado.push(metropolitanaMetropolitana);

  let metropolitanaARisco = new Object ();
  metropolitanaARisco.tag = "MA"
  metropolitanaARisco.origem = localidades[3];
  metropolitanaARisco.destino = localidades[0];
  metropolitanaARisco.quilometro = 10;
  metropolitanaARisco.tempo = 4;
  metropolitanaARisco.valor = 30;
  metropolitanaARisco.espera = 25;

  translado.push(metropolitanaARisco);

  let areadeARisco = new Object ();
  areadeARisco.tag = "AA";
  areadeARisco.origem = localidades[0];
  areadeARisco.destino = localidades[0];
  areadeARisco.quilometro = 3;
  areadeARisco.tempo = 10;
  areadeARisco.valor = 15;
  areadeARisco.espera = 10;

  translado.push(areadeARisco);

}

//Criando os objetos referente ao tempo e adicionando em uma lista 
function SetarClima(){
  let frio = new Object();
  frio.nome = "Frio";
  frio.humor = 3;
  frio.ar = 5; 
  
  clima.push(frio);

  let calor = new Object();
  calor.nome = "Calor";
  calor.humor = 5;
  calor.ar = 5;
  
  clima.push(calor);

  let chuva = new Object();
  chuva.nome = "Chuva";
  chuva.humor = 10;
  chuva.ar = 5;
  
  clima.push(chuva);

  let tempoNormal = new Object();
  tempoNormal.nome = "Tempo Normal";
  tempoNormal.humor = 0;
  tempoNormal.ar = 0;
  
  clima.push(tempoNormal);
  
  //Definindo aleatoriamente o clima que se inicia o jogo
  climaAtual = clima[Math.floor(Math.random() * (4 - 0)) + 0].nome;
}
