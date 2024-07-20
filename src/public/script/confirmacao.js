document.querySelector('form').addEventListener('submit', function(event) {
    const senha = document.getElementById('senha').value;
    const confirmarsenha = document.getElementById('confirmar_senha').value;
    
    if (senha !== confirmarsenha) {
        alert('As senhas não coincidem.');
        event.preventDefault();
    }
});
