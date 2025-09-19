import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../types/UserType";

export const useUserAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/me", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (response.status === 401) {
        const refreshResponse = await fetch("http://localhost:8000/refresh", {
          method: "POST",
          credentials: "include", // Include cookies in the request
        });

        if (refreshResponse.ok) {
          return fetchUser();
        } else {
          setUser(null);
          navigate("/sign");
          return;
        }
      }

      if (!response.ok) {
        setUser(null);
        navigate("/sign");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
      navigate("/sign");
    }
  };

  const register = async (username: string, password: string, confirm_password: string): Promise<boolean> => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    if (!username || !password || !confirm_password) {
      alert("Please fill in all fields");
      return false;
    }

    if (!usernameRegex.test(username)) {
      alert("Username must be 4-20 characters long and contain only letters, numbers, or _");
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters, include a capital letter, a number, and a special character");
      return false;
    }

    if (password !== confirm_password) {
      alert("Passwords do not match");
      return false;
    }

    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! You can now log in.");
      return true;
    } else {
      alert(`Registration failed: ${data.detail || "Unknown error"}`);
      return false;
    }
  };

  const login = async (username: string, password: string, remember_me: boolean): Promise<boolean> => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return false;
    }

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, remember_me }),
      credentials: "include",
    });

    if (response.ok) {
      navigate("/");
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.detail || "Login failed");
    }
  };

  const logout = async () => {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/sign");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, register, login, logout, fetchUser };
};
