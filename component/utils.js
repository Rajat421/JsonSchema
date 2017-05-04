import _ from 'underscore'
import mpath from 'mpath';
export function getJson(json,fullschema) {

    if(_.isObject(json) && !(_.isArray(json))){
        let resolvedRef
        for (let prop in json){

            if(prop==='$ref'){
                resolvedRef=  resolveRef(json,fullschema);
                _.each(resolvedRef,(value,key)=>{
                    json[key]=value
                })
                delete json['$ref']
            }
            else{
                getJson(json[prop],fullschema)
            }
        }
        // if ( json.hasOwnProperty('$ref') ) {
        //     console.log(json,resolvedRef)
        //     delete json['$ref']
        //     json={...json,...resolvedRef}
        //     console.log(json)
        //     getJson(json,fullschema)
        // }
    }
    else if(_.isArray(json)){
        for(let i of json){
            getJson(i,fullschema)
        }
    }

    return json

}

function resolveRef(ref,fullSchema) {
    let refPATH= ref.$ref.split('#');
    console.log(refPATH,'path');
    let refPath=refPATH[1];
    if(refPath.charAt(0)==='/'){
        refPath=refPath.substring(1)
    }
    if(refPath.indexOf('/')>=0){
        refPath=refPath.replace(/\//gi, '.');
        // console.log(refPath,"replaceBYDOT")

    }
     return mpath.get(refPath,fullSchema)
}
