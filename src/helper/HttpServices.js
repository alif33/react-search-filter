import axios from "axios";

export const ROOT_URL = `https://api.vasttrafik.se/`;
export const APP_URL = `https://api.vasttrafik.se/`;

export const IMAGE_URL = `${APP_URL}storage`;
export const API_URL = `${APP_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

const authHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const basicHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getData = async (endPoint) => {
  try {
    const { data } = await api.get(endPoint);
    return data;
  } catch (error) {
    return error;
  }
};

export const __getData = async (endPoint, token) => {
  try {
    const { data } = await api.get(endPoint, {
      headers: authHeader(token),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const postData = async (endPoint, formData) => {
  try {
    const { data } = await api.post(endPoint, formData);
    return data;
  } catch (error) {
    return error;
  }
};

export const postReq = async (endPoint, formData) => {
  try {
    const { data } = await api.post(endPoint, formData);
    return data;
  } catch (error) {
    return error;
  }
};

export const authPost = async (endPoint, formData, token) => {
  try {
    const { data } = await api.post(endPoint, formData, {
      headers: basicHeader(token),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const updateData = async (endPoint, formData, token) => {
  try {
    const { data } = await axios.put(API_URL + endPoint, formData, {
      headers: authHeader(token),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (endPoint, token) => {
  try {
    const { data } = await axios.delete(API_URL + endPoint, {
      headers: authHeader(token),
    });
    return data;
  } catch (error) {
    return error;
  }
};