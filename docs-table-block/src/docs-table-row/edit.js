import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/list',
	'core/heading',
	'core/code',
];

const TEMPLATE = [ [ 'core/paragraph', { placeholder: 'Enter explanation…' } ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps( {
		className: 'docs-table-row',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className:
				'docs-table-cell docs-table-cell--content docs-table-row-content',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<tr { ...blockProps }>
			<td className="docs-table-cell docs-table-cell--label">
				<RichText
					tagName="span"
					className="docs-table-label"
					value={ label }
					onChange={ ( val ) => setAttributes( { label: val } ) }
					placeholder={ __( 'Term…', 'docs-table-block' ) }
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
				/>
			</td>
			<td { ...innerBlocksProps } />
		</tr>
	);
}
