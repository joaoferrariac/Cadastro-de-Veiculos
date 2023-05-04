const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sVeiculo = document.querySelector('#m-veiculo')
const sModelo = document.querySelector('#m-modelo')
const sCombustivel = document.querySelector('#m-combustivel')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sVeiculo.value = itens[index].veiculo
    sModelo.value = itens[index].modelo
    sCombustivel.value = itens[index].combustivel
    id = index
  } else {
    sVeiculo.value = ''
    sModelo.value = ''
    sCombustivel.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.veiculo}</td>
    <td>${item.modelo}</td>
    <td>${item.combustivel}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sVeiculo.value == '' || sModelo.value == '' || sCombustivel.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].veiculo = sVeiculo.value
    itens[id].modelo = sModelo.value
    itens[id].combustivel = sCombustivel.value
  } else {
    itens.push({'veiculo': sVeiculo.value, 'modelo': sModelo.value, 'combustivel': sCombustivel.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
