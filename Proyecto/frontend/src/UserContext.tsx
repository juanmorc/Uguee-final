import React, { createContext, useState, useContext, ReactNode } from "react";

type User = {
    name: string;
    lastName: string;
};

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({ name: "", lastName: "" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};