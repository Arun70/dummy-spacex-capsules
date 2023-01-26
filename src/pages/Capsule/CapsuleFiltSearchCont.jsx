import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function CapsuleSearchFiltCont({ srchdItem, filtdVal }) {
  const [filteredState, changeFilteredState] = useState('');

    const onSelectChange = (fltdVal) => {
        changeFilteredState(fltdVal.target.value);
        filtdVal(fltdVal.target.value);
    }

    return (
        <div className='srch-flt-cont'>
            <div className='srch-cont'>
                <input placeholder="Search Capsules..." onChange={(e) => srchdItem(e.target.value)}/>
            </div>
            <div className='flt-cont'>
                <span>Filter by: </span>
                <select id="capFlt" onChange={onSelectChange} value={filteredState}>
                  <option value="status">Status</option>
                  <option value="orig_launch">Original Launch</option>
                  <option value="type">Type</option>
               </select>
            </div>
        </div>
    );
}
