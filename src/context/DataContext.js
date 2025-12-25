import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // Stores the results from backend analysis (clustering, etc.)
    const [analysisData, setAnalysisData] = useState(null);

    return (
        <DataContext.Provider value={{ analysisData, setAnalysisData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
