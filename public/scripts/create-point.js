

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        } 
    } )
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } 

        citySelect.disabled = false
    } )
}


 document
     .querySelector("select[name=uf]")
     .addEventListener("change", getCities)
    
     
// itens de coleta
// pegar todos os li's encontrados e colocar dentro dessa var
const itemsToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
// faz a busca pelo input escondido para atualizar esse mesmo input com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou retirar uma classe em JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( function(item){
        const itemFound = item == itemId // isso sera true or false
        return itemFound 
    } )

    // se ja estiver selecionado, 
    if( alreadySelected >=0 ) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => { //quando essa funcao retornar false, ela retira o index do array
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        // se nao estiver selecionado, 
        //adicionar a seleção (selesctedItems)
        selectedItems.push(itemId)
    }

    // console.log('selectedItems', selectedItems)

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}