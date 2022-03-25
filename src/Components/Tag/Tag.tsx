import React, { useState } from "react"
import { Student, Students } from "../../Models/Student";
interface TagProps {
    currentStudent: Student;
    updateStudents: React.Dispatch<React.SetStateAction<Students>>;
}


export const Tag: React.FC<TagProps> = ({ currentStudent, updateStudents }) => {

    const [tags, setTags] = useState<string[]>(currentStudent.tags);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newTag =  event.currentTarget.value;
            setTags((oldTags) => [...oldTags, newTag]);
            updateStudents((oldStudents) => (
                oldStudents.map((student) => {
                    if (student.id === currentStudent.id) {
                        return ({
                            ...student,
                            tags: [...student.tags, newTag]
                        })
                    }
                    return student;
                })
            ))
            event.currentTarget.value = '';
        }
    }

    return (
        <>
            <div className="tags">
                {
                    tags.map((tag, index) => (
                        <p 
                            className="tag" 
                            key={`${currentStudent.id} ${index} ${tag}`}
                        >
                            {tag} 
                        </p>
                    ))
                }
            </div>
            <label htmlFor="add-a-tag">
                Add a tag
            </label>
            <input 
                id="add-a-tag"
                className="input input--smaller margin-top-1rem"
                placeholder="Add a tag"
                onKeyDown={handleKeyPress}
            />
        </>
    )
}