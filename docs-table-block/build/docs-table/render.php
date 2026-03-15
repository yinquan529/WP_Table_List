<?php
/**
 * Server-side rendering for the docs-table/table block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Rendered inner blocks (row HTML).
 */

$show_header  = ! empty( $attributes['showHeader'] );
$header_left  = esc_html( $attributes['headerLeft'] ?? 'Object' );
$header_right = esc_html( $attributes['headerRight'] ?? 'Explanation' );
$left_width   = intval( $attributes['leftColumnWidth'] ?? 25 );
$border_color = esc_attr( $attributes['borderColor'] ?? '#e0e0e0' );
$border_style = esc_attr( $attributes['borderStyle'] ?? 'solid' );
$cell_padding = intval( $attributes['cellPadding'] ?? 16 );
$zebra        = ! empty( $attributes['zebraStriping'] );
$h_borders    = $attributes['showHorizontalBorders'] ?? true;
$v_borders    = ! empty( $attributes['showVerticalBorders'] );

$left_font_family  = $attributes['leftFontFamily'] ?? 'System Default';
$left_font_size    = intval( $attributes['leftFontSize'] ?? 16 );
$right_font_family = $attributes['rightFontFamily'] ?? 'System Default';
$right_font_size   = intval( $attributes['rightFontSize'] ?? 16 );

$left_ff_css  = ( ! $left_font_family || 'System Default' === $left_font_family ) ? 'inherit' : esc_attr( $left_font_family );
$right_ff_css = ( ! $right_font_family || 'System Default' === $right_font_family ) ? 'inherit' : esc_attr( $right_font_family );

// Load self-hosted web fonts if needed.
if ( function_exists( 'docs_table_block_enqueue_fonts' ) ) {
	docs_table_block_enqueue_fonts( $left_font_family, $right_font_family );
}

$classes = 'docs-table-block';
if ( $zebra ) {
	$classes .= ' has-zebra-striping';
}
if ( $v_borders ) {
	$classes .= ' has-vertical-borders';
}
if ( ! $h_borders ) {
	$classes .= ' no-horizontal-borders';
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classes ) );

$table_style = sprintf(
	'--dtb-left-width:%d%%;--dtb-right-width:%d%%;--dtb-border-color:%s;--dtb-cell-padding:%dpx;--dtb-border-style:%s;--dtb-left-font-family:%s;--dtb-left-font-size:%dpx;--dtb-right-font-family:%s;--dtb-right-font-size:%dpx',
	$left_width,
	100 - $left_width,
	$border_color,
	$cell_padding,
	$border_style,
	$left_ff_css,
	$left_font_size,
	$right_ff_css,
	$right_font_size
);
?>
<div <?php echo $wrapper_attributes; ?>>
	<table class="docs-table" style="<?php echo esc_attr( $table_style ); ?>">
		<?php if ( $show_header ) : ?>
		<thead>
			<tr class="docs-table-header-row">
				<th class="docs-table-cell docs-table-cell--label" scope="col"><?php echo $header_left; ?></th>
				<th class="docs-table-cell docs-table-cell--content" scope="col"><?php echo $header_right; ?></th>
			</tr>
		</thead>
		<?php endif; ?>
		<tbody class="docs-table-body">
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</tbody>
	</table>
</div>
