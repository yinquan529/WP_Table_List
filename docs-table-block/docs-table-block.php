<?php
/**
 * Plugin Name:       Docs Table Block
 * Description:       A documentation-style two-column table block for Gutenberg with rich content support.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Docs Table Block Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       docs-table-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Web fonts that are bundled with the plugin (self-hosted).
 */
function docs_table_block_web_fonts() {
	return array(
		'Libre Baskerville',
		'Lora',
		'Merriweather',
		'Playfair Display',
		'PT Serif',
		'Noto Serif',
		'Source Serif Pro',
		'EB Garamond',
		'Crimson Text',
		'Roboto',
		'Open Sans',
		'Lato',
		'Source Code Pro',
	);
}

/**
 * Extract the base font name from a CSS font-family value.
 * e.g. '"Source Serif Pro", Georgia, serif' → 'Source Serif Pro'
 */
function docs_table_block_parse_font_name( $css_value ) {
	if ( ! $css_value || 'System Default' === $css_value || 'inherit' === $css_value ) {
		return '';
	}
	$first = explode( ',', $css_value )[0];
	return trim( $first, " \t\n\r\0\x0B\"'" );
}

/**
 * Enqueue self-hosted font CSS when a web font is used.
 */
function docs_table_block_enqueue_fonts( $left_family, $right_family ) {
	$web_fonts = docs_table_block_web_fonts();
	$needs_fonts = false;

	foreach ( array( $left_family, $right_family ) as $css_value ) {
		$name = docs_table_block_parse_font_name( $css_value );
		if ( $name && in_array( $name, $web_fonts, true ) ) {
			$needs_fonts = true;
			break;
		}
	}

	if ( $needs_fonts ) {
		wp_enqueue_style(
			'docs-table-block-fonts',
			plugins_url( 'assets/fonts/fonts.css', __FILE__ ),
			array(),
			'1.0.0'
		);
	}
}

/**
 * Enqueue self-hosted fonts in the block editor so previews work.
 */
function docs_table_block_editor_fonts() {
	wp_enqueue_style(
		'docs-table-block-fonts',
		plugins_url( 'assets/fonts/fonts.css', __FILE__ ),
		array(),
		'1.0.0'
	);
}
add_action( 'enqueue_block_editor_assets', 'docs_table_block_editor_fonts' );

function docs_table_block_init() {
	register_block_type( __DIR__ . '/build/docs-table' );
	register_block_type( __DIR__ . '/build/docs-table-row' );
}
add_action( 'init', 'docs_table_block_init' );
