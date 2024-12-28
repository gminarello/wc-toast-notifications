jQuery(function ($) {
    toastr.options = {
        positionClass: 'toast-top-center',
        closeButton: false,
        timeOut: 4000,
        extendedTimeOut: 2000,
        progressBar: true,
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
    };

    function showToast(message, type = 'success', url = null) {
        let $toast;

        if (type === 'error') {
            $toast = toastr.error(message);
        } else {
            $toast = toastr.success(message);
        }

        // Se houver um link, adiciona o evento de clique
        if (url) {
            $toast.on('click', function () {
                window.location.href = url; // Redireciona para o link
            });

            // Altere o estilo para indicar que é clicável (opcional)
            $toast.css('cursor', 'pointer');
        }
    }

    function scrollToErrorField() {
        // Procura pelos campos com erro, exceto os da seção "billing"
        const $fieldsWithErrors = $('.woocommerce-invalid, .form-row--invalid').filter(function () {
            return !$(this).attr('id')?.startsWith('billing_'); // Exclui campos com IDs que começam com "billing_"
        });

        if ($fieldsWithErrors.length) {
            // Identifica o primeiro campo mais próximo do topo
            const $firstErrorField = $fieldsWithErrors
                .toArray()
                .reduce((closest, current) => {
                    return $(current).offset().top < $(closest).offset().top
                        ? current
                        : closest;
                });

            // Faz o scroll até o campo com erro, ajustando a margem superior (-300px)
            $('html, body').animate(
                {
                    scrollTop: $($firstErrorField).offset().top - 300, // Margem superior de 300px
                },
                500 // Duração da animação (em ms)
            );

            // Adiciona um foco no campo com erro (opcional, para destaque)
            $($firstErrorField).find('input, select, textarea').focus();
        }
    }

    const observer = new MutationObserver(() => {
        $('.woocommerce-message, .woocommerce-error').each(function () {
            // Verifica se é uma mensagem de erro
            const isError = $(this).hasClass('woocommerce-error');
            const type = isError ? 'error' : 'success';

            // Captura o conteúdo da mensagem
            let message = $(this).html();

            // Se for um erro, trata as mensagens dentro de <li>
            if (isError) {
                const $listItems = $(this).find('li');

                // Verifica se é o bloco genérico ou o bloco superior
                if ($listItems.length > 0) {
                    // Cria uma lista de mensagens, ignorando as de "billing"
                    const messages = [];

                    $listItems.each(function () {
                        const text = $(this).text();

                        // Ignora mensagens relacionadas a "billing"
                        if (!text.toLowerCase().includes('faturamento') && !text.toLowerCase().includes('billing')) {
                            messages.push(text); // Adiciona apenas mensagens fora de "billing"
                        }
                    });

                    // Exibe cada mensagem em um toast separado
                    messages.forEach((msg) => {
                        showToast(msg, type);
                    });

                    // Posiciona a tela no campo com erro
                    scrollToErrorField();
                } else {
                    // Caso contrário, mantém mensagens genéricas (abaixo dos inputs) no formulário
                    return; // Não remove nem trata mensagens genéricas
                }
            } else {
                // Exibe mensagens de sucesso diretamente no toast
                let toastContent = message;
                const $notification = $(this);

                // Verifica se a notificação possui links ou botões
                const $links = $notification.find('a');
                const $buttons = $notification.find('button');

                if ($links.length > 0) {
                    const link = $links.first().attr('href');
                    const linkText = $links.first().text();
                    toastContent = $('<div>').append($notification.clone().children().remove().end().text()).html(); // Remove links e botões da notificação original

                    // Adiciona o link ao toast
                    showToast(`${toastContent} <a href="${link}" style="text-decoration: none; color: inherit;">${linkText}</a>`, type, link);
                } else if ($buttons.length > 0) {
                    toastContent = $('<div>').append($notification.clone().children().remove().end().text()).html(); // Remove links e botões da notificação original

                    // Adiciona botões ao toast
                    $buttons.each(function () {
                        toastContent += `<button onclick="${$(this).attr('onclick')}">${$(this).text()}</button>`;
                    });

                    showToast(toastContent, type);
                } else {
                    showToast(toastContent, type);
                }
            }

            // Remove a mensagem padrão WooCommerce (apenas a superior)
            $(this).remove();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});