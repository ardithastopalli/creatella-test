import React , {Component} from 'react';
import { fetchAds } from '../../../api/api'
import Loader from '../loader/loader';

class AdCard extends Component  {
    state = {
        imageSrc: null
    }

    componentDidMount(){
        fetchAds().then(url=>{
            if(url){
                this.setState({imageSrc:url})
            }
        }).catch(e=>console.log(e))
    }

    render(){
        const {imageSrc} = this.state
        const advertise = imageSrc ? 
        <div style={{
            width:'100%', 
            height: '100%',
            textAlign: 'center', 
            border: '1px solid black'
        }}>
        <p>But first, a word from our sponsors</p>
        <div 
        style={{
            width:'100%', 
            height: '250px',
            backgroundImage: 'url(' + imageSrc + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
        </div>
        </div>: 
        <div style={{
            width:'100%', 
            textAlign: 'center', 
        }}><Loader/></div>

        return advertise
    }
}

export default AdCard