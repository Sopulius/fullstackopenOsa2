import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName
    }
    const persons = this.state.persons.concat(personObject)

    this.setState({
      persons: persons,
      newNote: ''
    })

  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input 
            value={this.state.addName}
            onChange={this.handleNameChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <li>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )