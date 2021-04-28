import { Component } from 'react';

class DimensionComp extends Component {
    render(){
        var keyprop = this.props.keyy
        keyprop = keyprop.charAt(0).toUpperCase() + keyprop.slice(1)
        var valueprop = this.props.value
        return(
            <div style={{display : "flex", marginLeft : "60px"}}>
                <p style={{fontWeight:'bolder', marginRight : '4px'}}>{keyprop}</p> : <p style={{fontWeight : 'lighter', marginLeft : '4px'}}>{valueprop}</p>
            </div>
        )
    }
}

export default DimensionComp