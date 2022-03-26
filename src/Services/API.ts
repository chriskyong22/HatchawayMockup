import { Students, StudentAPI } from "../Models/Student"

const BACKEND_ENDPOINT = "https://api.hatchways.io/assessment/students";

export const fetchData = async (): Promise<Students> => {
    let response = await fetch(BACKEND_ENDPOINT);
    const data = await response.json();
    return data.students.map((student: StudentAPI) => ({
        ...student,
        tags: [],
    }))
}