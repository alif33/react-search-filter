export const filterByDesignation = async (field, data) => {
    if(field.length>0){
        const filteredData = await data.filter(item => {
            return item.affectedLines.some(line => {
                return line.designation === field;
            });
        }); 
        return filteredData
    }else{
        return data;
    }
};

export const filterByStopPointName = async (field, data) => {
    
    if(field.length>0){
        const filteredData = await data.filter(item => {
            return item.affectedStopPoints.some(point => {
                return point.name === field;
            });
        }); 
        return filteredData
    }else{
        return data;
    }
};



export const filterByText = async (queries, data) => {
     if(queries.designation.length>0 || queries.stopPointName.length>0){
        const designatedData = await filterByDesignation(queries.designation, data);
        const stopPointData = await filterByStopPointName(queries.stopPointName, designatedData);
        console.log(stopPointData, "stop point");
        
        return stopPointData;
    }else{
        return data
    }   

}

export const filterByMode = async (modes, data) =>{
    if(modes.bus || modes.tram || modes.train || modes.boat){
        const filterByMode = await data.filter(item =>
            item.affectedLines.some(line =>
                Object.keys(modes)
                    .filter(key => modes[key])
                        .includes(line.defaultTransportModeCode)
            )
        );
        return filterByMode;
    }else{
        return data
    }
}


