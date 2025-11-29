const PersonForm = ({ add, name, nameHandler, number, numberHandler }) => {
    return (
        <form onSubmit={add}>
        <div>name: <input value={name} onChange={nameHandler}/></div>
        <div>number: <input value={number} onChange={numberHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm