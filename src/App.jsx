import { useEffect, useState } from 'react'
import './index.css'
import Die from './components/Die'
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti'

function App() {
    const [allDice, setAllDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        if (allDice.every(die => die.isHeld)) {
            const val = allDice[0].value
            if (allDice.every(die => die.value === val)) {
                setTenzies(true)
            }
        }
    }, [allDice])

    function newDie() {
        const randomNum = Math.floor(Math.random() * 6) + 1
        return { value: randomNum, isHeld: false, id: uuidv4() }
    }

    function allNewDice() {
        const randomArr = []
        for (let i = 1; i <= 10; i++) {
            randomArr.push(newDie())
        }
        return randomArr
    }

    function roll() {
        if (!tenzies) {
            setAllDice(oldDices => oldDices.map(die => {
                return die.isHeld ? die : newDie()
            }))
        } else {
            setTenzies(false)
            setAllDice(allNewDice)
        }

    }

    function hold(id) {
        setAllDice(oldDices =>
            oldDices.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        )
    }

    const allDicesElements = allDice.map((dice) => {
        return <Die value={dice.value} key={dice.id} isHeld={dice.isHeld} onHold={hold} id={dice.id} tenzies={tenzies} />
    })

    return (
        <div className='container'>
            {tenzies && <Confetti />}
            <div className='inner-container'>
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='dies-container'>
                    {allDicesElements}
                </div>
                <button className='roll-btn' onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
            </div>
        </div>
    )
}

export default App
