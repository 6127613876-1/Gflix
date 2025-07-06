// src/components/Logout.jsx
import { auth, signOut } from '../firebase';

const Logout = () => (
  <button
    onClick={() => signOut(auth)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
  >
    Logout
  </button>
);

export default Logout;
