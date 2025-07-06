// src/pages/Signup.jsx
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
      <button type="submit" className="btn bg-pink-500 text-white w-full mt-4">Signup</button>
    </form>
  );
};

export default Signup;
