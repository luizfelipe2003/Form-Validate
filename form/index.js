// Previne o envio padrão do formulário
let B7Validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        // Seleciona todos os inputs do formulário
        let inputs = form.querySelectorAll('input');

        //Função para limpar os error
        B7Validator.clearErrors();
        
        
        // Valida cada input
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if (check !== true) {
                send = false;
                B7Validator.showError(input, check); // Loga a mensagem de erro
            }
        }

        // Envia o formulário se todos os inputs forem válidos
        if (send) {
            form.submit();
        }
    },

    // Obtém as regras de validação do atributo data-rules
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value === '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que possuir pelo menos 2 caracteres'
                        }
                        break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'E-mail inválido!'
                            }
                        }    
                    break;
                }
            }
        }

        return true; // Retorna true se o input for válido
    },

    //Função para exibir o error
        showError: (input, error)=> {
            input.style.borderColor = '#FF0000';

            let errorElement = document.createElement('div');
            errorElement.classList.add('error')
            errorElement.innerHTML = error;

            input.parentElement.insertBefore(errorElement, input.nextElementSibling);
        },
        clearErrors: () => {
            let inputs = form.querySelectorAll('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style = '';  
            }
        
            let errorElements = document.querySelectorAll('.error'); 
            for (let i = 0; i < errorElements.length; i++) {
                errorElements[i].remove(); 
            }
        }        
};

// Seleciona o formulário e adiciona o manipulador de envio
let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);
