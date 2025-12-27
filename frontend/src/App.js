import { useEffect, useState } from "react";

const API = "http://localhost:3000/users";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(API)
        .then(res => res.json())
        .then(setUsers);
  }, []);

  const addUser = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    })
        .then(res => res.json())
        .then(user => {
          setUsers([...users, user]);
          setName("");
          setEmail("");
        });
  };

  const deleteUser = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(() => setUsers(users.filter(u => u.id !== id)));
  };

  const updateUser = (id) => {
    const newName = prompt("New name:");
    fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    }).then(() =>
        setUsers(users.map(u => u.id === id ? { ...u, name: newName } : u))
    );
  };

  return (
      <div style={{ padding: 20 }}>
        <h2>Users</h2>

        <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Add</button>

        <ul>
          {users.map(u => (
              <li key={u.id}>
                {u.name} ({u.email})
                <button onClick={() => updateUser(u.id)}>Edit</button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
