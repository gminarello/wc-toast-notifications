# WC Toast Notifications

Transforma as notificações padrões do WooCommerce em algo bonito e funcional.

## Descrição

O plugin WC Toast Notifications substitui as notificações padrão do WooCommerce por notificações toast, utilizando a biblioteca toastr.js. Isso proporciona uma experiência de usuário mais agradável e moderna.

## Funcionalidades

- Notificações toast para mensagens de sucesso, erro, informação e aviso.
- Configuração de posição, tempo de exibição e outros parâmetros das notificações.
- Integração com a biblioteca toastr.js para exibição das notificações.

## Instalação

1. Faça o upload dos arquivos do plugin para o diretório `/wp-content/plugins/wc-toast-notifications` ou instale diretamente pelo painel do WordPress.
2. Ative o plugin através do menu 'Plugins' no WordPress.

## Uso

### Configuração

As configurações do plugin podem ser encontradas em WooCommerce > Configurações > Toast Notifications. As opções disponíveis são:

- **Posição das notificações**: Define a posição das notificações na tela.
- **Tempo de exibição**: Define o tempo de exibição das notificações.
- **Mostrar botão de fechar**: Habilita ou desabilita o botão de fechar nas notificações.

### Exemplo de Uso

As notificações são exibidas automaticamente pelo WooCommerce, substituindo as notificações padrão. Não é necessário adicionar código adicional para utilizar o plugin.

## Desenvolvimento

### Scripts e Estilos

Os scripts e estilos do plugin são carregados através da função `wctn_enqueue_scripts` no arquivo `wc-toast-notifications.php`. Os arquivos incluídos são:

- `assets/scripts.js`
- `assets/styles.css`
- `assets/toastr.min.js`
- `assets/toastr.min.css`

### Funções Principais

- `wctn_enqueue_scripts`: Carrega os scripts e estilos do plugin.
- `showToast`: Função JavaScript para exibir uma notificação toast.
- `scrollToErrorField`: Função JavaScript para rolar a página até o campo com erro.

## Suporte

Para suporte, entre em contato com o autor do plugin através do site [Webefy](https://webefy.com.br/).

## Licença

Este plugin não é open-source e é distribuído sob uma licença proprietária. Para mais informações sobre a licença e termos de uso, entre em contato com o autor do plugin.