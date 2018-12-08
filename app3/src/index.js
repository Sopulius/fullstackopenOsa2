import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      newFilter: ''
    }
  }

  handleFilterChange = (event) => {
    this.setState({newFilter: event.target.value})
  }

  setFilter = (param,event) => {
      this.setState({newFilter: param})
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  render() {
    const countriesToShow = this.state.newFilter === ''
     ? this.state.countries
     :this.state.countries.filter(c => c.name.toLowerCase().includes(this.state.newFilter.toLowerCase()))
    return (
      <div>
        <Filter handleFilterChange={this.handleFilterChange}/>
        <Countries countries={countriesToShow} setFilter={this.setFilter}/>
      </div>
    )
  }
}

const Countries = (props) => {
    const {countries} = props
    if(countries.length >= 10){
        return(
            <div>
                <p>too many matches, specify another filter</p>
            </div>
        )
    }else if(countries.length === 1){
        const country = countries[0]
        return(
            <div>
                <h1>{country.name} {country.nativeName}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <img src={country.flag}  height="200"/>
            </div>
        )
    }else if(countries.length === 0){
        return(
            <div>
                <p>no matches</p>
            </div>
        )
    }
    return(
        <div>
            <ul>
            {countries.map(c => <Country key={c.name} country={c} setFilter={props.setFilter}/>)}
            </ul>
        </div>
    )
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

const Country = (props) => {
    const {country} = props
    const {setFilter} = props
    return(
      <div>
        <li onClick={()=> setFilter(country.name)}>{country.name}</li>
      </div>
    )
  }



ReactDOM.render(
    <App />,
    document.getElementById('root')
  )