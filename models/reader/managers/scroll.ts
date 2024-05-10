import { Layout, Contents } from 'epubjs';
import { BookOptions } from 'epubjs/types/book';
import Manager, { ViewLocation } from 'epubjs/types/managers/manager';
import View from 'epubjs/types/managers/view';
import Section from 'epubjs/types/section';
import { defaultScrollSettings, RenditionSettings } from '../reader-settings';

const scrollManager = new ScrollManager();

class ScrollManager implements Manager {
  private name: string;
	private settings: RenditionSettings;


  constructor(options: RenditionSettings) {
    if (options.manager) throw new Error("Manager should not be provided.");

    this.settings = {
			infinite: true,
			hidden: false,
			width: undefined,
			height: undefined,
			axis: undefined,
			writingMode: undefined,
			flow: "scrolled",
			ignoreClass: "",
			fullsize: undefined,
			allowScriptedContent: false,
			allowPopups: false,
			...defaultScrollSettings,
			
		}
  }

	render(element: Element, size?: { width: Number; height: Number }): void {
		throw new Error('Method not implemented.');
	}

	resize(width: Number, height: Number): void {
		throw new Error('Method not implemented.');
	}

	onOrientationChange(e: Event): void {
		throw new Error('Method not implemented.');
	}

	display(section: Section, target: string | number): Promise<void> {
		throw new Error('Method not implemented.');
	}

	next(): Promise<void> {
		throw new Error('Method not implemented.');
	}

	prev(): Promise<void> {
		throw new Error('Method not implemented.');
	}

	current(): View {
		throw new Error('Method not implemented.');
	}

	clear(): void {
		throw new Error('Method not implemented.');
	}

	currentLocation(): ViewLocation[] {
		throw new Error('Method not implemented.');
	}

	visible(): View[] {
		throw new Error('Method not implemented.');
	}

	bounds(): object {
		throw new Error('Method not implemented.');
	}

	applyLayout(layout: Layout): void {
		throw new Error('Method not implemented.');
	}

	updateLayout(): void {
		throw new Error('Method not implemented.');
	}

	setLayout(layout: Layout): void {
		throw new Error('Method not implemented.');
	}

	updateAxis(axis: string, forceUpdate: boolean): void {
		throw new Error('Method not implemented.');
	}

	updateFlow(flow: string): void {
		throw new Error('Method not implemented.');
	}

	getContents(): Contents[] {
		throw new Error('Method not implemented.');
	}

	direction(dir: string): void {
		throw new Error('Method not implemented.');
	}

	isRendered(): boolean {
		throw new Error('Method not implemented.');
	}

	destroy(): void {
		throw new Error('Method not implemented.');
	}

	emit(type: any, ...args: any[]): void {
		throw new Error('Method not implemented.');
	}

	off(type: any, listener: any) {
		throw new Error('Method not implemented.');
	}

	on(type: any, listener: any) {
		throw new Error('Method not implemented.');
	}

	once(type: any, listener: any, ...args: any[]) {
		throw new Error('Method not implemented.');
	}
}
