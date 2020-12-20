import { useState } from "react"

const getServerHostname = () => {
    if (window.location.hostname === "localhost") {
        return "http://localhost:4000"
    } else {
        return "FIXME"
    }
}

function App() {
    const [checked, setChecked] = useState(false)
    const [valid, setValid] = useState(false)
    const [number, setNumber] = useState('')
    const [type, setType] = useState('')

    const updateNumber = (event) => {
        setNumber(event.target.value)
    }

    const checkCard = () => {
        console.log('somebody clicked me')
        console.info('what am I doing here...')
        console.warn('this is not funny...')
        fetch(getServerHostname() + '/validate/' + number)
            .then(response => response.json())
            .then(result => {
                setChecked(true)
                setValid(result.valid)
                setType(result.type)
            })
            // Oh, My, Console!
            .catch(console.error)
    }

    const getCssClass = () => {
        let className = 'form-control '
        if (checked) {
            className += valid ? 'is-valid' : 'is-invalid'
        }
        return className
    }

    return <div className='container text-center v-align'>
        <h1 className="mb-5">Credit Card Validation Tool</h1>
        <div className="input-group mb-3">
            <input onChange={updateNumber} value={number} type="text" className={getCssClass()} placeholder="Credit card number" />
            <button onClick={checkCard} className="btn btn-primary">Validate</button>

            {checked && valid && <div class="valid-feedback">
                Credit card is valid and of type {type}
            </div>}

            {checked && !valid && <div class="invalid-feedback">
                Credit card number is not valid
            </div>}
        </div>
        <small>&copy; Tunisian JS Community.</small>
    </div>
}

export default App
