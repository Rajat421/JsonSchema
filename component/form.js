
import React, {Component} from "react";
import SelectField from 'react-md/lib/SelectFields';
import _ from "underscore";
export default class Form extends Component {

    constructor (props) {
        super(props)
        this.state = {
        }
        this.change={}
    }
    _handleChange(newValue){
        console.log(newValue,'--->')
    }
    handleChange(e){
        var change={}
        change[e.target.name]=e.target.value
        this.setState(change,()=>{
            console.log('sadasdasd',this.state)
        })

    }

    componentWillReceiveProps (newProps) {

    }

    componentDidMount () {

    }
    checkScheme(schemes){
        if(schemes.length!==0) {
            return (     <div className="md-cell--12 md-text-center">
                    <label className="md-cell--6 md-cell--1-offset md-text-right">Scheme</label>

                    <select className="md-cell--2 md-cell--1-offset md-text-left">
                        {
                            schemes.map(val=>(
                            <option value={val}>{val}</option>
                        ))
                        }
                    </select>
                </div>


            )
        }

    }

    generateTextFeild(param){
        console.log(param,'hhh')
        return (
        <div className="md-grid">
            <div key={param.name} className="md-cell--12 md-text-center">
                <label className="md-cell--6 md-cell--1-offset md-text-right">
                    {param.name}

                </label>
                <input className="md-cell--2 md-cell--1-offset md-text-left" name={param.name} onChange={this.handleChange.bind(this)} type="text" />

            </div>
        </div>
        )
    }

    componentWillUnmount () {


    }
    setParameters(){
        const {parameters}=this.props
        let arr=_.map(parameters,param=>{
                return this.generateTextFeild(param)

        })
        return arr

    }
    setGlobalParams(){
        const {globalVar}=this.props


        return (

            <div className="md-grid" style={{marginTop: '150px'}}>
                {
                    this.checkScheme(globalVar.schemes)
                }

            </div>
        )
    }

    render () {
        return(<div>
            {this.setGlobalParams()}

            {this.setParameters()}
            <div className="md-grid ">
                <div className="md-cell--12 md-text-center">
                    {JSON.stringify(this.state)}
                </div>
            </div>

        </div>)
    }
}
