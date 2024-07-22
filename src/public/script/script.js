
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
function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('show');
}

// confirmação de ação:
function confirmAction(url, action) {
    let message = '';
    if (action === 'excluir') {
        message = 'Você tem certeza que deseja excluir?';
    } else if (action === 'confirmar') {
        message = 'Você tem certeza que deseja confirmar?';
    } else {
        window.location.href = url;
        return;
    }
    // confirm() é nativo do js e faz aparecer uma mensagem e dois botões(ok/cancelar) para o usuario retornar true ou false
    if (confirm(message)) {
        window.location.href = url;
    }
}
