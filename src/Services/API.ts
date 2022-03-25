
const BACKEND_ENDPOINT = "https://api.hatchways.io/assessment/students";

export const fetchData = async (): Promise<any> => {
    let response = await fetch(BACKEND_ENDPOINT);
    let data = response.json();
    return data;
}