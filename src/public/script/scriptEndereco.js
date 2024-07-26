// Seleciona os elementos do DOM pelos seus IDs
let cep = document.querySelector('#cep')
let rua = document.querySelector('#rua')
let bairro = document.querySelector('#bairro')
let cidade = document.querySelector('#cidade')
let estado = document.querySelector('#estado')
let complemento = document.querySelector('#complemento')

// Adiciona um evento de focusout ao campo de CEP
cep.addEventListener('focusout', async () => {

    try {
        // Expressão regular para validar o CEP (deve conter exatamente 8 dígitos numéricos)
        // ^  - Início da linha
        // [0-9] - Qualquer dígito de 0 a 9
        // {8} - Ocorre exatamente 8 vezes
        // $ - Fim da linha
        let validacao = /^[0-9]{8}$/
        
        // Verifica se o valor do campo CEP é válido
        if (validacao.test(cep.value)) {
            console.log('deu certo')

            // Faz uma requisição à API ViaCEP para obter informações do endereço baseado no CEP fornecido
            let resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

            // Verifica se a resposta da API foi bem-sucedida
            if (!resposta.ok) {
                console.log(err)
                console.log("x")
            } else {
                // Converte a resposta da API para JSON
                let respostaJSON = await resposta.json()
                
                // Atualiza os campos do endereço com os dados recebidos da API
                rua.value = respostaJSON.logradouro
                bairro.value = respostaJSON.bairro
                cidade.value = respostaJSON.localidade
                estado.value = respostaJSON.uf
            }
        }
    } catch (err) {
        // Trata possíveis erros durante a requisição ou manipulação dos dados
        console.log(err)
        console.log("erro")
        alert()
    }
})
