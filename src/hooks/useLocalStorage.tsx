import React from 'react'

//CUSTOM HOOK FOR USING LOCAL STORAGE 
export default function useLocalStorage() {
  
    const getItem = (key : string) => {
        const data = localStorage.getItem(key);
        if(!data) return; 
        return JSON.parse(data);
    }

    const removeItem = (key: string) =>{
        localStorage.removeItem(key)
    }

    const setItem = (key : string, dataToStore:Record<string, any>) => {
        if(!dataToStore) return;
        const stringData = JSON.stringify(dataToStore);
        localStorage.setItem(key, stringData);
    }

    const clearStore = () =>{
        localStorage.clear();
    }

    return {
        getItem, setItem, clearStore, removeItem
    }
}