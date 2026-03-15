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
 * Google Fonts that need to be loaded externally.
 * Maps the font-family CSS value (as stored in the attribute) to the
 * Google Fonts family name used in the URL.
 */
function docs_table_block_google_fonts_map() {
	return array(
		'Libre Baskerville'  => 'Libre+Baskerville:wght@400;700',
		'Lora'               => 'Lora:wght@400;600;700',
		'Merriweather'       => 'Merriweather:wght@400;700',
		'Playfair Display'   => 'Playfair+Display:wght@400;600;700',
		'PT Serif'           => 'PT+Serif:wght@400;700',
		'Noto Serif'         => 'Noto+Serif:wght@400;600;700',
		'Source Serif Pro'   => 'Source+Serif+Pro:wght@400;600;700',
		'EB Garamond'        => 'EB+Garamond:wght@400;600;700',
		'Crimson Text'       => 'Crimson+Text:wght@400;700',
		'Roboto'             => 'Roboto:wght@400;500;700',
		'Open Sans'          => 'Open+Sans:wght@400;600;700',
		'Lato'               => 'Lato:wght@400;700',
		'Source Code Pro'    => 'Source+Code+Pro:wght@400;600;700',
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
	// Take the first font in the stack and strip quotes.
	$first = explode( ',', $css_value )[0];
	return trim( $first, " \t\n\r\0\x0B\"'" );
}

/**
 * Enqueue Google Fonts for the given font-family attribute values.
 */
function docs_table_block_enqueue_google_fonts( $left_family, $right_family ) {
	$map      = docs_table_block_google_fonts_map();
	$families = array();

	foreach ( array( $left_family, $right_family ) as $css_value ) {
		$name = docs_table_block_parse_font_name( $css_value );
		if ( $name && isset( $map[ $name ] ) ) {
			$families[ $name ] = $map[ $name ];
		}
	}

	if ( empty( $families ) ) {
		return;
	}

	$query = implode( '&family=', array_values( $families ) );
	$url   = 'https://fonts.googleapis.com/css2?family=' . $query . '&display=swap';
	$handle = 'docs-table-block-gfonts-' . md5( $url );

	wp_enqueue_style( $handle, $url, array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
}

/**
 * Enqueue Google Fonts in the block editor for all registered Google Font options
 * so that font previews work correctly in the editor.
 */
function docs_table_block_editor_google_fonts() {
	$map      = docs_table_block_google_fonts_map();
	$families = array_values( $map );

	if ( empty( $families ) ) {
		return;
	}

	$query = implode( '&family=', $families );
	$url   = 'https://fonts.googleapis.com/css2?family=' . $query . '&display=swap';

	wp_enqueue_style( 'docs-table-block-editor-gfonts', $url, array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
}
add_action( 'enqueue_block_editor_assets', 'docs_table_block_editor_google_fonts' );

function docs_table_block_init() {
	register_block_type( __DIR__ . '/build/docs-table' );
	register_block_type( __DIR__ . '/build/docs-table-row' );
}
add_action( 'init', 'docs_table_block_init' );
