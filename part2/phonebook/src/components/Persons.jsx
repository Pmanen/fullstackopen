import Person from './Person'

const Persons = ({ persons, deleteHandler }) => {
    if (persons.length === 0) return <div><p><i>No numbers shown. Check if you have filters enabled.</i></p></div>
    return (
        <ul>
            {persons.map((person) => <Person key={person.name} person={person} deleteHandler={() => deleteHandler(person)}/>)}
         </ul>
    )
}

export default Persons