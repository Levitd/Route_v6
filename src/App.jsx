import React from "react";
import { BrowserRouter, NavLink, Navigate, Route, Routes, useParams } from "react-router-dom";

const users = ["User01", "User02", "User03", "User04", "User05"];

const MainPage = () => {
    return (
        <>
            <h1>MainPage</h1>
            <NavLink to="users">User List</NavLink>
        </>);
};
const UserList = () => {
    const params = useParams();
    return (
        <>
            <h1>UserList</h1>
            <ul>
                <>{users.map((user, idx) => <li key={`list_${idx + 1}`}><NavLink to={"/users/" + (idx + 1)}>{user}</NavLink></li>)}</>
            </ul>
            <hr />
            <NavLink to="/">Main Page</NavLink>
        </>);
};
const UserPage = () => {
    const { userId } = useParams();
    const url = "/users/" + userId + "/profile/edit";
    return (
        <>
            <h1>UserPage</h1>
            <h3>User: {(users[userId - 1]) ? users[userId - 1] : userId}</h3>
            <NavLink to={url}>User Edit Page</NavLink>
            <hr />
            <NavLink to="/users">User List</NavLink>
        </>);
};
const UserPageEdit = () => {
    const { userId } = useParams();
    const url = "/users/" + userId + "/profile";
    const urlAnotherUser = "/users/" + (isNaN(Number(userId)) || (Number(userId) >= 5) ? 1 : Number(userId) + 1) + "/profile";
    return (
        <>
            <h1>UserPageEdit</h1>
            <h3>User: {(users[userId - 1]) ? users[userId - 1] : userId}</h3>
            <NavLink to={url}>User Page</NavLink>
            <br />
            <NavLink to={urlAnotherUser}>Another User Page</NavLink>
            <hr />
            <NavLink to="/users">User List</NavLink>
        </>);
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="users" >
                    <Route index element={<UserList />} />
                    <Route path=":userId/profile" element={<UserPage />} />
                    <Route path=":userId" element={<Navigate to="profile" />} />
                    <Route path=":userId/profile/edit" element={<UserPageEdit />} />
                    <Route path="*" element={<Navigate to="profile" />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
