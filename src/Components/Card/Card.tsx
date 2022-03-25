import react, { useState } from "react";
import { Student, Students } from "../../Models/Student"
import { getAverage } from "../../Utilities/StudentHelpers"
import { Tag } from "../Tag/Tag"

interface CardProps { 
    student: Student;
    updateStudents: react.Dispatch<react.SetStateAction<Students>>;
}

export const Card: React.FC<CardProps> = ({ student, updateStudents }) => {

    const [showExtended, setShowExtended] = useState(false);

    return (
        <>
            <img 
                className="card__image" 
                src={student.pic} 
                alt=""
            />
            <section className="card__content">
                <h2 className="card__title">
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
                        ? <div className="student__extended-info margin-top-1rem preserve-whitespace">
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
                onClick={(_event) => setShowExtended((oldShowExtend) => !oldShowExtend)}
                aria-expanded={showExtended}
                aria-label={`Show extended info of ${student.firstName} ${student.lastName}`}
            >
                {showExtended ? "-" : "+"}
            </button>
        </>
    )
}