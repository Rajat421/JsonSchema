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
      parameters:[],
      components:[]
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
    console.log(path)
    let comp_arry=[]

  _.each(path,(value,key)=>{
    let op=[]
    let comp
    if(_.isObject(value)){
      _.each(value,(operation,operationName)=>{
        comp={}
        comp['path']=key
        comp['component_name']=operationName+'-'+key
        comp['method']=operationName
        comp={...comp,...operation}
        delete comp['parameters']
        _.map(operation.parameters,(param,i)=>{
          if(param.in==='body'){
            comp['body_param']=[...comp.body_param||{},param]
          }
          else if(param.in==='path'){
            comp['path_param']=[...comp.path_param||{},param]
          }
          else if(param.in==='query'){
            comp['query_param']=[...comp.query_param||{},param]
          }
          else if(param.in==='formData'){
            comp['formData_param']=[...comp.formData_param||{},param]
          }
          else if(param.in==='header'){
            comp['header_param']=[...comp.header_param||{},param]
          }
          return param

        })
        op.push({key:operationName,operation})
        comp_arry.push(comp)
      })

    }
    else{

    }
    temp.push({key:key,op})
    })
  this.setState({
    paths:temp,
    components:comp_arry
  },()=>{
    console.log(this.state.components)
  })

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

  openDialog = (c) => {
    this.setState({render_component:c,visible:true});
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
          {/*{this.state.paths.map((val,i)=>(*/}
              {/*<div key={i}>*/}
                {/*<h2>{val.key||''}</h2>*/}

                {/*{val.op.map((operation,k)=>(*/}
                    {/*<div key={k}>*/}
                      {/*<h2>{operation.key||''}</h2>*/}

                      {/*<JSONTree data={operation.operation||''}/>*/}
                      {/*<Button raised label="Try Operation"*/}
                              {/*onClick={()=>this.openDialog(operation.operation.parameters)} />*/}

                    {/*</div>*/}
                {/*))*/}

                {/*}*/}
                {/*<Dialog*/}
                    {/*id={'Dialog'}*/}
                    {/*visible={this.state.visible}*/}
                    {/*fullPage*/}
                    {/*aria-label="New Event"*/}
                    {/*onHide={this.closeDialog}*/}
                {/*>*/}
                  {/*<Toolbar*/}
                      {/*colored*/}
                      {/*nav={nav}*/}
                      {/*actions={action}*/}
                      {/*title="New Event"*/}
                      {/*fixed*/}
                  {/*/>*/}
                  {/*<Form parameters={this.state.parameters||[]} globalVar={this.state.globalVar}/>*/}

                {/*</Dialog>*/}

              {/*</div>*/}
          {/*))*/}

          {/*}*/}
          <h2> Components </h2>
          <div className="md-grid">

          {
            this.state.components.map((c,i)=>(
                <div key={i} className="md-cell--2 md-text-center"
                     style={{border:'1px solid grey',boxShadow:'2px 0px',
                       cursor:'pointer',margin:'10px auto 10px auto',
                       padding:'10px auto 10px auto'}}
                      onClick={()=>this.openDialog(c)}><h4><u>{c.component_name}</u></h4></div>
            ))
          }
          </div>
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
            <div className="md-grid" style={{marginTop: '150px'}}>
            <JSONTree data={this.state.render_component}/>
            </div>

          </Dialog>
        </div>
    )

  }
}
