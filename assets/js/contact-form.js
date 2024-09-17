const formulario = document.getElementbyId('contact-form');

formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const data = new FormData(formulario);

    const url = 'https://formsubmit.co/duffieprofissional@gmail.com';

    fetch(url, {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (response.ok) {
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.textContent = "Mensagem enviada com sucesso!";
            mensagemDiv.classList.remove('hidden');
            mensagemDiv.classList.add('mensagem-sucesso');

            formulario.reset(); // Reseta o formulário após enviar
            setTimeout(() => {
                mensagemDiv.classList.add('hidden');
            }, 3000);
        } else {
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.textContent = "Erro ao enviar a mensagem. Tente novamente mais tarde."
            mensagemDiv.classList.remove('hidden');
            mensagemDiv.classList.add('mensagem-erro');

            setTimeout(() => {
                mensagemDiv.classList.add('hidden');
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});