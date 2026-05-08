import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
id: string;
email: string;
name?: string;
}

interface AuthContextType {
user: User | null;
loading: boolean;
signUp: (email: string, password: string, name: string) => Promise<void>;
signIn: (email: string, password: string) => Promise<void>;
signOut: () => void;
accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "http://localhost:5000/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
const [accessToken, setAccessToken] = useState<string | null>(null);

// 🔥 Load user on refresh
useEffect(() => {
const token = localStorage.getItem("token");


if (!token) {
  setLoading(false);
  return;
}

const fetchUser = async () => {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error();

    setUser(data.user);
    setAccessToken(token);
  } catch {
    localStorage.removeItem("token");
    setUser(null);
  } finally {
    setLoading(false);
  }
};

fetchUser();


}, []);

const signUp = async (email: string, password: string, name: string) => {
const res = await fetch(`${API_BASE}/auth/signup`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ email, password, name }),
});


const data = await res.json();

if (!res.ok) {
  throw new Error(data.error || "Signup failed");
}

// auto login
await signIn(email, password);


};

const signIn = async (email: string, password: string) => {
const res = await fetch(`${API_BASE}/auth/signin`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ email, password }),
});


const data = await res.json();

if (!res.ok) {
  throw new Error(data.error || "Signin failed");
}

const token = data.token;
localStorage.setItem("token", token);
setAccessToken(token);

// 🔥 Fetch real user AFTER login
const meRes = await fetch(`${API_BASE}/auth/me`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const meData = await meRes.json();

if (!meRes.ok) {
  throw new Error("Failed to fetch user");
}

setUser(meData.user);


};

const signOut = () => {
localStorage.removeItem("token");
setUser(null);
setAccessToken(null);
};

return (
<AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, accessToken }}>
{children}
</AuthContext.Provider>
);
};

export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) {
throw new Error('useAuth must be used within AuthProvider');
}
return context;
};
