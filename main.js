const dadosBase = {
  nomeDaPastelaria: "Poggers",
  contPastel: 0,
  upgrades: [
    {
      id: 0,
      nome: "Upgrade 1",
      descricao: "Upgrade 1",
      multiplicador: 2,
      custo: 1,
      obteu: false,
    },
    {
      id: 1,
      nome: "Upgrade 2",
      descricao: "Upgrade 2",
      multiplicador: 2,
      custo: 1,
      obteu: false,
    },
    {
      id: 2,
      nome: "Upgrade 3",
      descricao: "Upgrade 3",
      multiplicador: 2,
      custo: 1,
      obteu: false,
    },
    {
      id: 3,
      nome: "Upgrade 4",
      descricao: "Upgrade 4",
      multiplicador: 2,
      custo: 1,
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
  contPastel.innerText = dados.contPastel;
  document.title = "Pastelaria " + dados.nomeDaPastelaria;
  const lista = document.getElementById("upgrades");
  dados.upgrades.forEach((element) => {
    if (element.obteu == false) {
      const linha = document.createElement("li");
      linha.setAttribute("class", `upgrade`);
      linha.setAttribute("data-upgrade-id", `${element.id}`);
      const nome = document.createTextNode(element.nome);
      linha.appendChild(nome);
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
  contPastel.innerText = dados.contPastel;
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
      poderDeClique *= dados.upgrades[id].multiplicador;
      dados.upgrades[id].obteu = true;
      upgrade.remove();
      localStorage.setItem("dados", JSON.stringify(dados));
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
// --Extras--
