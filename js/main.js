// 1. OS DADOS: uma lista de livros
const livros = [
  {
    id: "tudo-e-rio",
    titulo: "Tudo é Rio", autor: "Carla Madeira", ano: 2014,
    cor: "#4b5fd6", texto:"#fffaf2", genero:"Romance",
    sobre: "Estreia da escritora mineira. Um casamento, uma perda e uma terceira personagem que muda a vida dos dois."
  },
  {
    id: "dom-casmurro",
    titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899,
    cor: "#9b7fe8", texto:"#22243b",genero: "Clássico",
    sobre: "Bentinho conta a própria história com Capitu, e o leitor precisa decidir o quanto confia nesse narrador."
  },
  {
    id: "torto-arado",
    titulo: "Torto Arado", autor: "Itamar Vieira Junior", ano: 2019,
    cor: "#f26a3db", texto:"#22243b", genero: "Romance",
    sobre: "Duas irmãs no sertão da Bahia e a relação delas com a terra onde vivem e trabalham."
  },
  {
    id: "hora-da-estrela",
    titulo: "A Hora da Estrela", autor: "Clarice Lispector", ano: 1977,
    cor: "#f48fb6", texto:"#22243b", genero: "Clássico",
    sobre: "A história de Macabéa, uma jovem nordestina no Rio, narrada por um escritor que hesita em contá-la."
  },
  {
    id: "quarto-de-despejo",
    titulo: "Quarto de Despejo", autor: "Carolina Maria de Jesus", ano: 1960,
    cor: "#a7b85c", texto:"#22243b", genero: "Não ficção",
    sobre: "O diário de uma mulher catadora de papel na favela do Canindé, em São Paulo."
  }
];
// 2. O MOLDE: recebe um livro e devolve o HTML do card
function criarCard(livro) {
    return `
    <div class="col">
      <article class="card h-100 border-0 bg-transparent">
        <div class="pv-capa" style="--capa: ${livro.cor}; --capa-texto: ${livro.texto};">
          <span class="pv-capa-titulo">${livro.titulo}</span>
          <span class="pv-capa-autor">${livro.autor}</span>
        </div>
        <div class="card-body px-0">
          <h3 class="h6 fw-bold mb-1">${livro.titulo}</h3>
          <p class="text-body-secondary small mb-2">${livro.autor} · ${livro.ano}</p>
<button type="button" class="btn btn-link p-0 stretched-link"
        data-bs-toggle="modal" data-bs-target="#modal-livro"
        data-id="${livro.id}">
  Ver detalhes
</button>
          </p>
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
// 6. MODAL: preenche com o livro clicado
const modal = document.getElementById("modal-livro");

modal.addEventListener("show.bs.modal", (event) => {
  // 1) qual botão foi clicado?
  const botao = event.relatedTarget;

  // 2) qual o id do livro desse botão?
  const id = botao.dataset.id;

  // 3) procura esse livro na lista
  const livro = livros.find((l) => l.id === id);

  // 4) troca os textos do modal
  document.getElementById("modal-titulo").textContent = livro.titulo;
  document.getElementById("modal-autor").textContent = `${livro.autor} · ${livro.ano}`;
  document.getElementById("modal-sobre").textContent = livro.sobre;
  document.getElementById("modal-genero").textContent = livro.genero;
}); 

// 7. FORMULÁRIO: validação
const form = document.getElementById("form-inscricao");
const sucesso = document.getElementById("sucesso");

form.addEventListener("submit", (event) => {
  // impede a página de recarregar
  event.preventDefault();

  // esconde o sucesso de um envio anterior
  sucesso.classList.add("d-none");

  // algum campo inválido?
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // tudo certo: mostra o sucesso e limpa o formulário
  sucesso.classList.remove("d-none");
  form.reset();
  form.classList.remove("was-validated");
});