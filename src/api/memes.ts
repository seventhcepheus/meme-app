import { Meme } from '../types'

export const getAllMemes = async (): Promise<Meme[]> => {
  const response = await fetch('https://api.imgflip.com/get_memes')
  const data = await response.json()
  return data.data.memes.map((meme: any) => ({
    id: String(meme.id),
    name: meme.name || 'Unnamed Meme',
    url: meme.url,
    width: Number(meme.width) || 0,
    height: Number(meme.height) || 0,
    box_count: Number(meme.box_count) || 2
  }))
}