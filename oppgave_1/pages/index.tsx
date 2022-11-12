// TODO: Her er det bugs

import type { NextPage } from 'next'
import { stringify } from 'querystring'
import { useEffect, useRef } from 'react'
import Letters from '../components/Letters'
import Strikes from '../components/Strikes'
import Words from '../components/Words'
import { useGame } from '../hooks/useGame'

const Home: NextPage = () => {
  const isFirstRender = useRef(true)
  const {
    country,
    setCountry,
    isMatch,
    wordSplit,
    handleGuess,
    guesses,
    strikes,
    getMessage,
  } = useGame()



  useEffect(() => {
    if (!isFirstRender.current) return

    isFirstRender.current = false
    
    // La til håndtering av response, samt error håndtering.
    const handler = async () => {
      try {
        const response = await fetch('/api/countries', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        const { success, data } = await response.json()

        if (success) setCountry(data)
        else throw Error(`${response.status}: Could not fetch countries.`)
        
      } catch (error) {
        console.log(error)
        alert((error as Error).message)
      }
    }

    handler()
  }, [setCountry]) 

  return (
    <main>
      <h1>Gjett flagget</h1>
      <p className="flag">{country?.unicodeFlag}</p>
      <Strikes strikes={strikes} />
      <Words words={wordSplit()} isMatch={isMatch} />
      <Letters
        handleGuess={handleGuess}
        guesses={guesses}
        getMessage={getMessage}
      />
    </main>
  )
}

export default Home
