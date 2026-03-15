import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		headerLeft,
		headerRight,
		showHeader,
		leftColumnWidth,
		borderColor,
		cellPadding,
		zebraStriping,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `docs-table-block${ zebraStriping ? ' has-zebra-striping' : '' }`,
	} );

	const tableStyle = {
		'--dtb-left-width': `${ leftColumnWidth }%`,
		'--dtb-right-width': `${ 100 - leftColumnWidth }%`,
		'--dtb-border-color': borderColor,
		'--dtb-cell-padding': `${ cellPadding }px`,
	};

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'docs-table-body',
	} );

	return (
		<div { ...blockProps }>
			<table className="docs-table" style={ tableStyle }>
				{ showHeader && (
					<thead>
						<tr className="docs-table-header-row">
							<th
								className="docs-table-cell docs-table-cell--label"
								scope="col"
							>
								{ headerLeft }
							</th>
							<th
								className="docs-table-cell docs-table-cell--content"
								scope="col"
							>
								{ headerRight }
							</th>
						</tr>
					</thead>
				) }
				<tbody { ...innerBlocksProps } />
			</table>
		</div>
	);
}
