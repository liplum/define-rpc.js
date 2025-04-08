import { CustomHeader, RequestHeader } from "../headers.js"

export type MergePath<A extends string, B extends string> = B extends ''
  ? MergePath<A, '/'>
  : A extends ''
  ? B
  : A extends '/'
  ? B
  : A extends `${infer P}/`
  ? B extends `/${infer Q}`
  ? `${P}/${Q}`
  : `${P}/${B}`
  : B extends `/${infer Q}`
  ? Q extends ''
  ? A
  : `${A}/${Q}`
  : `${A}/${B}`

export type PrefixWith$<T extends string> = `$${Lowercase<T>}`

export type ExtractStringKey<S> = keyof S & string

/**
* Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.
* @copyright from sindresorhus/type-fest
*/
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}


export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false

export type RequiredKeysOf<BaseType extends object> = Exclude<
  {
    [Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]> ? Key : never
  }[keyof BaseType],
  undefined
>

export type HasRequiredKeys<BaseType extends object> = RequiredKeysOf<BaseType> extends never
  ? false
  : true
  
export type FormValue = string | Blob
export type ParsedFormValue = string | File

export type ValidationTargets<T extends FormValue = ParsedFormValue, P extends string = string> = {
  json: any
  form: Record<string, T | T[]>
  query: Record<string, string | string[]>
  param: Record<P, P extends `${infer _}?` ? string | undefined : string>
  header: Record<RequestHeader | CustomHeader, string>
  cookie: Record<string, string>
}