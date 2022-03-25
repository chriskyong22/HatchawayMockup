import react, { useState, useEffect } from "react"
import { fetchData } from "../../Services/API"
import { Students } from "../../Models/Student"
import { Card } from "../Card/Card";
import { Search } from "../Search/Search";
import { FILTER_FUNCTIONS } from "../../Utilities/SearchFilters";

export const CardContainer = () => {

    const [allStudents, setAllStudents] = useState<Students>([]);
    const [displayedStudents, setDisplayedStudents] = useState<Students>([]);

    useEffect(() => {
        fetchData().then((data) => {
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

    const setNameFilter = (name: string) => {
        setFilter((oldFilter) => ({
            ...oldFilter,
            name
        }))
    }

    const setTagFilter = (tag: string) => {
        setFilter((oldFilter) => ({
            ...oldFilter,
            tag
        }))
    }
    
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
            <Search 
                label="Search by name"
                id="search-by-name"
                setFilterCallback={setNameFilter}
            />
            <Search 
                label="Search by tag"
                id="search-by-tag"
                setFilterCallback={setTagFilter}
            />
            <div className="card-container">
                {
                    displayedStudents.map((student) => {
                        return (
                            <div 
                                className="card" 
                                key={student.id}
                            >
                                <Card 
                                    student={student} 
                                    updateStudents={setAllStudents}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}