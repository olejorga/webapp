// TODO: Her er det bugs

const letterList = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ')

type LettersProps = {
  getMessage: () => string
  guesses: string[]
  handleGuess: (letter: string) => void // Endret input type fra number til string.
}

type LetterProps = Pick<LettersProps, 'handleGuess' | 'guesses'> & {
  letter: string
}



export default function Letters({
  handleGuess,
  guesses,
  getMessage,
}: LettersProps) {
  return (
    <>
      <p className="message">{getMessage()}</p>
      <ul className="letters">
        {letterList.map((letter) => ( // Changed from forEach to map
          <Letter
            handleGuess={handleGuess}
            guesses={guesses}
            key={letter}
            letter={letter}
          />
        ))}
      </ul>
    </>
  )
}

const Letter = ({ letter, handleGuess, guesses }: LetterProps) => {
  const letterMatch = guesses.includes(letter.toLowerCase())
  return (
    <button
      onClick={() => handleGuess(letter)}
      disabled={letterMatch}
      className={`letter ${letterMatch ? 'highlight' : ''}`}
    >
      {letter}
    </button>
  )
}
