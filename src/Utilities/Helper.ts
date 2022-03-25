import { Student } from "../Models/Student";
export const getAverage = (grades: string[]) => {
    let total = grades.reduce((total, grade) => parseInt(grade) + total, 0);
    return total / grades.length;
}

const filterByName = (student: Student, filterName: string) => {
    const FULL_NAME = `${student.firstName} ${student.lastName}`;
    return FULL_NAME.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
}

const filterByTag = (student: Student, filterTag: string) => {
    if (filterTag === '') {
        return true;
    }
    const tags = student.tags;
    return tags.reduce((found, tag) => {
        return found || (tag.toLowerCase().indexOf(filterTag.toLowerCase()) !== -1);
    }, false);
}

export const FILTER_FUNCTIONS: {
    [key: string]: (student: Student, filterValue: string) => boolean;
} = {
    tag: filterByTag,
    name: filterByName,
}