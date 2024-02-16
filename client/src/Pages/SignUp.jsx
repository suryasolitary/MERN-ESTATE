import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setformData] = useState({});
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      navigation("/signin");
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-center text-3xl font-bold underline my-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-5 ">
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="bg-slate-100 p-3 text-lg rounded-lg outline-none hover:outline-blue-500"
        />
        <input
          required
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="bg-slate-100 p-3 text-lg rounded-lg outline-none hover:outline-blue-500"
        />
        <input
          required
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="bg-slate-100 p-3 text-lg rounded-lg outline-none hover:outline-blue-500"
        />
        <button className="bg-slate-700 p-3 text-white text-lg uppercase font-semibold rounded-lg hover:opacity-95 disabled:opacity-85">
          {Loading ? `Loading...` : `Sign Up`}
        </button>
      </form>
      <div className="flex gap-5 text-lg mt-5 font-semibold">
        <p>Have an Account ? </p>
        <Link to="/signin">
          <span className="text-blue-500 hover:underline cursor-pointer">
            Sign In
          </span>
        </Link>
      </div>
      {Error && <p className="text-red-500 text-lg font-semibold">{Error}</p>}
    </div>
  );
}
