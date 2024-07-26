/*let cep = 60140120

fetch(`https://viacep.com.br/ws/${cep}/json/`)
.then(resposta=> resposta.json())// deu certo (try) json=> resposta.json() é uma função de retorno json
.then(json=> console.log(json)) // imprimir o JSON
.catch(_err => console.log("erro na solicitação!"))// não deu certo (except)
*/
let cep = document.querySelector('#cep')
let rua = document.querySelector('#rua')
let bairro = document.querySelector('#bairro')
let cidade = document.querySelector('#cidade')
let estado = document.querySelector('#estado')
let complemento = document.querySelector('#complemento')

cep.addEventListener('focusout', async () => {

    try {
        let validacao = /^[0-9]{8}$/ //expressoes regulares
        if (validacao.test(cep.value)) {
            console.log('deu certo')
            let resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

            if (!resposta.ok) {
                console.log(err)
                console.log("x")
            } else {
                let respostaJSON = await resposta.json()
                rua.value  = respostaJSON.logradouro
                bairro.value = respostaJSON.bairro
                cidade.value = respostaJSON.localidade
                estado.value = respostaJSON.uf               
            }
        }
    } catch (err) {
        console.log(err)
        console.log("erro")
        alert()
    }
})