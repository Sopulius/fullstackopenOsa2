import React from 'react'

const Kurssi = (props) => {
    const {kurssi} = props;
    return (
        <div>
        <Otsikko nimi={kurssi.nimi}/>
        <Sisalto osat={kurssi.osat}/>
        <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}

const Sisalto = (props) => {
    const {osat} = props
    const rivit = () => osat.map(osa => <Osa key={osa.id} osa={osa}/>)
    return (
        <div>
            <ul>
                {rivit()}
            </ul>
        </div>
    )
}

const Osa = (props) => {
    const {osa} = props
    return (<li>{osa.nimi} {osa.tehtavia}</li>)
}

const Yhteensa = (props) => {
    const {osat} = props
    var sumCallback = (acc,cur) => acc+cur
    const sum = osat.map(osa => osa.tehtavia).reduce(sumCallback)
    return (<p>yhteensä {sum} tehtävää</p>)
}

const Otsikko =  (props) => {
    return (       
        <h1>{props.nimi}</h1>     
    )
}

export default Kurssi