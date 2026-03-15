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

const FONT_OPTIONS = [
	{ label: 'System Default', value: 'System Default' },
	// — Serif —
	{ label: 'Georgia', value: 'Georgia, "Times New Roman", serif' },
	{ label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
	{ label: 'Palatino', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
	{ label: 'Garamond', value: 'Garamond, Baskerville, "Baskerville Old Face", serif' },
	{ label: 'Baskerville', value: 'Baskerville, "Baskerville Old Face", "Times New Roman", serif' },
	{ label: 'Cambria', value: 'Cambria, Georgia, serif' },
	{ label: 'Didot', value: 'Didot, "Bodoni MT", "Times New Roman", serif' },
	{ label: 'Bodoni MT', value: '"Bodoni MT", Didot, "Times New Roman", serif' },
	{ label: 'Bookman', value: '"Bookman Old Style", Bookman, "URW Bookman", serif' },
	{ label: 'Century Schoolbook', value: '"Century Schoolbook", "New Century Schoolbook", Georgia, serif' },
	{ label: 'Constantia', value: 'Constantia, Georgia, serif' },
	{ label: 'Libre Baskerville', value: '"Libre Baskerville", Georgia, serif' },
	{ label: 'Lora', value: 'Lora, Georgia, serif' },
	{ label: 'Merriweather', value: 'Merriweather, Georgia, serif' },
	{ label: 'Playfair Display', value: '"Playfair Display", Georgia, serif' },
	{ label: 'PT Serif', value: '"PT Serif", Georgia, serif' },
	{ label: 'Noto Serif', value: '"Noto Serif", Georgia, serif' },
	{ label: 'Source Serif Pro', value: '"Source Serif Pro", Georgia, serif' },
	{ label: 'EB Garamond', value: '"EB Garamond", Garamond, serif' },
	{ label: 'Crimson Text', value: '"Crimson Text", Georgia, serif' },
	// — Sans-serif —
	{ label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
	{ label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
	{ label: 'Tahoma', value: 'Tahoma, Verdana, sans-serif' },
	{ label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
	{ label: 'Segoe UI', value: '"Segoe UI", Tahoma, Geneva, sans-serif' },
	{ label: 'Roboto', value: 'Roboto, "Helvetica Neue", Arial, sans-serif' },
	{ label: 'Open Sans', value: '"Open Sans", "Helvetica Neue", sans-serif' },
	{ label: 'Lato', value: 'Lato, "Helvetica Neue", Arial, sans-serif' },
	// — Monospace —
	{ label: 'Courier New', value: '"Courier New", Courier, monospace' },
	{ label: 'Source Code Pro', value: '"Source Code Pro", Menlo, monospace' },
];

function fontFamilyValue( family ) {
	if ( ! family || family === 'System Default' ) {
		return 'inherit';
	}
	return family;
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		headerLeft,
		headerRight,
		showHeader,
		headerFontSize,
		leftColumnWidth,
		borderColor,
		borderStyle,
		showHorizontalBorders,
		showVerticalBorders,
		cellPadding,
		zebraStriping,
		leftFontFamily,
		leftFontSize,
		rightFontFamily,
		rightFontSize,
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
		'--dtb-left-font-family': fontFamilyValue( leftFontFamily ),
		'--dtb-left-font-size': `${ leftFontSize }px`,
		'--dtb-right-font-family': fontFamilyValue( rightFontFamily ),
		'--dtb-right-font-size': `${ rightFontSize }px`,
		'--dtb-header-font-size': `${ headerFontSize }px`,
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
							<RangeControl
								label={ __(
									'Header font size (px)',
									'docs-table-block'
								) }
								value={ headerFontSize }
								onChange={ ( val ) =>
									setAttributes( { headerFontSize: val } )
								}
								min={ 10 }
								max={ 36 }
								step={ 1 }
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
					title={ __(
						'Left Column Typography',
						'docs-table-block'
					) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Font family', 'docs-table-block' ) }
						value={ leftFontFamily }
						options={ FONT_OPTIONS }
						onChange={ ( val ) =>
							setAttributes( { leftFontFamily: val } )
						}
					/>
					<RangeControl
						label={ __( 'Font size (px)', 'docs-table-block' ) }
						value={ leftFontSize }
						onChange={ ( val ) =>
							setAttributes( { leftFontSize: val } )
						}
						min={ 10 }
						max={ 48 }
						step={ 1 }
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Right Column Typography',
						'docs-table-block'
					) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Font family', 'docs-table-block' ) }
						value={ rightFontFamily }
						options={ FONT_OPTIONS }
						onChange={ ( val ) =>
							setAttributes( { rightFontFamily: val } )
						}
					/>
					<RangeControl
						label={ __( 'Font size (px)', 'docs-table-block' ) }
						value={ rightFontSize }
						onChange={ ( val ) =>
							setAttributes( { rightFontSize: val } )
						}
						min={ 10 }
						max={ 48 }
						step={ 1 }
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
				<div className="docs-table" style={ tableStyle }>
					{ showHeader && (
						<div className="docs-table-header-row">
							<div
								className="docs-table-cell docs-table-cell--label"
							>
								{ headerLeft }
							</div>
							<div
								className="docs-table-cell docs-table-cell--content"
							>
								{ headerRight }
							</div>
						</div>
					) }
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}
