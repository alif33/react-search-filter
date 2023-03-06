import { createSlice } from '@reduxjs/toolkit';

export const infoSlice = createSlice({
    name: "infos",
    initialState: {
        list: null,
        baseData: null,
        trafficInfos: null,
        affectedStopPoints: null,
    },
    reducers: {

        setInfos: (state, action) => {            
            return {
                ...state,
                trafficInfos: action.payload.data,
                baseData: action.payload.data,
                list: action.payload.list,
                affectedStopPoints: action.payload.affectedStopPoints,
            }
        },

        setFilteredData: (state, action) => {            
            return {
                ...state,
                trafficInfos: action.payload,
            }
        }

    }
})
