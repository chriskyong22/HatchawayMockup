export const getAverage = (grades: string[]) => {
    let total = grades.reduce((total, grade) => parseInt(grade) + total, 0);
    return total / grades.length;
}

