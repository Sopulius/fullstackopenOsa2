import React from 'react';
import ReactDOM from 'react-dom'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      newFilter: '',
      notification: null,
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const per = this.state.persons.filter(p => p.name === personObject.name)[0]
    if(per){
      if(window.confirm(personObject.name+' on jo luettelossa, korvataanko vanha numero uudella?')){
        personService.update(per.id,personObject)
        .then(response => {
          personService
          .getAll()
          .then(r =>{
            this.setState({
              persons: r,
              newName: '',
              newNumber: '',
              notification: 'Päivitettiin '+personObject.name
            })
            setTimeout(()=>{
              this.setState({notification: null})
            }, 3000)
          })
        })
      }
    }else{
      personService
    .create(personObject)
    .then(response => {
      this.setState({
        persons: this.state.persons.concat(response),
        newName: '',
        newNumber: '',
        notification: 'Lisättiin '+ personObject.name
      })
      setTimeout(()=>{
        this.setState({notification: null})
      }, 3000)
    })
    } 

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

  handleDeletePerson = (id, event) => {
    const person = this.state.persons.filter(p => p.id === id)[0]
    personService
    .deleteObject(id)
    .then(response =>{personService
      .getAll()
      .then(all => {
        this.setState({
          persons:all,
        notification: 'Poistettiin '+person.name
      })
      setTimeout(()=>{
        this.setState({notification: null})
      }, 3000)
      })})
  }

  componentDidMount() {
    personService
    .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  render() {
    const personsToShow = this.state.newFilter === ''
     ? this.state.persons
     :this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.newFilter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification}/>
        <Filter handleFilterChange={this.handleFilterChange} newFilter={this.newFilter}/>
        <form onSubmit={this.addPerson}>
        <h2>Lisää uusi</h2>
          <div>
            nimi: <input 
            value={this.state.newName}
            onChange={this.handleNameChange}
            />
            <br/>
            numero: <input 
            value={this.state.newNumber}
            onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(p => <Person key={p.id} person={p} handleDeletePerson={this.handleDeletePerson}/>)}
        </ul>
      </div>
    )
  }
}

const Filter = (props) => {
  const {newFilter} = props
  const {handleFilterChange} = props
  return(
    <div>
    <form>
          <div>
            rajaa näytettäviä: <input value ={newFilter}
            onChange={handleFilterChange}
            />
            </div>
          </form>
    </div>
  )
}

const Person = (props) => {
  const {person} = props
  const {handleDeletePerson} = props
  return(
    <div>
      <li>{person.name} {person.number} <button onClick={()=>{if(window.confirm('Poistetaanko '+ person.name+'?')){handleDeletePerson(person.id)}}}>poista</button></li>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
  )