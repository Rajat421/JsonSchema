
import React, {Component} from "react";


export default class Form extends Component {

    constructor (props) {
        super(props)
        this.state = {}

    }


    componentWillReceiveProps (newProps) {
        console.log(newProps,'--->')
    }

    componentDidMount () {
        console.log(this.props,'===p')
    }



    componentWillUnmount () {


    }

    render () {
            const {parameters}=this.props


        return(<div className="md-grid" style={{marginTop:'200px'}}>
            {
                parameters.map((field,i)=>(
               <div key={i} className="md-cell--12 md-text-center">
                   <label>{field.name}</label>
                   <input type='text' required={field.required||false}/>
               </div>
        ))
        }
        </div>)
    }
}
