const dadosBase = {
  nomeDaPastelaria: "Poggers",
  contPastel: 0,
  upgrades: [
    {
      id: 0,
      nome: "Cozinheiros",
      descricao:
        "Contrate cozinheiros para facilitar sua produção de pasteis. Multiplica a poder do seu click em 1.5x",
      multiplicador: 1.5,
      custo: 10,
      obteu: false,
    },
    {
      id: 1,
      nome: "Fritadeira Maior",
      descricao:
        "Agora você consegue fazer ainda mais pasteis em menos tempo. Multiplica o poder do seu click em 2x",
      multiplicador: 2,
      custo: 200,
      obteu: false,
    },
    {
      id: 2,
      nome: "Cliques Divinos",
      descricao:
        "Deus dos Pastéis te abençoou com cliques sagrados. Multiplica o poder do seu click em 4x",
      multiplicador: 4,
      custo: 500,
      obteu: false,
    },
    {
      id: 3,
      nome: "cal D. cana",
      descricao:
        "Como não servir um pastel com seu leal companheiro, o caldo de cana. Multiplica o poder de click em 2x",
      multiplicador: 2,
      custo: 1000,
      obteu: false,
    },
    {
      id: 4,
      nome: "Ascensão Pastelística",
      descricao:
        "Você não é mais apenas um cozinheiro... você é o pastel. Seu corpo, mente e alma se fundiram à massa crocante e ao recheio perfeito. Cada clique agora carrega o poder absoluto. Aumento de multiplicador colossal.",
      multiplicador: 1000,
      custo: 10000,
      obteu: false,
    },
  ],
};
let poderDeClique = 1;
// --Carrega os Dados do jogo--
function carregarDados(dados) {
  const nome = document.getElementById("nome");
  const contPastel = document.getElementById("contPastel");
  nome.innerText = dados.nomeDaPastelaria;
  nome.setAttribute("onClick", `mudarNome("${dados.nomeDaPastelaria}")`);
  contPastel.innerText = formartarNumero(dados.contPastel);
  document.title = "Pastelaria " + dados.nomeDaPastelaria;
  const lista = document.getElementById("upgrades");
  dados.upgrades.forEach((element) => {
    if (element.obteu == false) {
      const linha = document.createElement("li");
      linha.setAttribute("class", `upgrade`);
      linha.setAttribute("data-upgrade-id", `${element.id}`);
      const nome = document.createTextNode(element.nome);
      const custo = document.createElement("span");
      custo.innerText = formartarNumero(element.custo) + " Pasteis";
      linha.appendChild(nome);
      linha.appendChild(custo);
      lista.appendChild(linha);
    } else {
      poderDeClique *= element.multiplicador;
    }
  });
}
addEventListener("load", () => {
  if (localStorage.getItem("dados") == null)
    localStorage.setItem("dados", JSON.stringify(dadosBase));
  const dados = JSON.parse(localStorage.getItem("dados"));
  carregarDados(dados);
  upgradeListener();
});
// --Carrega os Dados do jogo--

// --Parte clicker do jogo--
const pastelzao = document.querySelector(".pastelzao");
pastelzao.addEventListener("click", () => {
  const dados = JSON.parse(localStorage.getItem("dados"));
  const contPastel = document.getElementById("contPastel");
  dados.contPastel += poderDeClique;
  contPastel.innerText = formartarNumero(dados.contPastel);
  localStorage.setItem("dados", JSON.stringify(dados));
});
// --Parte clicker do jogo--

// --Upgrades--
function upgradeListener() {
  const upgrades = document.querySelectorAll(".upgrade");
  upgrades.forEach((upgrade) => {
    upgrade.addEventListener("click", (event) => {
      const dados = JSON.parse(localStorage.getItem("dados"));
      const id = event.currentTarget.dataset.upgradeId;
      const contador = document.getElementById("contPastel");
      if (dados.contPastel >= dados.upgrades[id].custo) {
        dados.contPastel -= dados.upgrades[id].custo;
        contador.innerText = dados.contPastel;
        dados.upgrades[id].obteu = true;
        poderDeClique *= dados.upgrades[id].multiplicador;
        upgrade.remove();
        localStorage.setItem("dados", JSON.stringify(dados));
      }
    });

    upgrade.addEventListener("mouseover", (event) => {
      const dados = JSON.parse(localStorage.getItem("dados"));
      const id = event.currentTarget.dataset.upgradeId;
      const div = document.createElement("div");
      div.setAttribute("class", "descricao");

      const titulo = document.createElement("h3");
      const corpo = document.createElement("p");
      titulo.innerHTML = dados.upgrades[id].nome;
      corpo.innerHTML = dados.upgrades[id].descricao;
      div.appendChild(titulo);
      div.appendChild(corpo);
      event.currentTarget.insertBefore(div, event.currentTarget.firstChild);
    });
    upgrade.addEventListener("mouseout", () => {
      const div = document.querySelector(".descricao");
      div.remove();
    });
  });
}
// --Upgrades--

// --Extras--
function mudarNome(antigoNome) {
  const dados = JSON.parse(localStorage.getItem("dados"));
  const nome = document.getElementById("nome");
  const novoNome = prompt(
    "Digite um novo nome para Sua pastelaria",
    antigoNome
  );
  if (novoNome) {
    nome.innerText = novoNome;
    nome.setAttribute("onClick", `mudarNome("${novoNome}")`);

    document.title = "Pastelaria " + novoNome;
    dados.nomeDaPastelaria = novoNome;
    localStorage.setItem("dados", JSON.stringify(dados));
  }
}

function formartarNumero(numero) {
  return numero.toLocaleString("pt-BR");
}

let timeout;
const tempoLimite = 60000;
function reiniciarTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    alert("Você está inativo! Vai fritar pastel ou não?");
  }, tempoLimite);
}
document.addEventListener("click", reiniciarTimeout);
document.addEventListener("mousemove", reiniciarTimeout);
document.addEventListener("keydown", reiniciarTimeout);
reiniciarTimeout();
// --Extras--
