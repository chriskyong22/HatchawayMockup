import React, { useState } from "react";
import { Student, Students } from "../../Models/Student"
import { getAverage } from "../../Utilities/StudentHelpers"
import { Tag } from "../Tag/Tag"

interface CardProps { 
    student: Student;
    updateStudents: React.Dispatch<React.SetStateAction<Students>>;
}

export const Card: React.FC<CardProps> = ({ student, updateStudents }) => {

    const [showExtended, setShowExtended] = useState(false);
    const toggleExtend = () => {
        setShowExtended(oldExtended => !oldExtended);
    }

    const renderTests = (): JSX.Element => {
        return (
            <div className="student__extended-info margin-top-1rem preserve-whitespace">
                {
                    student.grades.map((grade, index) => {
                        return (
                            <p 
                                key={`${student.id} ${index}`}
                            >
                                {`Test ${index + 1}:    ${grade}%`}
                            </p>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <>
            <img 
                className="card__image" 
                src={student.pic} 
                alt={`Picture of ${student.firstName} ${student.lastName}`} 
            />
            <section className="card__content">
                <h2 className="card__title margin-top-1rem">
                    {`${student.firstName}  ${student.lastName}`}
                </h2>
                <article className="student__info">
                    <p>
                        {`Email: ${student.email}`}
                    </p>
                    <p>
                        {`Company: ${student.company}`}
                    </p>
                    <p>
                        {`Skill: ${student.skill}`}
                    </p>
                    <p>
                        {`Average: ${getAverage(student.grades)}%`}
                    </p>
                    {
                        showExtended 
                        ? renderTests()
                        : <></>
                    }
                    <Tag
                        updateStudents={updateStudents}
                        currentStudent={student}
                    />
                </article>
            </section>
            <button 
                className="card__extended-info-button"
                onClick={toggleExtend}
                aria-expanded={showExtended}
                aria-label={`Show extended info of ${student.firstName} ${student.lastName}`}
            >
                {showExtended ? "-" : "+"}
            </button>
        </>
    )
}

export const MemoCard = React.memo(Card);