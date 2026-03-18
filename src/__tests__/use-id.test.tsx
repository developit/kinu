import {describe, expect, it, beforeEach} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Dialog} from '../components/dialog';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent} from '../components/dropdown-menu';
import {resetId} from '../lib/use-id';

beforeEach(() => {
	resetId();
});

describe('useId', () => {
	it('generates unique IDs for multiple component instances', () => {
		const html = renderToString(
			<div>
				<Dialog>
					<Dialog.Trigger><button type="button">Open 1</button></Dialog.Trigger>
					<Dialog.Content />
				</Dialog>
				<Dialog>
					<Dialog.Trigger><button type="button">Open 2</button></Dialog.Trigger>
					<Dialog.Content />
				</Dialog>
			</div>,
		);

		const ids = html.match(/id=":[^"]+"/g);
		expect(ids).not.toBeNull();
		expect(new Set(ids).size).toBe(ids!.length);
	});

	it('IDs from different component types never collide', () => {
		const html = renderToString(
			<div>
				<Dialog>
					<Dialog.Trigger><button type="button">Open dialog</button></Dialog.Trigger>
					<Dialog.Content />
				</Dialog>
				<DropdownMenu>
					<DropdownMenuTrigger><button type="button">Open menu</button></DropdownMenuTrigger>
					<DropdownMenuContent />
				</DropdownMenu>
			</div>,
		);

		const ids = html.match(/id=":[^"]+"/g);
		expect(ids).not.toBeNull();
		expect(new Set(ids).size).toBe(ids!.length);
	});

	it('counter resets produce deterministic IDs', () => {
		const render = () =>
			renderToString(
				<Dialog>
					<Dialog.Trigger><button type="button">Open</button></Dialog.Trigger>
					<Dialog.Content />
				</Dialog>,
			);

		const html1 = render();
		resetId();
		const html2 = render();

		const id1 = html1.match(/id=":[^"]+"/)?.[0];
		const id2 = html2.match(/id=":[^"]+"/)?.[0];
		expect(id1).toBe(id2);
	});
});
