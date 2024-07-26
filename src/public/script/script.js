
// temas dark e ligth :

document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme + '-theme');

    if (currentTheme === 'dark') {
        themeToggleBtn.textContent = 'Light Mode';
    }

    themeToggleBtn.addEventListener('click', function () {
        const isDarkTheme = document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme', !isDarkTheme);

        if (isDarkTheme) {
            themeToggleBtn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
});

// sanduwish da navbar
// Função para alternar a exibição do menu da navbar
function toggleMenu() {
    // Seleciona o elemento da navbar com a classe 'navbar-links'
    const navbarLinks = document.querySelector('.navbar-links');

    // Alterna a classe 'show' no elemento selecionado
    // Se a classe 'show' estiver presente, ela será removida
    // Se a classe 'show' não estiver presente, ela será adicionada
    navbarLinks.classList.toggle('show');
}

// confirmação de ação:
function confirmAction(url, action) {
    let message = '';
    if (action === 'excluir') {
        message = 'Você tem certeza que deseja excluir?';
    } else if (action === 'confirmar') {
        message = 'Você tem certeza que deseja confirmar?';
    } else if (action === 'endereco') {
        message = 'Você tem certeza que deseja trocar o endereço?';
    } else {
        window.location.href = url;
        return;
    }

    if (confirm(message)) {
        // Cria um formulário dinâmico
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        document.body.appendChild(form);
        form.submit();
    }
}

