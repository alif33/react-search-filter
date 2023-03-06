import { useState } from "react";
import Select from "react-select";
import { BiSearch } from "react-icons/bi";
import { filterByMode, filterByText } from "../helper/FilterHandler";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData } from "../store/infos/actions";

const DropdownIndicator = props => {
    return (
      <span className="p-2" {...props}>
        <BiSearch/>
      </span>
    );
};


const customStyles = {
    option: (provided, state) => ({
      ...provided,
      zIndex: 99999 // set z-index value based on focus state
    })
  };

const Search = ({
    allModes,
    searchFields, 
    setSearchField,
})=>{

    const [selectedOption, setSelectedOption] = useState(null);
    const { infos } = useSelector(state=>state);
    const dispatch = useDispatch();

    const affectedStopPointsOption = infos?.affectedStopPoints?.map(line => ({
        label: line.name,
        value: line.name
    }));

    const filteringData = async({ mode, modes, query, queries })=>{
        if(mode){
           const modesData =  await filterByMode(modes, infos.baseData);
           const filtersData = await filterByText(searchFields, modesData);
           dispatch(setFilteredData(filtersData));
        }

        if(query){
            const filtersData = await filterByText(queries, infos.baseData);
            const modesData =  await filterByMode(allModes, filtersData);
            dispatch(setFilteredData(modesData));
        }
    }

    const handleSelect = async value =>{    
        setSearchField(prevSearch => {
            const newSearch = {
                ...prevSearch,
                stopPointName: value
            }
            filteringData({ query: true, queries: newSearch })
            return newSearch;
        });
    }

    const handleSelectPoints = async e =>{
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

    return(
        <Select
            name="colors"
            value={selectedOption}
            isClearable={true}
            styles={customStyles}
            classNamePrefix="select"
            className="basic-multi-select"
            onChange={handleSelectPoints}
            options={affectedStopPointsOption}
            components={{ DropdownIndicator: DropdownIndicator }}
        />
    )
}

export default Search;