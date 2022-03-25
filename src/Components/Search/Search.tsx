import React, { useState } from "react";

interface SearchProps {
    label: string;
    id: string;
    setFilterCallback: (value: string) => void;
    borderColorClass: string;
}

export const Search: React.FC<SearchProps> = (
        { 
            label,
            id,
            setFilterCallback,
            borderColorClass 
        }
    ) => {
        
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setFilterCallback(event.target.value);
    }

    return (
        <div className={`search margin-top-1rem`}>
            <label htmlFor={id}>
                {label}
            </label>
            <input 
                id={id}
                className={`input ${borderColorClass}`}
                placeholder={label}
                value={searchValue}
                onChange={handleSearch}
            />
        </div>
    )
}

export const MemoSearch = React.memo(Search);