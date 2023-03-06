import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Search from "../components/Search";
import { MdTrain } from 'react-icons/md';
import { IoMdBus } from 'react-icons/io';
import { filterByMode, filterByText } from "../helper/FilterHandler";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData } from "../store/infos/actions";

const Icon = ({mode})=>{
    if(mode==="bus"){
        return(
           <IoMdBus/> 
        )
    }else if(mode==="tram"){
        <MdTrain/>
    }
}

const MyOption = props => {
    
    const { innerProps, innerRef } = props;
    return (
        <span ref={innerRef} {...innerProps} className="select-list pl-3">
            <h5> <Icon mode={props.data.defaultTransportModeCode}/> {props.data.label}</h5>
        </span>
    );
  };

export default function Hero({ 
        allModes,
        setAllModes,
        searchFields, 
        setSearchField
    }) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm();
    const [selectedOption, setSelectedOption] = useState(null);
    const { infos } = useSelector(state=>state);
    const dispatch = useDispatch();


    const listOption = infos?.list?.map(line => ({
        label: line.designation +" "+ line.directions[0].name,
        value: line.designation,
        defaultTransportModeCode: line.defaultTransportModeCode
    }));

    const filteringData = async({ mode, modes, query, queries })=>{
        if(mode){
           const modesData =  await filterByMode(modes, infos?.baseData);
           const filtersData = await filterByText(searchFields, modesData);
           dispatch(setFilteredData(filtersData));          
        }

        if(query){
            const filtersData = await filterByText(queries, infos?.baseData);
            const modesData =  await filterByMode(allModes, filtersData);
            dispatch(setFilteredData(modesData));         
        }
    }



    const handleSelect = async value =>{
        setSearchField(prevSearch => {
            const newSearch = {
                ...prevSearch,
                designation: value
            }
            filteringData({ query: true, queries: newSearch })
            return newSearch;
        });
    }

    const handleListSearch = async e =>{        
        if(e){
            setSelectedOption(e);
                await handleSelect(e.value)
        }else{
            setSelectedOption({
                value: null
            })
                await handleSelect("");
        }
    }


    const handleMode = async(name, value)=>{
        setAllModes(prevModes => {
            const newModes = {
                ...prevModes,
                [name]: value
            }
            filteringData({ mode: true, modes: newModes })
            return newModes;
        });
    }
      
    return (
        <div className="hero-section">
            <div id="hero" className="box w-50">
                <div className="form-section mt-3">
                    <form>
                        <h3 className="box-title text-center mt-3">Traffic information</h3>
                        <p className="py-3">Here you will find traffic information about public transport in Western Sweden. You will also find tips on how to travel when your journey isn't going as planned.</p>
                        <hr/>
                        <div className="mb-4">
                            <h5 className="input-label">Which line do you want traffic information about?</h5>
                            <p>The search result will be updated immediately when you change the filter.</p>

                            <Select
                                name="colors"
                                options={listOption}
                                value={selectedOption}
                                isClearable={true}
                                onChange={handleListSearch}
                                classNamePrefix="select"
                                className="basic-multi-select"
                                components={{Option: MyOption}}
                            />
                        </div>
                        <div className="mb-4">
                            <h5 className="input-label">Which municipality are you travelling in?</h5>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="E.g. Gothenburg, Skövde or Lerum" 
                            />
                        </div>

                        <div className="mb-4">
                            <h5 className="input-label">Mode of transport</h5>
                            <div className="d-flex flex-row justify-content-between">
                                <div className="form-check">
                                    <input 
                                        id="exampleCheck1"
                                        type="checkbox" 
                                        className="form-check-input" 
                                        value={allModes.tram}
                                        onChange={e => handleMode("tram", e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Tram</label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        id="exampleCheck1"
                                        type="checkbox" 
                                        className="form-check-input" 
                                        value={allModes.bus}
                                        onChange={e => handleMode("bus", e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Bus</label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        id="exampleCheck1"
                                        type="checkbox" 
                                        className="form-check-input" 
                                        value={allModes.train}
                                        onChange={e => handleMode("train", e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Train</label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        id="exampleCheck1"
                                        type="checkbox" 
                                        className="form-check-input" 
                                        value={allModes.boat}
                                        onChange={e => handleMode("boat", e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Boat</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h5 className="input-label">Type of traffic disruption</h5>
                            <div className="d-flex flex-row justify-content-between">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Ongoing traffic disruptions
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Upcoming traffic changes
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                {/* </div> */}
                </div>
            </div>
            <div id="mobile-menu" className="mobile-nav-menu">
                <ul className="mobile-nav">
                    <li><Link to="/">Traffic Information</Link></li>
                </ul>
                <Search
                    allModes={allModes}
                    searchFields={searchFields}
                    setSearchField={setSearchField}
                />
            </div>
            <div className="parallax"></div>
        </div>
    );
}