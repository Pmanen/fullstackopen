import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '4040484'},
    { name: 'Zorp', number: '5555'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [filterIsEmpty, setFilterIsEmpty] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setActiveFilter(event.target.value)
    setFilterIsEmpty((event.target.value === ""))
  }

  const numbersFiltered = filterIsEmpty ? persons : 
    persons.filter((person) => person.name.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <div>filter shown with <input value={activeFilter} onChange={handleFilterChange}/></div>
      </div>
      <div>
        <h2>add a new</h2>
        <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <div>
        {numbersFiltered.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App