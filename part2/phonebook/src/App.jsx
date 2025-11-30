import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [filterIsEmpty, setFilterIsEmpty] = useState(true)

  useEffect(() => {
      personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, []) 

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = {...existingPerson, number: newPerson.number}

        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id !== returnedPerson.id ? p : returnedPerson)))
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            alert("Error: person does not exist in database.")
          })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .deleteAction(person.id)
        .then((returnedData) => {
          setPersons(persons.filter((p) => (p.id !== returnedData.id)))
        })
        .catch((error) => {
          alert('Error: person is already deleted.')
          setPersons(persons.filter((p) => (p.id !== person.id)))
        })
      }
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
      <Persons persons={numbersFiltered} deleteHandler={deletePerson} />
    </div>
  )
}

export default App