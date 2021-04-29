import React, { useState, useEffect } from 'react';
import { server_calls } from '../api';

export const useGetData = () => {
    const [characterData, setData] = useState<any>([]);

    const handleDataFetch = async () => {
        const result = await server_calls.get()
        setData(result)
    }

    // Introducing the useEffect hook to add our data call to React State
    useEffect( () => {
        handleDataFetch();
    },[]) // Don't want handle fetch to get the data multiple times

    return {characterData, getData:handleDataFetch}
}