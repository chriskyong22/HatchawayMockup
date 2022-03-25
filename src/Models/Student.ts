export interface StudentAPI {
    city: string;
    company: string;
    email: string;
    firstName: string;
    grades: string[];
    id: string;
    lastName: string;
    pic: string;
    skill: string;
}

export type Student = StudentAPI & {tags: string[]}

export type Students = Student[];