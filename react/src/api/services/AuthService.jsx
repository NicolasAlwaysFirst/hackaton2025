import apiClient from "../apiClient";

class AuthService {
  static async login(email, password) {
    const  data  = await apiClient("/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", data.token);
    return data.user;
  }

  static async updatePassword(old_password, new_password) {
    const  data  = await apiClient("/user/password", {
      method: "POST",
      body: JSON.stringify({ old_password, new_password }),
    });
    return data;
  }

  static async register(name, email, password) {
    const data  = await apiClient("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    localStorage.setItem("token", data.token);
    return data.user;
  }

  static async logout() {
    await apiClient("/logout", { method: "GET" });
    localStorage.removeItem("token");
  }

  static async getUser() {
    return await apiClient("/user", { method: "GET" });
  }

  static isAuthenticated() {
    return !!localStorage.getItem("token");
  }
}

export default AuthService;
