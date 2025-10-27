import React, { createContext, useContext, useState } from 'react';

export type Cinema = {
    id: number;
    name: string;
}

type CinemaContextType = {
    cinema: Cinema | null;
};

const CinemaContext = createContext<CinemaContextType | undefined>(undefined);

const CinemaProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [cinema, setCinema] = useState<Cinema | null>(null);

    return (
        <CinemaContext.Provider value={{ cinema }}>
            {children}
        </CinemaContext.Provider>
    );
}

const useCinema = () => {
    const context = useContext(CinemaContext);
    if (!context) {
        throw new Error('useCinema must be used within a CinemaProvider');
    }
    return context;
}


export { CinemaProvider, useCinema };

