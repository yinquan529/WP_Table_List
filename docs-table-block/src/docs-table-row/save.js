import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'docs-table-row',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className:
			'docs-table-cell docs-table-cell--content docs-table-row-content',
	} );

	return (
		<tr { ...blockProps }>
			<td className="docs-table-cell docs-table-cell--label">
				<RichText.Content
					tagName="span"
					className="docs-table-label"
					value={ label }
				/>
			</td>
			<td { ...innerBlocksProps } />
		</tr>
	);
}
