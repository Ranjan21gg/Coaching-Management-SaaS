import privateAPI from "../../privateapi";

// Get Fee call to backend
export const getFees = async () => {
  const { data } = await privateAPI.get("fees/");
  return data;
};

// Get Student call to backend
export const getStudents = async () => {
  const { data } = await privateAPI.get("students/");
  return data;
};

export const createFee = (payload) =>
  privateAPI.post("fees/", payload);

export const updateFee = (id, payload) =>
  privateAPI.put(`fees/${id}/`, payload);

export const deleteFee = (id) =>
  privateAPI.delete(`fees/${id}/`);