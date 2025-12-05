// URL da API local
const API_URL = '../data/api.json';

let allItems = [];

// Função para carregar os itens da API
async function loadMenuItems() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allItems = data.cafeteria;
        displayItems(allItems);
    } catch (error) {
        console.error('Erro ao carregar itens:', error);
        document.getElementById('menu-items').innerHTML = 
            '<p style="text-align: center; color: #999; grid-column: 1/-1;">Erro ao carregar o cardápio. Por favor, tente novamente.</p>';
    }
}

// Função para exibir os itens na página
function displayItems(items) {
    const menuContainer = document.getElementById('menu-items');
    
    if (items.length === 0) {
        menuContainer.innerHTML = 
            '<p style="text-align: center; color: #999; grid-column: 1/-1;">Nenhum item encontrado nesta categoria.</p>';
        return;
    }

    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.imagem}" alt="${item.nome}" class="item-image" onerror="this.src='https://via.placeholder.com/400x300?text=Sem+Imagem'">
            <div class="item-content">
                <span class="item-category">${item.categoria}</span>
                <h3 class="item-name">${item.nome}</h3>
                <p class="item-description">${item.descricao}</p>
                <p class="item-price">R$ ${item.preco.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Função para filtrar itens por categoria
function filterItems(category) {
    if (category === 'todos') {
        displayItems(allItems);
    } else {
        const filtered = allItems.filter(item => item.categoria === category);
        displayItems(filtered);
    }
}

// Event listeners para os botões de filtro
document.addEventListener('DOMContentLoaded', () => {
    // Carregar itens ao iniciar
    loadMenuItems();

    // Adicionar event listeners aos botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            // Filtrar itens
            const category = button.getAttribute('data-category');
            filterItems(category);
        });
    });
});
