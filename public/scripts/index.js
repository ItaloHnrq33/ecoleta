// aqui ele vai buscar os botoes
const buttonSearch = document.querySelector("#page-home main a ")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

// quando o event listener "ouvir" o evento de click ele retira a classe hide, logo ele exibe o modal
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})