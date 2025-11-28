import Person from './Person'

const Persons = ({ persons }) => {
    if (persons.length === 0) return <div><p><i>No numbers shown. Check if you have filters enabled.</i></p></div>
    return (
        <div>
            {persons.map((person) => <Person key={person.name} person={person} />)}
         </div>
    )
}

export default Persons