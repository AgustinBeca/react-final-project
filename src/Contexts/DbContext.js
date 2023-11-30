import { getFirestore } from "firebase/firestore";
import React, { createContext, useEffect, useState, useContext } from "react";
import appfirebase from "../Credenciales";

export const DbContext = createContext(null);

export function useDatabase() {
    return useContext(DbContext);
}

export const DatabaseProvider = ({ children }) => {
    const [database, setDatabase] = useState({});

    useEffect(() => {
        const db = getFirestore(appfirebase);
        setDatabase(db);
    }, []);
    
    return(
        <DbContext.Provider value = {database}>{children}</DbContext.Provider>
    )
}
