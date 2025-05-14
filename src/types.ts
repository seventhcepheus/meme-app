export interface Meme {
  id: string
  name: string
  url: string
  width: number
  height: number
  box_count: number
}

export interface MemeText {
  id: string
  content: string
  x: number
  y: number
  fontSize: number
  color: string
}