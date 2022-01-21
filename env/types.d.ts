type 𝞌 = any
type 𝝷<T = 𝞌> = { [k: 𝞁 | 𝝻]: T }
type 𝝺 = (...a: 𝞌[]) => 𝞌
type 𝝻 = symbol
type 𝝱 = boolean
type 𝝶 = number
type 𝞁 = string
type 𝝣<T> = Array<T>
type Key = 𝞁 | 𝝻 | 𝝶

type Alias = Dict<𝞁>
type KVP<K, V> = 𝝣<[K, V] & { k: K, v: V }>

type PSet<T = 𝞌, V = 𝞌> = (t: T, k: 𝞁, v: V) => 𝝱
type OSet<V = 𝞌> = (v: V) => 𝝱

type PGet<T = 𝞌, V = 𝞌> = (t: T, k: 𝞁) => V
type OGet<V = 𝞌> = () => V

type Ev = keyof HTMLElementEventMap
type Point = { x: 𝝶, y: 𝝶 }