let listaNumerosSecretos = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto)
let numeroTentativas = 0;


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdNumerosLista = listaNumerosSecretos.length;

            if(qtdNumerosLista === numeroLimite) {
                listaNumerosSecretos = [];
            }

    if (listaNumerosSecretos.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaNumerosSecretos.push(numeroEscolhido);
        return numeroEscolhido;
    }
};


function exibirTextoNaTelas(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
};

function exibirMensagemInicial() {
    exibirTextoNaTelas('h1', 'Jogo do Número Secreto');
    exibirTextoNaTelas('p', ' Escolha um número entre 1 e 50');
}

exibirMensagemInicial();

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    numeroTentativas = 0;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    console.log(numeroSecreto)
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    numeroTentativas++;
    if (numeroSecreto == chute) {
        exibirTextoNaTelas('h1', 'Acertou');
        let qtdTentativas = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${numeroTentativas} ${qtdTentativas}`
        console.log(listaNumerosSecretos)
        exibirTextoNaTelas('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTelas('p', 'O número secreto é menor');

        } else {
            exibirTextoNaTelas('p', 'O número secreto é maior');
        }
        limparCampo();
    }
}


