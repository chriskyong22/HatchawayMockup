import React, { useState } from "react"
import { Student, Students } from "../../Models/Student";
interface TagProps {
    currentStudent: Student;
    updateStudents: React.Dispatch<React.SetStateAction<Students>>;
}

export const Tag: React.FC<TagProps> = ({ currentStudent, updateStudents }) => {

    const [tags, setTags] = useState<string[]>(currentStudent.tags);
    const [tag, setTag] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setTags((oldTags) => [...oldTags, tag]);
            updateStudents((oldStudents) => (
                oldStudents.map((student) => {
                    if (student.id === currentStudent.id) {
                        return ({
                            ...student,
                            tags: [...student.tags, tag]
                        })
                    }
                    return student;
                })
            ))
            setTag('');
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.currentTarget.value);
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
                className="input input--tag margin-top-1rem"
                placeholder="Add a tag"
                value={tag}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </>
    )
}