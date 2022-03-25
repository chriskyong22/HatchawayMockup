import { Student } from "../Models/Student";

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