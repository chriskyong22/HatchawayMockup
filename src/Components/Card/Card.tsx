import React, { useState } from "react";
import { Student, Students } from "../../Models/Student"
import { getAverage } from "../../Utilities/StudentHelpers"
import { Tag } from "../Tag/Tag"

interface CardProps { 
    student: Student;
    updateStudents: React.Dispatch<React.SetStateAction<Students>>;
}

export const Card: React.FC<CardProps> = ({ student, updateStudents }) => {

    const FULL_NAME = `${student.firstName} ${student.lastName}`;
    const [showExtended, setShowExtended] = useState(false);
    const toggleExtend = () => {
        setShowExtended(oldExtended => !oldExtended);
    }

    const renderTests = (): JSX.Element => {
        return (
            <div 
                data-testid="extended-info-section"
                className="student__extended-info margin-top-1rem preserve-whitespace"
            >
                {
                    student.grades.map((grade, index) => {
                        return (
                            <p 
                                key={`${student.id} ${index}`}
                            >
                                {`Test ${index + 1}:    ${grade}%`}
                            </p>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <>
            <img 
                data-testid="card-img"
                className="card__image" 
                src={student.pic} 
                alt={`Picture of ${FULL_NAME}`} 
            />
            <section className="card__content">
                <h2 data-testid="card-title" className="card__title margin-top-1rem">
                    {FULL_NAME}
                </h2>
                <article data-testid="card-student-info" className="student__info">
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
                data-testid="extended-info-button"
                className="card__extended-info-button"
                onClick={toggleExtend}
                aria-expanded={showExtended}
                aria-label={`Show extended info of ${student.firstName} ${student.lastName}`}
            >
                {showExtended ? "-" : "+"}
            </button>
        </>
    );
}

export const MemoCard = React.memo(Card);