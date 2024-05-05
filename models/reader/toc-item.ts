export interface PackagingSpineItem {
	id: string | null,
	idref: string,
	index: string,
	linear: string,

	canonical: string,
	cfiBase: string,
	href: string,
	url: string,
	properties: Array<string>,
}

export interface ToCItem extends PackagingSpineItem {
  label: string,
}
