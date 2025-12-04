import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [filterIsEmpty, setFilterIsEmpty] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setSuccessMessage(
              `${returnedPerson.name}'s new number successfully recorded.`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setErrorMessage(
              `Error: ${changedPerson.name} does not exist in database.`
            )
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
        setSuccessMessage(
              `${returnedPerson.name}'s number added to phonebook.`
            )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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
          setErrorMessage(
            `Error: ${person.name} does not exist in database.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter((p) => (p.id !== person.id)))
        })
      }
  }

  const numbersFiltered = filterIsEmpty ? persons : 
    persons.filter((person) => person.name.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <div>
      <Notification message={successMessage} type={"success"} />
      <Notification message={errorMessage} type={"error"} />
      <div>
        <h2>Phonebook</h2>
        <div>filter shown with <input value={activeFilter} onChange={handleFilterChange}/></div>
      </div>
      <div>
        <h2>add a new</h2>
        <p style={{color: 'magenta'}}>This message is to test the build script.</p>
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