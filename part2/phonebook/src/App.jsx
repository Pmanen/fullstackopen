import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [filterIsEmpty, setFilterIsEmpty] = useState(true)

  useEffect(() => {
      axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, []) 

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
   
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
        <PersonForm 
          add={addPerson} 
          name={newName} 
          number={newNumber} 
          nameHandler={handleNameChange} 
          numberHandler={handleNumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <div>
        <Persons persons={numbersFiltered} />
      </div>
    </div>
  )
}

export default App