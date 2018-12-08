import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      newFilter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    var persons = this.state.persons
    if(!persons.some(o => o.name === personObject.name)){
      persons = this.state.persons.concat(personObject)
    }

    this.setState({
      persons: persons,
      newName: '',
      newNumber: ''
    })

  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({newFilter: event.target.value})
  }

  render() {
    const personsToShow = this.state.newFilter === ''
     ? this.state.persons
     :this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.newFilter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter handleFilterChange={this.handleFilterChange}/>
        <form onSubmit={this.addPerson}>
        <h2>Lisää uusi</h2>
          <div>
            nimi: <input 
            value={this.state.addPerson}
            onChange={this.handleNameChange}
            />
            <br/>
            numero: <input 
            value={this.state.addPerson}
            onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(p => <Person key={p.name} person={p}/>)}
        </ul>
      </div>
    )
  }
}

const Filter = (props) => {
  const {handleFilterChange} = props
  return(
    <div>
    <form>
          <div>
            rajaa näytettäviä: <input 
            onChange={handleFilterChange}
            />
            </div>
          </form>
    </div>
  )
}

const Person = (props) => {
  const {person} = props
  return(
    <div>
      <li>{person.name} {person.number}</li>
    </div>
  )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )