import { Component } from 'react';
import DataWidget from './DataWidget';
import {Link} from 'react-scroll';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';

import '../css/dashboard.css'

class MetricsWidget extends Component{
    constructor(){
        super()
        this.state = {
            fileinfo : [],
        }
    }

    componentDidMount(){
    fetch("http://localhost:8082/metrics")
        .then(res => res.json())
        .then(data => {
            this.setState({
                fileinfo : data,
            })
        }) 
    }
    render(){
        // In Line Styling
        const divWrapperStyle = {
            background : 'white',
            marginTop : '32px',
            width: '98%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '15px'
        }
        const divStyle = {
            display: 'flex',
            justifyContent : 'space-around',
            
        }
        const ulStyle = {
            listStyleType: 'none',
            marginTop : '15px',
            paddingLeft : '0px'
        }
        const ulStylewrapper = {
            listStyleType: 'none',
            background : '#f0f0f0 none repeat scroll 0% 0%',
            paddingLeft:'0px',
            marginTop:'-30px'
        }
        const liStyle = {
            background : 'white',
        }
        const h1Style = {
            textAlign : 'center',
            paddingTop : '55px',
            color : '#2a4968'
        }
        //Create Map of Measure fields as keys and array of corresponding files as values
        var measureCatogries = new Map()
        this.state.fileinfo.forEach(function(file){
            var key = file['measure']
            var valuearray = measureCatogries.get(key)
            if(valuearray === undefined){
                measureCatogries.set(key,[file])
            }
            else{   
                valuearray.push(file)
                measureCatogries.set(key,valuearray)
            } 
        })
        //Formatting map into list of Components
        var categorylist = []
        measureCatogries.forEach((values,keys)=>{
            var len = values.length;
            var keyheading  = keys.toString()
            var newkeyheading = ""
            for(var i=0;i<keyheading.length;i++){
                if(keyheading.charAt(i) === '_'){
                    newkeyheading += " "
                }
                else newkeyheading += keyheading.charAt(i)
            }
            newkeyheading = newkeyheading.charAt(0).toUpperCase() + newkeyheading.slice(1)
            var valueslist1 = values.slice(0,len/2).map(function(file){
                return <DataWidget fileid = {file['_id']} measure = {file['measure']} dimensions = {file['dimensions']} axistitle = {newkeyheading}/>
            })
            var valueslist2 = values.slice(len/2+1,len).map(function(file){
                return <DataWidget fileid = {file['_id']} measure = {file['measure']} dimensions = {file['dimensions']} axistitle = {newkeyheading}/>
            }) 
            
            categorylist.push(
            <div id = {newkeyheading} style = {divWrapperStyle}>
                <h1 style = {h1Style} >{newkeyheading}</h1>
                <div style={divStyle}>
                    <ul style={ulStyle}>
                        <li style = {liStyle}>{valueslist1}</li>
                    </ul>
                    <ul style={ulStyle}>
                        <li style={liStyle}>{valueslist2}</li>
                    </ul>
                </div>
            </div>)
        })
        
        return (
            <div>
                <Navbar sticky = "top" className="navbarstyles">
                    <Nav fill = "true" className="navstyles">
                        <ul style={{display: 'flex', listStyle: 'none', justifyContent: 'space-around',position: 'sticky', zIndex: 100, top: 0, width : "100%", marginTop : "16px", cursor : 'pointer'}}>
                            <li style={{cursor : 'default'}}><h6>Measuring : </h6> </li>
                            <li><Link activeClass="active" to="Revenue" spy={true} smooth={true}>Revenue</Link></li>
                            <li><Link  to="Payment api failure count" spy={true} smooth={true}>Payment api failure count</Link></li>
                            <li><Link  to="Purchase count" spy={true} smooth={true}>Purchase count</Link></li>
                            <li><Link  to="Checkout failure count" spy={true} smooth={true}>Checkout failure count</Link></li>
                        </ul>
                    </Nav>
                </Navbar>
                <div style={{overflowX: 'hidden', background : '#f0f0f0 none repeat scroll 0% 0%'}}>
                    <ul style = {ulStylewrapper}>
                        <li >{categorylist}</li>
                    </ul>
                </div>
            </div>
            
            //////
        )
    }
}

export default MetricsWidget
