import { REQUEST_URL } from "./env.js";
class Method {
  async getUser() {
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
  }

  async getStudent() {
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
  }

  async createStudent(data) {
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
  }

  async updateStudent(id, data) {
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
  }

  async deleteStudent(id) {
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
  }
}

export default Method;
