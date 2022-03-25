import React, { useState } from "react";
import { Students } from "../../Models/Student";

interface SearchProps {
    label: string;
    id: string;
    setFilterCallback: (value: string) => void;
}

export const Search: React.FC<SearchProps> = (
        { 
            label,
            id,
            setFilterCallback, 
        }
    ) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCallback(event.target.value);
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

export const MemoSearch = React.memo(Search);