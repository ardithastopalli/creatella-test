import React from 'react';
import {filters} from '../../../constants/index';
import './filter.scss';

const Filter = ({sendFilter})=>{
    const filter= filters
    
    return (
        <div className="filter">
            <label>Filter By</label>
            <select onChange={sendFilter}>
               <option defaultValue value={filter.price}>{filter.price}</option>
               <option value={filter.date}>{filter.date}</option>
               <option value={filter.id}>{filter.id}</option>

            </select>
            
        </div>
    )
}

export default Filter;