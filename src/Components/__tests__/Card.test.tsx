import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import { MemoCard } from "../Card/Card"
import { Students } from "../../Models/Student"
import { getAverage } from "../../Utilities/StudentHelpers"

const student = {
    "city": "Fushe-Muhurr",
    "company": "Yadel",
    "email": "iorton0@imdb.com",
    "firstName": "Ingaberg",
    "grades": [
        "78",
        "100",
        "92",
        "86",
        "89",
        "88",
        "91",
        "87"
    ],
    "id": "1",
    "lastName": "Orton",
    "pic": "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    "skill": "Oracle",
    "tags": []
}

const updateStudentsMock: React.Dispatch<React.SetStateAction<Students>> = jest.fn(() => {})

afterEach(() => {
    cleanup();
})

test('img is set correctly', () => {
    render(<MemoCard student={student} updateStudents={updateStudentsMock}/>);
    const img = screen.getByTestId('card-img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toEqual(`${student.pic}`)
})

test('title is set correctly', () => {
    render(<MemoCard student={student} updateStudents={updateStudentsMock}/>);
    const cardTitle = screen.getByTestId('card-title');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent(`${student.firstName} ${student.lastName}`)
})

test('student-info is set correctly in Card', () => {
    render(<MemoCard student={student} updateStudents={updateStudentsMock}/>);
    const studentInfo = screen.getByTestId('card-student-info');
    expect(studentInfo).toBeInTheDocument();
    expect(studentInfo.childNodes.length).toBeGreaterThanOrEqual(4);
    const [email, company, skill, average, ...rest] = Array.from(studentInfo.childNodes);
    expect(email).toHaveTextContent(`${student.email}`);
    expect(company).toHaveTextContent(`${student.company}`);
    expect(skill).toHaveTextContent(`${student.skill}`);
    expect(average).toHaveTextContent(`${getAverage(student.grades)}%`);
})

test('student-info does not show expanded-info on default', async () => {
    const component = render(<MemoCard student={student} updateStudents={updateStudentsMock}/>);
    const button = await component.findByTestId("extended-info-button");
    expect(button.getAttribute('aria-expanded')).toEqual("false");
    const extendedInfo = screen.queryByTestId('extended-info-section');
    expect(extendedInfo).toBeNull();
})

test('student-info does shows expanded-info on expanded', async () => {
    const component = render(<MemoCard student={student} updateStudents={updateStudentsMock}/>);
    const button = await component.findByTestId("extended-info-button");
    button.click();
    expect(button.getAttribute('aria-expanded')).toEqual("true");
    const extendedInfo = screen.queryByTestId('extended-info-section');
    expect(extendedInfo).not.toBeNull();
})

test('student-info shows the correct grades on expanded', async () => {
    const component = render(<MemoCard student={student} updateStudents={updateStudentsMock}/>);
    const button = await component.findByTestId("extended-info-button");
    button.click();
    const extendedInfo = screen.queryByTestId('extended-info-section');
    if (extendedInfo) {
        const tests = Array.from(extendedInfo.childNodes);
        tests.forEach((test, index) => {
            expect(test).toHaveTextContent(`Test ${index + 1}: ${parseInt(student.grades[index])}%`)
        })
    }
})