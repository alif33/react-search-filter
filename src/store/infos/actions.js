import { infoSlice } from "./slice";
const { actions: slice } = infoSlice;

export const setInfos = infos => (dispatch) => {
    dispatch(slice.setInfos(infos));
}

export const setFilteredData = data => (dispatch) => {
    dispatch(slice.setFilteredData(data));
}

