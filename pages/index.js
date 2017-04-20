import React,{Component} from "react";
import Dialog from "react-md/lib/Dialogs";
import Button from "react-md/lib/Buttons/Button";
import TextField from "react-md/lib/TextFields";
import Toolbar from "react-md/lib/Toolbars";
import Head from "next/head";
import JSONTree from "react-json-tree";
import _ from "underscore";
import Form from "../component/form";

export default class RestTest extends Component {

  static async getInitialProps (args) {
    return {}
  }

  constructor(props){
    super()
    this._handleSchema=this._handleSchema.bind(this)
    this.openDialog=this.openDialog.bind(this)
    this.closeDialog=this.closeDialog.bind(this)
    this.state= {
      json: {},
      globalVar: {},
      paths:[],
      operations:[],
      visible:false,
      parameters:[]
    }
    this.json={}


  }

  _handleSchema(val){
    this.json = JSON.parse(val)
    this.setState({
      json:this.json
    },()=>{
      this._setGlobalVariable(this.state.json)
      this._setRequestUrls(this.state.json.paths)
    })

  }
  _setRequestUrls(path){
    let temp=[]

  _.each(path,(value,key)=>{
    let op=[]
    if(_.isObject(value)){
      _.each(value,(operation,operationName)=>{
        op.push({key:operationName,operation})
      })
    }
    temp.push({key:key,op})
    })
  this.setState({paths:temp})

  }
  _setGlobalVariable(json){

    let obj={
      host:json.host,
      basePath:json.basePath||'',
      schemes:json.schemes||[],
      responseContentType:json.consumes||[],
      requestContentType:json.produces||[],
    }
    this.setState({
      globalVar:obj
    })

  }

  openDialog = (parameters) => {
    this.setState({parameters,visible:true});
  };

  closeDialog = () => {
    this.setState({visible:false});
  };

  render () {
    const nav = <Button icon onClick={this.closeDialog}>X</Button>;
    const action = <Button flat label="Save" onClick={this.closeDialog} />;
    return (
        <div>
          <Head>
            <title>Tixdo</title>
            <meta charSet='utf-8'/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
            <link rel="apple-touch-icon" href="https:s3.amazonaws.com/tixdotest/images/favicon.png"/>
            <link rel="icon" href="https://s3.amazonaws.com/tixdotest/images/favicon.png" type="image/png"/>
            <link rel='stylesheet' href='/static/css/react-md.light_blue-yellow.min.css'/>

          </Head>
          <div className="md-grid">
            <div className="md-cell--3 md-cell--middle md-text-right">ADD</div>
            <div className="md-cell--3  md-cell--1-offset md-text-left">
                <TextField
                  id="helpMultiline"
                  placeholder=""
                  rows={4}
                  maxRows={4}
                  onChange={this._handleSchema}
              />
            </div>
          </div>
          <div>
            <h2>Full Schema</h2>
            <JSONTree data={this.state.json}/>
            </div>
          <div >
            <h2>Global Schema</h2>

            <JSONTree data={this.state.globalVar}/>
          </div>
          {this.state.paths.map((val,i)=>(
              <div key={i}>
                <h2>{val.key||''}</h2>

                {val.op.map((operation,k)=>(
                    <div key={k}>
                      <h2>{operation.key||''}</h2>

                      <JSONTree data={operation.operation||''}/>
                      <Button raised label="Try Operation"
                              onClick={()=>this.openDialog(operation.operation.parameters)} />

                    </div>
                ))

                }
                <Dialog
                    id={'Dialog'}
                    visible={this.state.visible}
                    fullPage
                    aria-label="New Event"
                    onHide={this.closeDialog}
                >
                  <Toolbar
                      colored
                      nav={nav}
                      actions={action}
                      title="New Event"
                      fixed
                  />
                  <Form parameters={this.state.parameters||[]} globalVar={this.state.globalVar}/>

                </Dialog>

              </div>
          ))

          }
        </div>
    )
  }
}
