import React from 'react'
import loader from '../../../assets/loader.svg'
import './index.scss'
const Loader = () => {
    return (
        <div className="loader center">
            <img alt="loader" src={loader} />
        </div>
    )
}
export default Loader