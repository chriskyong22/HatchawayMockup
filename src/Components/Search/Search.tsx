import react, { useState } from "react";
import { Students } from "../../Models/Student";

interface SearchProps {
    label: string;
    id: string;
    searchFunction: (value: string) => void;
}

export const Search: React.FC<SearchProps> = (
        { 
            label,
            id,
            searchFunction, 
        }
    ) => {
    const handleSearch = (event: react.ChangeEvent<HTMLInputElement>) => {
        searchFunction(event.target.value);
    }

    return (
        <div className="search">
            <label htmlFor={id}>
                {label}
            </label>
            <input 
                id={id}
                className="input" 
                placeholder={label}
                onChange={handleSearch}
            />
        </div>
    )
}