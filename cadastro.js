document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio do formulário
        setTimeout(function() {
            // Mostrar mensagem de sucesso
            mensagemSucesso.style.display = 'block';
            mensagemSucesso.textContent = 'Cadastro realizado com sucesso! Em breve entraremos em contato.';
            
            // Limpar o formulário
            form.reset();
            
            // Esconder a mensagem após 5 segundos
            setTimeout(function() {
                mensagemSucesso.style.display = 'none';
            }, 5000);
        }, 1000);
    });
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    });
});