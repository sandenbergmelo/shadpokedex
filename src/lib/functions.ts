export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function playSound(fileUrl: string, volume: number = 0.5) {
  const audio = new Audio(fileUrl)
  audio.volume = volume
  audio.play()
}
