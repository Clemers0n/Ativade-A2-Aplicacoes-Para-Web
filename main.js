const dadosBase = {
  nomeDaPastelaria: "Poggers",
  contPastel: 0,
  upgrades: [
    {
      id: 1,
      nome: "Upgrade 1",
      descricao: "Upgrade 1",
      multiplicador: 2,
      custo: 1,
      obteu: false,
    },
    {
      id: 2,
      nome: "Upgrade 2",
      descricao: "Upgrade 2",
      multiplicador: 2,
      custo: 1,
      obteu: false,
    },
    {
      id: 3,
      nome: "Upgrade 3",
      descricao: "Upgrade 3",
      multiplicador: 2,
      custo: 1,
      obteu: false,
    },
    {
      id: 4,
      nome: "Upgrade 4",
      descricao: "Upgrade 4",
      multiplicador: 2,
      custo: 1,
      obteu: false,
    },
  ],
};
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
      const nome = document.createTextNode(element.nome);
      linha.appendChild(nome);
      lista.appendChild(linha);
    }
  });
}
addEventListener("load", () => {
  if (sessionStorage.getItem("dados") == null)
    sessionStorage.setItem("dados", JSON.stringify({ ...dadosBase }));
  const dados = JSON.parse(sessionStorage.getItem("dados"));
  carregarDados(dados);
});
// --Carrega os Dados do jogo--

// --Parte clicker do jogo--
const pastelzao = document.querySelector(".pastelzao");
pastelzao.addEventListener("click", () => {
  const dados = JSON.parse(sessionStorage.getItem("dados"));
  const contPastel = document.getElementById("contPastel");
  dados.contPastel += 1;
  contPastel.innerText = dados.contPastel;
  sessionStorage.setItem("dados", JSON.stringify(dados));
});
// --Parte clicker do jogo--

// --Upgrades--

// --Upgrades--

// --Extras--
function mudarNome(antigoNome) {
  const dados = JSON.parse(sessionStorage.getItem("dados"));
  const nome = document.getElementById("nome");
  const novoNome = prompt(
    "Digite um novo nome para Sua pastelaria",
    antigoNome
  );
  nome.innerText = novoNome;
  document.title = "Pastelaria " + novoNome;
  dados.nomeDaPastelaria = novoNome;
  sessionStorage.setItem("dados", JSON.stringify(dados));
}
// --Extras--
