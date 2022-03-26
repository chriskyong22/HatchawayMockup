import React from "react"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Tag } from "../Tag/Tag"
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

test('Check if tag rendered', () => {
    render(<Tag currentStudent={student} updateStudents={updateStudentsMock}/>)
    const tags = screen.queryAllByTestId('tags')
    expect(tags).not.toBeNull();
})

test('Check if tag input exists with the associated label', () => {
    render(<Tag currentStudent={student} updateStudents={updateStudentsMock}/>)
    const tagInput = screen.queryByLabelText('Add a tag');
    expect(tagInput).not.toBeNull();
})


test('Check if tag input allows input', () => {
    render(<Tag currentStudent={student} updateStudents={updateStudentsMock}/>)
    const tagInput = screen.queryByLabelText('Add a tag');
    if (tagInput) {
        fireEvent.change(
            tagInput, 
            {
                target: {value: "A"}
            }
        )
    }
    expect(tagInput).toHaveValue("A")
})

test('Check if Tag added is displayed', () => {
    const VALUE = "A";
    render(<Tag currentStudent={student} updateStudents={updateStudentsMock}/>)
    const tagInput = screen.getByLabelText('Add a tag');
    if (tagInput) {
        fireEvent.change(
            tagInput, 
            {
                target: {value: VALUE}
            }
        )
        fireEvent.keyDown(
            tagInput, 
            {
                key: "Enter",
                code: "Enter",
                charCode: 13
            }
        )
    }
    expect(tagInput).toHaveValue('');
    const tagsContainer = screen.queryByTestId('tags');
    expect(tagsContainer).not.toBeNull();
    if (tagsContainer) {
        const tags = Array.from(tagsContainer.childNodes);
        expect(tags.length).toBe(1);
        expect(tags[0]).toHaveTextContent(VALUE);
    }
})