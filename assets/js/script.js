const productContainer = document.querySelector('[data-product]')
const form = document.querySelector('[data-form]')

const productList = [
    {
        "name": "Boneco Mestre Yoda",
        "price": "699",
        "image": "./assets/images/bonecomestreyoda.jpg",
        "id": 1
    },
    {
        "name": "Caneca Star Wars",
        "price": "50",
        "image": "./assets/images/canecastarwars.jpg",
        "id": 2
    },
    {
        "name": "Caneca C3PO",
        "price": "50",
        "image": "./assets/images/canecac3po.jpg",
        "id": 3
    },
    {
        "name": "Sabre de Luz",
        "price": "590",
        "image": "./assets/images/sabredeluz.jpeg",
        "id": 4
    },
    {
        "name": "Blusa Star Wars",
        "price": "299",
        "image": "./assets/images/blusastarwars.jpg",
        "id": 5
    },
    {
        "name": "Boneco Darth Vader",
        "price": "790",
        "image": "./assets/images/bonecodarthvader.jpg",
        "id": 6
    },
    {
        "name": "Bone Star Wars",
        "price": "65",
        "image": "./assets/images/bonestarwars.jpg",
        "id": 7
    },
    {
        "name": "Boneco Luke Skywalker",
        "price": "830",
        "image": "./assets/images/bonecoluke.jpg",
        "id": 8
    },
    {
        "name": "Boneco R2 D2",
        "price": "620",
        "image": "./assets/images/bonecor2d2.jpg",
        "id": 9
    }
]

function createElement(name, price, image, id) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('data-id', id)

    card.innerHTML = `
      <div class="imagem">
        <img src="${image}" alt="${name}">
        <div class="card-container--info">
          <p>${name}</p>
          <div class="card-container--value">
            <p>R$ ${price}</p>
            <button class="delete-button" data-id="${id}">
              <img src="./assets/images/trashcan.png" alt="icone de lixeira" data-lixeira>
            </button>
          </div>
        </div>
      </div>`

const btnDelete = card.querySelector('[data-lixeira]')
    btnDelete.addEventListener('click', async () => {
        const confirmacao = confirm('Tem certeza que deseja excluir o produto ?')
        if (confirmacao == true) {
            try {
                card.remove()
                
                await deleteProduct(id)
                alert('Produto apagado com sucesso.')
            } catch (error) {
                console.error(error)
            }
        } else {
            alert('Nenhum produto foi apagado.')
        }
    })

    productContainer.appendChild(card)
    return card
}

function renderProducts() {
    productList.forEach((product) => {
        createElement(product.name, product.price, product.image, product.id)
    })
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.querySelector('[data-name]').value
    const price = document.querySelector('[data-price]').value
    const image = document.querySelector('[data-image]').value

    try {
        productList.push({
            name,
            price,
            image,
            id: productList.length + 1
        })
        alert('Produto guardado com sucesso.')
        form.reset()
        renderProducts()
    } catch (err) {
        console.log(err)
    }
})

async function deleteProduct(id) {
    const index = productList.findIndex((product) => product.id === id)
    if (index !== -1) {
        productList.splice(index, 1)
    } else {
        throw new Error(`Produto com ID ${id} não encontrado.`)
    }
}

renderProducts()
