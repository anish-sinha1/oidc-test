import "./App.css";
import UserService from "./keycloak";

function App() {
  return (
    <div className="App">
      {UserService.isLoggedIn() ? (
        <>
          <h1>Hello {UserService.getUsername()}</h1>
          <button onClick={() => UserService.doLogout()}>Logout</button>
        </>
      ) : (
        <button onClick={() => UserService.doLogin()}>Login</button>
      )}
    </div>
  );
}

export default App;
