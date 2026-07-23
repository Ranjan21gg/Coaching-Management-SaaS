import privateAPI from "../privateapi";

// Get Fee call to backend
export const getAttendance = async () => {
    const { data } = await privateAPI.get("attendance/");
    return data;
}

// Get Fee call to backend
export const getStudents = async () => {
    const { data } = await privateAPI.get("students/");
    return data;
}

// Get Fee call to backend
export const getFees = async () => {
    const { data } = await privateAPI.get("fees/");
    return data;
};


// Delete student call to backend
export const deleteStudent = async (id) => {
    return await privateAPI.delete(`students/${id}/`)
};

