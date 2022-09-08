import { REQUEST_URL } from "./env.js";

export const getUser = async () => {
  try {
    const options = {
      method: "GET",
    };
    const res = await fetch(
      `${REQUEST_URL}/users`,
      options
    );
    const users = await res.json();

    return users;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const getStudent = async () => {
  try {
    const options = {
      method: "GET",
    };
    const res = await fetch(
      `${REQUEST_URL}/students`,
      options
    );
    const students = await res.json();

    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const createStudent = async (data) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${REQUEST_URL}/students`,
      options
    );
    const students = await res.json();

    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const updateStudent = async (id, data) => {
  try {
    const options = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${REQUEST_URL}/students/${id}`,
      options
    );
    const students = await res.json();

    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const deleteStudent = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${REQUEST_URL}/students/${id}`,
      options
    );
    const students = await res.json();

    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};
