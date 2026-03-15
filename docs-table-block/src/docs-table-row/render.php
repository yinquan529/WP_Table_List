<?php
/**
 * Server-side rendering for the docs-table/row block.
 *
 * @param array $attributes Block attributes.
 */

$label        = esc_html( $attributes['label'] ?? '' );
$content_html = wp_kses_post( $attributes['contentHtml'] ?? '' );

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'docs-table-row' ) );
?>
<tr <?php echo $wrapper_attributes; ?>>
	<td class="docs-table-cell docs-table-cell--label">
		<span class="docs-table-label"><?php echo $label; ?></span>
	</td>
	<td class="docs-table-cell docs-table-cell--content docs-table-row-content">
		<?php echo $content_html; ?>
	</td>
</tr>
