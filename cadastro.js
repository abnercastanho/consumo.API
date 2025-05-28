document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação adicional do CPF
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            alert('Por favor, insira um CPF válido com 11 dígitos');
            document.getElementById('cpf').focus();
            return;
        }
        
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
        
        // Limita a 11 dígitos
        if (value.length > 11) {
            e.target.value = e.target.value.slice(0, 14);
        }
    });
    
    // Máscara para CPF (com formatação automática)
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Aplica a máscara enquanto digita
        if (value.length <= 3) {
            e.target.value = value;
        } else if (value.length <= 6) {
            e.target.value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        } else if (value.length <= 9) {
            e.target.value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else {
            e.target.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        }
        
        // Limita a 11 dígitos
        if (value.length > 11) {
            e.target.value = e.target.value.slice(0, 14);
        }
    });
    
    // Máscara para CEP
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
        
        // Buscar endereço via API quando CEP estiver completo
        if (value.length === 9) {
            buscarEndereco(value);
        }
        
        // Limita a 8 dígitos
        if (value.length > 9) {
            e.target.value = e.target.value.slice(0, 9);
        }
    });
    
    // Função para buscar endereço via API (exemplo com ViaCEP)
    function buscarEndereco(cep) {
        cep = cep.replace('-', '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('estado').value = data.uf || '';
                    
                    // Foca no campo número após preencher
                    document.getElementById('numero').focus();
                } else {
                    alert('CEP não encontrado. Por favor, verifique o número digitado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP. Por favor, tente novamente.');
            });
    }
});

'use strict'; // Modo restrito

//verifica se o cep é valido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;

    if(cepValido (cep.value)){
        const dados = await fetch(url);
        const addres = await dados.json();

        // hasOWnProperty rerorna um valor booleano indicando se o objetivo possui a propriedade expecifica no parenteses
        if(addres.hasOwnPorporty('rro')){
            alert("CEP não encontrado");
        } else{
            preencherFormulario(addres);
        }
    }
}

preencherFormulario = (endereco) => {
    
}

//Função para limpar formulario
limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';  
    document.getElementById('estado').value = '';      
    document.getElementById('cidade').value = '';  
}



