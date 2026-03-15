import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	ColorPicker,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'docs-table/row' ];

const TEMPLATE = [
	[ 'docs-table/row', { label: 'Term' } ],
	[ 'docs-table/row', { label: 'Another Term' } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		headerLeft,
		headerRight,
		showHeader,
		leftColumnWidth,
		borderColor,
		borderStyle,
		showHorizontalBorders,
		showVerticalBorders,
		cellPadding,
		zebraStriping,
	} = attributes;

	const classes = [
		'docs-table-block',
		zebraStriping && 'has-zebra-striping',
		showVerticalBorders && 'has-vertical-borders',
		! showHorizontalBorders && 'no-horizontal-borders',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps( { className: classes } );

	const tableStyle = {
		'--dtb-left-width': `${ leftColumnWidth }%`,
		'--dtb-right-width': `${ 100 - leftColumnWidth }%`,
		'--dtb-border-color': borderColor,
		'--dtb-cell-padding': `${ cellPadding }px`,
		'--dtb-border-style': borderStyle,
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'docs-table-body' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Header Settings', 'docs-table-block' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Show header row', 'docs-table-block' ) }
						checked={ showHeader }
						onChange={ ( val ) =>
							setAttributes( { showHeader: val } )
						}
					/>
					{ showHeader && (
						<>
							<TextControl
								label={ __(
									'Left header label',
									'docs-table-block'
								) }
								value={ headerLeft }
								onChange={ ( val ) =>
									setAttributes( { headerLeft: val } )
								}
							/>
							<TextControl
								label={ __(
									'Right header label',
									'docs-table-block'
								) }
								value={ headerRight }
								onChange={ ( val ) =>
									setAttributes( { headerRight: val } )
								}
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Layout', 'docs-table-block' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Left column width (%)',
							'docs-table-block'
						) }
						value={ leftColumnWidth }
						onChange={ ( val ) =>
							setAttributes( { leftColumnWidth: val } )
						}
						min={ 15 }
						max={ 50 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Cell padding (px)', 'docs-table-block' ) }
						value={ cellPadding }
						onChange={ ( val ) =>
							setAttributes( { cellPadding: val } )
						}
						min={ 4 }
						max={ 32 }
						step={ 2 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Borders', 'docs-table-block' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Horizontal borders',
							'docs-table-block'
						) }
						checked={ showHorizontalBorders }
						onChange={ ( val ) =>
							setAttributes( { showHorizontalBorders: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Vertical borders', 'docs-table-block' ) }
						checked={ showVerticalBorders }
						onChange={ ( val ) =>
							setAttributes( { showVerticalBorders: val } )
						}
					/>
					<SelectControl
						label={ __( 'Border style', 'docs-table-block' ) }
						value={ borderStyle }
						options={ [
							{ label: 'Solid', value: 'solid' },
							{ label: 'Dashed', value: 'dashed' },
							{ label: 'Dotted', value: 'dotted' },
						] }
						onChange={ ( val ) =>
							setAttributes( { borderStyle: val } )
						}
					/>
					<p className="components-base-control__label">
						{ __( 'Border color', 'docs-table-block' ) }
					</p>
					<ColorPicker
						color={ borderColor }
						onChange={ ( val ) =>
							setAttributes( { borderColor: val } )
						}
						enableAlpha={ false }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Styling', 'docs-table-block' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Zebra striping (alternating row colors)',
							'docs-table-block'
						) }
						checked={ zebraStriping }
						onChange={ ( val ) =>
							setAttributes( { zebraStriping: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

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
		</>
	);
}
