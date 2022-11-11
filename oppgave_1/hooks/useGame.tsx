// TODO: Her er det bugs

import { useRouter } from 'next/router'
import { useState } from 'react'
import { Strike } from '../components/Strikes'

const initialStrikes = [
  { icon: '⚪', guess: '' },
  { icon: '⚪', guess: '' },
  { icon: '⚪', guess: '' },
]

type Country = {
  name: string
  unicodeFlag: string
} | null

export const useGame = () => {
  const [guesses, setGuesses] = useState<string[]>([])
  const [strikes, setStrikes] = useState<Strike[]>(initialStrikes)
  const [country, setCountry] = useState<Country>(null)
  const router = useRouter()

  const isSolved = (country: Country, guesses: string[]) => {
    if (!country) return false
    return [...country.name.replaceAll(' ', '').toLowerCase()].every(
      (letter) => {
        return guesses.includes(letter)
      }
    )
  }

  const isGameOver = strikes.every((strike: Strike) => strike.guess) ? true : false // Byttet strike: any til strike: Strike

  const getMessage = () => {
    if (isSolved(country, guesses) && !isGameOver) return 'Du klarte det'
    else if (isGameOver) return 'Du tapte. Prøv igjen'
    else return 'Velg en bokstav'
  }

  const isMatch = (letter: string) => {
    if (guesses.find((guess: string) => guess === letter.toLowerCase())) {  // Endret guess: any til guess: string
      return letter
    }
    return '_'
  }

  const wordSplit = () => {
    return (
      country?.name?.split(' ').map((word: string) => word.split('')) || null
    )
  }

  const handleGuess = (letter: string) => {
    // La til denne for å stoppe spillet når alle strikes er brukt opp.
    if(isGameOver) return

    if (!country?.name?.toLowerCase().includes(letter.toLowerCase())) {
      const strikeCopy = [...strikes]
      strikeCopy.pop()

      // La til denne for å endre ikonet ved feil valg.
      setStrikes([{ icon: '🚫', guess: letter }, ...strikeCopy])
    }

    setGuesses((prev: string[]) => [...prev, letter.toLowerCase()])
  }

  return {
    guesses,
    setGuesses,
    strikes,
    setStrikes,
    country,
    setCountry,
    isMatch,
    isGameOver,
    handleGuess,
    getMessage,
    wordSplit,
  }
}
