/*
 * Implements a branded/tagged/nominal type wrapper
 *
 * Brands a Base type with a Tag, such that the resulting "tagged" type is only
 * compatible with the same tagged type.
 *
 * Useful for creating type-safe strings, integers etc., when we want to make
 * sure that a type cannot be accidentally mixed with other similar types.
 *
 * Example:
 *
 * type UserId = Tagged<string, 'UserId'>
 *
 * let userId = 'user-1' as UserId // cast is important here
 *
 * userId = 'any string' // Error: TS2322: Type '"any string"' is not
 *                       // assignable to type 'Tagged<string, "UserId">'.
 *                       // Type '"any string"' is not assignable to
 *                       // type '{ __tag: "UserId"; }'.
 *
 * Code originally from Nextclade, authored by ivan-aksamentov
 */
type Tagged<Base, Tag extends string> = Base & { __tag: Tag }

/** Type-safe representation of a nucleotide */
export type Nucleotide = Tagged<string, 'Nucleotide'>

/** Type-safe representation of an aminoacid */
export type Aminoacid = Tagged<string, 'Aminoacid'>


/** Represents a numeric interval bounded by begin and end. Similar to `Span`, but different representation. */
export interface Range {
  begin: number
  end: number
}

/** Represents a numeric interval bounded by start and length. Similar to `Range`, but different representation. */
export interface Span {
  start: number
  length: number
}

export interface NucleotideLocation {
  pos: number
  nuc: Nucleotide
}

export interface PcrPrimer {
  name: string
  target: string
  source: string
  rootOligonuc: string
  primerOligonuc: string
  range: Range
  nonACGTs: NucleotideLocation[]
}

export interface NucleotideSubstitution {
  pos: number
  refNuc: Nucleotide
  queryNuc: Nucleotide
  pcrPrimersChanged: PcrPrimer[]
  aaSubstitutions: AminoacidSubstitution[]
  aaDeletions: AminoacidDeletion[]
}

export interface NucleotideDeletion extends Span {
  aaSubstitutions: AminoacidSubstitution[]
  aaDeletions: AminoacidDeletion[]
}


export interface AminoacidSubstitution {
  refAA: Aminoacid
  codon: number
  queryAA: Aminoacid
  gene: string
  codonNucRange: Range
  refContext: string
  queryContext: string
  contextNucRange: Range
  nucSubstitutions: NucleotideSubstitution[]
  nucDeletions: NucleotideDeletion[]
}

export interface AminoacidDeletion {
  gene: string
  refAA: Aminoacid
  codon: number
  codonNucRange: Range
  refContext: string
  queryContext: string
  contextNucRange: Range
  nucSubstitutions: NucleotideSubstitution[]
  nucDeletions: NucleotideDeletion[]
}

/** Represents a named interval in the genome */
export interface Gene {
  geneName: string
  color: string
  start: number
  end: number
  length: number
  frame: number
  strand: string
}
