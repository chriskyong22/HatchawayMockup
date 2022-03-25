import React from "react";

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
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCallback(event.target.value);
    }

    return (
        <div className={`search`}>
            <label htmlFor={id}>
                {label}
            </label>
            <input 
                id={id}
                className={`input ${borderColorClass}`}
                placeholder={label}
                onChange={handleSearch}
            />
        </div>
    )
}

export const MemoSearch = React.memo(Search);