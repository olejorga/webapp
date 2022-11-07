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
    const handler = async () => {
      try {
        // Påfølgende kode lånt fra https://developer.mozilla.org/en-US/docs/Web/API/fetch
        const {data} = await fetch('api/countries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          if(response.ok) return response.json()
          throw new Error(`HTTP ERROR! Status: ${response.status}`)
        })
        console.log(data.name) // Bør fjernes før levering
        setCountry(data) // La til setCountry(data) slik at country faktisk blir oppdatert
      } catch (error) {
        console.log("ERROR")
        console.log(error)
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
