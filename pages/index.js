import React from 'react'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import cookie from 'cookie'
import TextField from 'react-md/lib/TextFields';
import Head from 'next/head'
import JSONTree from 'react-json-tree'
import _ from 'underscore'

export default class extends React.Component {

  static async getInitialProps (args) {
    return {}
  }

  constructor(props){
    super()
    this._handleSchema=this._handleSchema.bind(this)
    this.state= {
      json: {},
      globalvar: {},
      paths:[],
      operations:[],
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
        op.push({[operationName]:operation})
      })
    }
    temp.push({[key]:op})
    })
  this.setState({paths:temp})
    console.log(temp)

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
      globalvar:obj
    })

  }



  render () {
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
          <div className="md-grid">
            <JSONTree data={this.state.json}/>
            </div>
          <div className="md-grid">
            <JSONTree data={this.state.globalvar}/>
          </div>
          <div className="md-grid">

          </div>
        </div>
    )
  }
}
