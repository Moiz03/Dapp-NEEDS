import React, { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./components/homepage/homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPageComponent from "./components/MainComponent/MainPageComponent";
import UploadProductComponent from "./components/UploadProduct/UploadProductComponent";
import ProfileComponent from "./components/Profile/ProfileComponent";

function App() {
  const [user, setLoginUser] = useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setLoginUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setLoginUser();
    localStorage.clear();
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? (
                <Homepage
                  user={user}
                  setLoginUser={setLoginUser}
                  logout={handleLogout}
                />
              ) : (
                <MainPageComponent
                  setLoginUser={setLoginUser}
                  selected_page={"login"}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              <MainPageComponent
                setLoginUser={setLoginUser}
                selected_page={"login"}
              />
            }
          />
          <Route
            path="/register"
            element={
              <MainPageComponent
                setLoginUser={setLoginUser}
                selected_page={"register"}
              />
            }
          />
          <Route
            path="/uploadVideo"
            element={<UploadProductComponent user={user} />}
          />
          <Route path="/profile" element={<ProfileComponent user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;