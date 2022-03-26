import React, { useState, useEffect, useCallback } from "react"
import { fetchData } from "../../Services/API"
import { Students } from "../../Models/Student"
import { MemoCard } from "../Card/Card";
import { MemoSearch } from "../Search/Search";
import { FILTER_FUNCTIONS } from "../../Utilities/SearchFilters";

export const CardContainer = () => {

    const [allStudents, setAllStudents] = useState<Students>([]);
    const [displayedStudents, setDisplayedStudents] = useState<Students>([]);

    useEffect(() => {
        fetchData().then((data) => {
            console.log(data);
            setDisplayedStudents(data);
            setAllStudents(data);
        })
    }, [fetchData, setDisplayedStudents])

    const [filter, setFilter] = useState<{
        [key: string]: string;
    }>({
        tag: "",
        name: "",
    });

    const setNameFilter = useCallback((name: string) => {
        setFilter((oldFilter) => ({
            ...oldFilter,
            name
        }))
    }, [setFilter]);

    const setTagFilter = useCallback((tag: string) => {
        setFilter((oldFilter) => ({
            ...oldFilter,
            tag
        }))
    }, [setFilter]);
    
    useEffect(() => {
        const updateDisplayedStudents = () => {
            const FILTERED_STUDENTS = allStudents.filter((student) => {
                for (const FILTER_KEY in filter) {
                    if (!FILTER_FUNCTIONS[FILTER_KEY](student, filter[FILTER_KEY])) {
                        return false;
                    }
                }
                return true;
            })
            setDisplayedStudents(FILTERED_STUDENTS);
        }
        updateDisplayedStudents();
    }, [filter, allStudents]);

    return (
        <div className="content-container">
            <MemoSearch 
                label="Search by name"
                id="search-by-name"
                setFilterCallback={setNameFilter}
                borderColorClass={""}
            />
            <MemoSearch 
                label="Search by tag"
                id="search-by-tag"
                setFilterCallback={setTagFilter}
                borderColorClass={"input__border--secondary"}
            />
            <section className="card-container">
                {
                    displayedStudents.map((student) => {
                        return (
                            <article 
                                className="card" 
                                key={student.id}
                            >
                                <MemoCard 
                                    student={student} 
                                    updateStudents={setAllStudents}
                                />
                            </article>
                        )
                    })
                }
            </section>
        </div>
    )
}