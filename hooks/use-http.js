import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import conf from '../conf.json';
import axios from 'axios';

const useHttp = () => {
  const getTokenAsync = async () => await AsyncStorage.getItem('token');

  // Function to fetch data using GET method
  const get = async (url) => {
    try {
      let token = await getTokenAsync();
      let headers = {};

      if (token) {
        headers = {
          'Authorization': `Bearer ${token}`,
        };
      }

      const response = await fetch(conf.urlBase + url, {
        headers: {
          ...headers
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Request failed!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // Function to send data using POST method
  const post = async (url, body) => {
    try {
      let token = await getTokenAsync();
      let headers = {};

      if (token && url !== '/api/auth/signup') {
        headers = {
          'Authorization': `Bearer ${token}`,
        };
      }

      const response = await axios.post(conf.urlBase + url, body, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'accept-encoding': 'gzip, deflate, br',
        },
        withCredentials: false
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Request failed!');
      }

      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

  return { get, post };
};

export default useHttp;
