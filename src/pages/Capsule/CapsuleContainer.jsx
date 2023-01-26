import React from 'react';
import { useState, useEffect } from 'react';
import CapsuleFiltSearchCont from './CapsuleFiltSearchCont';
import Capsules from './Capsules';
import { Spinner } from 'react-bootstrap';
import { useDebounce } from '../../utilities/Debounce';

export default function CapsuleContainer() {
    const [searchInput, setSearchInput] = useState('');
    const [filterInput, setFilterValue] = useState('status');
    const [loader, setLoader] = useState(false);
    const [capsuleData, setCapsuleData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        const url = 'https://api.spacexdata.com/v3/capsules';

        const fetchData = async () => {
            try {
                setLoader(true)
                const response = await fetch(url);
                let json = await response.json();
                setLoader(false)
                setCapsuleData(json);
            } catch (error) {
                setLoader(false)
                console.log("error", error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        if (searchInput !== '' && filterInput !== '') {
            const filteredData = capsuleData.filter((item) => {
                return item[filterInput].toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(capsuleData)
        }
    }, [searchInput, filterInput]);

    const onSearch = (srchdVal) => {
        setSearchInput(srchdVal)
    }

    const onFilter = (fltVal) => {
        setFilterValue(fltVal)
    }

    const debounceSearched = useDebounce(onSearch, 300);

    return (
        <div className='main-caps-cont'>
            {loader ? (<Spinner animation="grow" role="status" className='man-spinn'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>)  :  (
                <>
                <CapsuleFiltSearchCont srchdItem={debounceSearched} filtdVal={onFilter}/>
                <Capsules capsData={filteredResults && filteredResults.length ? filteredResults : capsuleData} rowsPerPage={10}/>
                </>
            )}
        </div>
    );
}
