<?php
/*
Plugin Name: WC Toast Notifications
Plugin URI: https://cloubox.com.br/
Description: Transforma as notificações padrões do WooCommerce em algo bonito e funcional.
Version: 1.0.1
Author: Cloubox
Author URI: https://cloubox.com.br/
Text Domain: wc-toast-notifications
*/

// Bloquear acesso direto
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Carrega os scripts e estilos no frontend
function wctn_enqueue_scripts() {
    if (class_exists('WooCommerce')) {
        // Carrega o JS personalizado
        wp_enqueue_script(
            'toast-notifications-js',
            plugin_dir_url(__FILE__) . 'assets/scripts.js',
            array('jquery', 'toastr-js'),
            filemtime(plugin_dir_path(__FILE__) . 'assets/scripts.js'),
            true
        );

        // Carrega o CSS personalizado
        wp_enqueue_style(
            'toast-notifications-custom-css',
            plugin_dir_url(__FILE__) . 'assets/styles.css',
            array('toastr-css'),
            filemtime(plugin_dir_path(__FILE__) . 'assets/styles.css')
        );

        // Carrega o JS original
        wp_enqueue_script(
            'toastr-js',
            plugin_dir_url(__FILE__) . 'assets/toastr.min.js',
            array('jquery'),
            filemtime(plugin_dir_path(__FILE__) . 'assets/toastr.min.js'),
            true
        );

        // Carrega o CSS original
        wp_enqueue_style(
            'toastr-css',
            plugin_dir_url(__FILE__) . 'assets/toastr.min.css',
            array(),
            filemtime(plugin_dir_path(__FILE__) . 'assets/toastr.min.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'wctn_enqueue_scripts');