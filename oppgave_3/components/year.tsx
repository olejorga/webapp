const weekTest = Array.from({ length: 52 }, (_, i) => i + 1)

export default function Year() {
  return (
    <>
      <h2 className="yearTitle">Uker</h2>
      <ul className="year">
        {weekTest.map((oneweek) => (
          <Week key={oneweek} week={oneweek} />
        ))}
      </ul>
    </>
  )
}

const Week = ({ week }) => {
  return <p className="week">{week}</p>
}
