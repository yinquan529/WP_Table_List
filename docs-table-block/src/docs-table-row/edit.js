import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {
	useState,
	useCallback,
	useRef,
	useEffect,
} from '@wordpress/element';
import { Button } from '@wordpress/components';
import { marked } from 'marked';

marked.setOptions( {
	breaks: true,
	gfm: true,
} );

export default function Edit( { attributes, setAttributes, context } ) {
	const { label, content, contentHtml } = attributes;
	const leftColumnWidth = context[ 'docs-table/leftColumnWidth' ] ?? 25;
	const [ isPreview, setIsPreview ] = useState( false );
	const [ editorWidth, setEditorWidth ] = useState( null );
	const contentCellRef = useRef( null );

	const blockProps = useBlockProps( {
		className: 'docs-table-row',
	} );

	// Measure the content cell and size the editor to fill it.
	useEffect( () => {
		const cell = contentCellRef.current;
		if ( ! cell ) {
			return;
		}

		const measure = () => {
			const w = cell.getBoundingClientRect().width;
			if ( w > 0 ) {
				setEditorWidth( w );
			}
		};

		measure();

		const observer = new ResizeObserver( measure );
		observer.observe( cell );
		return () => observer.disconnect();
	}, [ leftColumnWidth ] );

	const handleContentChange = useCallback(
		( e ) => {
			const md = e.target.value;
			const html = marked.parse( md );
			setAttributes( { content: md, contentHtml: html } );
		},
		[ setAttributes ]
	);

	const editorStyle = editorWidth
		? { width: `${ editorWidth }px`, maxWidth: `${ editorWidth }px` }
		: {};

	return (
		<tr { ...blockProps }>
			<td className="docs-table-cell docs-table-cell--label">
				<input
					type="text"
					className="dtb-label-input"
					value={ label }
					onChange={ ( e ) =>
						setAttributes( { label: e.target.value } )
					}
					placeholder={ __( 'Term name…', 'docs-table-block' ) }
				/>
			</td>
			<td
				ref={ contentCellRef }
				className="docs-table-cell docs-table-cell--content docs-table-row-content"
			>
				<div className="dtb-markdown-editor" style={ editorStyle }>
					<div className="dtb-markdown-tabs">
						<Button
							variant={ ! isPreview ? 'primary' : 'secondary' }
							size="small"
							onClick={ () => setIsPreview( false ) }
						>
							{ __( 'Write', 'docs-table-block' ) }
						</Button>
						<Button
							variant={ isPreview ? 'primary' : 'secondary' }
							size="small"
							onClick={ () => setIsPreview( true ) }
						>
							{ __( 'Preview', 'docs-table-block' ) }
						</Button>
					</div>
					{ ! isPreview ? (
						<textarea
							className="dtb-markdown-textarea"
							value={ content }
							onChange={ handleContentChange }
							placeholder={ __(
								'Write markdown here…\n\nSupported:\n- **bold**, *italic*\n- bullet lists with -\n- numbered lists with 1.\n- headings with #\n- `inline code`',
								'docs-table-block'
							) }
							rows={ 4 }
						/>
					) : (
						<div
							className="dtb-markdown-preview"
							dangerouslySetInnerHTML={ {
								__html:
									contentHtml ||
									'<p style="color:#999">Nothing to preview</p>',
							} }
						/>
					) }
				</div>
			</td>
		</tr>
	);
}
