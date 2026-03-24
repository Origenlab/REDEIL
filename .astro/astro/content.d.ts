declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"audio-profesional-eventos-como-elegir.md": {
	id: "audio-profesional-eventos-como-elegir.md";
  slug: "audio-profesional-eventos-como-elegir";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"como-planear-xv-anos-cdmx.md": {
	id: "como-planear-xv-anos-cdmx.md";
  slug: "como-planear-xv-anos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"efectos-especiales-para-eventos-tendencias.md": {
	id: "efectos-especiales-para-eventos-tendencias.md";
  slug: "efectos-especiales-para-eventos-tendencias";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"eventos-corporativos-iluminacion-audio.md": {
	id: "eventos-corporativos-iluminacion-audio.md";
  slug: "eventos-corporativos-iluminacion-audio";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"iluminacion-para-bodas-cdmx-guia-completa.md": {
	id: "iluminacion-para-bodas-cdmx-guia-completa.md";
  slug: "iluminacion-para-bodas-cdmx-guia-completa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-audio-para-conferencias-para-eventos-cdmx.md": {
	id: "renta-de-audio-para-conferencias-para-eventos-cdmx.md";
  slug: "renta-de-audio-para-conferencias-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-bocinas-para-bodas-para-eventos-cdmx.md": {
	id: "renta-de-bocinas-para-bodas-para-eventos-cdmx.md";
  slug: "renta-de-bocinas-para-bodas-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-bocinas-para-fiestas-para-eventos-cdmx.md": {
	id: "renta-de-bocinas-para-fiestas-para-eventos-cdmx.md";
  slug: "renta-de-bocinas-para-fiestas-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-bocinas-para-xv-anos-para-eventos-cdmx.md": {
	id: "renta-de-bocinas-para-xv-anos-para-eventos-cdmx.md";
  slug: "renta-de-bocinas-para-xv-anos-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-bolas-disco-para-eventos-cdmx.md": {
	id: "renta-de-bolas-disco-para-eventos-cdmx.md";
  slug: "renta-de-bolas-disco-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-cabezas-moviles-para-eventos-cdmx.md": {
	id: "renta-de-cabezas-moviles-para-eventos-cdmx.md";
  slug: "renta-de-cabezas-moviles-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-cascadas-led-para-eventos-cdmx.md": {
	id: "renta-de-cascadas-led-para-eventos-cdmx.md";
  slug: "renta-de-cascadas-led-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-city-color-para-eventos-cdmx.md": {
	id: "renta-de-city-color-para-eventos-cdmx.md";
  slug: "renta-de-city-color-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-city-light-para-eventos-cdmx.md": {
	id: "renta-de-city-light-para-eventos-cdmx.md";
  slug: "renta-de-city-light-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-guirnaldas-para-eventos-cdmx.md": {
	id: "renta-de-guirnaldas-para-eventos-cdmx.md";
  slug: "renta-de-guirnaldas-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-humo-bajo-para-eventos-cdmx.md": {
	id: "renta-de-humo-bajo-para-eventos-cdmx.md";
  slug: "renta-de-humo-bajo-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-iluminacion-laser-para-eventos-cdmx.md": {
	id: "renta-de-iluminacion-laser-para-eventos-cdmx.md";
  slug: "renta-de-iluminacion-laser-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-luces-arquitectonicas-para-eventos-cdmx.md": {
	id: "renta-de-luces-arquitectonicas-para-eventos-cdmx.md";
  slug: "renta-de-luces-arquitectonicas-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-luz-negra-para-eventos-cdmx.md": {
	id: "renta-de-luz-negra-para-eventos-cdmx.md";
  slug: "renta-de-luz-negra-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-luz-neon-para-eventos-cdmx.md": {
	id: "renta-de-luz-neon-para-eventos-cdmx.md";
  slug: "renta-de-luz-neon-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-maquina-de-burbujas-para-eventos-cdmx.md": {
	id: "renta-de-maquina-de-burbujas-para-eventos-cdmx.md";
  slug: "renta-de-maquina-de-burbujas-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-maquina-de-confeti-para-eventos-cdmx.md": {
	id: "renta-de-maquina-de-confeti-para-eventos-cdmx.md";
  slug: "renta-de-maquina-de-confeti-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-maquina-de-humo-para-eventos-cdmx.md": {
	id: "renta-de-maquina-de-humo-para-eventos-cdmx.md";
  slug: "renta-de-maquina-de-humo-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-mesas-picnic-para-eventos-cdmx.md": {
	id: "renta-de-mesas-picnic-para-eventos-cdmx.md";
  slug: "renta-de-mesas-picnic-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-pantalla-inflable-para-eventos-cdmx.md": {
	id: "renta-de-pantalla-inflable-para-eventos-cdmx.md";
  slug: "renta-de-pantalla-inflable-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-proyector-de-gobos-para-eventos-cdmx.md": {
	id: "renta-de-proyector-de-gobos-para-eventos-cdmx.md";
  slug: "renta-de-proyector-de-gobos-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-renta-de-podium-para-eventos-cdmx.md": {
	id: "renta-de-renta-de-podium-para-eventos-cdmx.md";
  slug: "renta-de-renta-de-podium-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-seguidor-de-luz-para-eventos-cdmx.md": {
	id: "renta-de-seguidor-de-luz-para-eventos-cdmx.md";
  slug: "renta-de-seguidor-de-luz-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"renta-de-sky-tracker-para-eventos-cdmx.md": {
	id: "renta-de-sky-tracker-para-eventos-cdmx.md";
  slug: "renta-de-sky-tracker-para-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tendencias-iluminacion-eventos-2025.md": {
	id: "tendencias-iluminacion-eventos-2025.md";
  slug: "tendencias-iluminacion-eventos-2025";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
