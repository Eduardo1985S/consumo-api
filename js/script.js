// URL da API local
const API_URL = '../data/api.json';
const menuContainer = document.getElementById('menu-items');
let allItems = [];

async function loadMenuItems() {
    menuContainer.innerHTML = loadingMessage('Carregando cardápio...');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const { cafeteria = [] } = await response.json();
        allItems = cafeteria;
        displayItems(allItems);
    } catch (error) {
        console.error('Erro ao carregar itens:', error);
        menuContainer.innerHTML = loadingMessage('Erro ao carregar o cardápio. Por favor, tente novamente.');
    }
}

function displayItems(items = []) {
    if (!items.length) {
        menuContainer.innerHTML = loadingMessage('Nenhum item encontrado nesta categoria.');
        return;
    }

    menuContainer.innerHTML = items.map(({ imagem, nome, categoria, descricao, preco }) => {
        const price = Number(preco ?? 0).toFixed(2);
        return `
        <div class="menu-item">
            <img src="${imagem}" alt="${nome}" class="item-image" onerror="this.src='https://via.placeholder.com/400x300?text=Sem+Imagem'">
            <div class="item-content">
                <span class="item-category">${categoria}</span>
                <h3 class="item-name">${nome}</h3>
                <p class="item-description">${descricao}</p>
                <p class="item-price">R$ ${price}</p>
            </div>
        </div>`;
    }).join('');
}

function loadingMessage(text) {
    return `<p style="text-align: center; color: #999; grid-column: 1/-1;">${text}</p>`;
}

function handleFilter(category) {
    if (category === 'todos') {
        displayItems(allItems);
        return;
    }
    displayItems(allItems.filter(item => item.categoria === category));
}

document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems();

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            handleFilter(button.getAttribute('data-category'));
        });
    });
});
