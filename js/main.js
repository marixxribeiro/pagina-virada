// 1. OS DADOS: uma lista de livros
const livros = [
  { titulo: "Tudo é Rio", autor: "Carla Madeira", ano: 2014, cor: "#2f6f73", genero: "Romance" },
  { titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, cor: "#1b2a41", genero: "Clássico" },
  { titulo: "Torto Arado", autor: "Itamar Vieira Junior", ano: 2019, cor: "#8a5a2b", genero: "Romance" },
  { titulo: "A Hora da Estrela", autor: "Clarice Lispector", ano: 1977, cor: "#d9485b", genero: "Clássico" },
  { titulo: "Quarto de Despejo", autor: "Carolina Maria de Jesus", ano: 1960, cor: "#b5653a", genero: "Não ficção" }
];
// 2. O MOLDE: recebe um livro e devolve o HTML do card
function criarCard(livro) {
  return `
    <div class="col">
      <article class="card h-100 border-0 bg-transparent">
        <div class="pv-capa" style="--capa: ${livro.cor};">
          <span class="pv-capa-titulo">${livro.titulo}</span>
          <span class="pv-capa-autor">${livro.autor}</span>
        </div>
        <div class="card-body px-0">
          <h3 class="h6 fw-bold mb-1">${livro.titulo}</h3>
          <p class="text-body-secondary small mb-0">${livro.autor} · ${livro.ano}</p>
        </div>
      </article>
    </div>
  `;
}
// 3. JUNTANDO TUDO: cria um card para cada livro e coloca na página
const lista = document.getElementById("lista-livros");

// 4. MOSTRAR os livros de um gênero
function mostrar(genero) {
  let filtrados = livros;

  if (genero !== "todos") {
    filtrados = livros.filter((livro) => livro.genero === genero);
  }

  lista.innerHTML = filtrados.map(criarCard).join("");
}

// Ao abrir a página, mostra todos
mostrar("todos");
// 5. CLIQUE nos botões de filtro
const botoes = document.querySelectorAll("#filtros button");

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    // tira o "aceso" de todos e acende só o clicado
    botoes.forEach((b) => b.classList.remove("active"));
    botao.classList.add("active");

    // mostra os livros do gênero deste botão
    mostrar(botao.dataset.genero);
  });
});