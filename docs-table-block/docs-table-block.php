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

function docs_table_block_init() {
	register_block_type( __DIR__ . '/build/docs-table' );
	register_block_type( __DIR__ . '/build/docs-table-row' );
}
add_action( 'init', 'docs_table_block_init' );
