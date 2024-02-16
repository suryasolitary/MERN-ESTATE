import { useState } from "react";

export default function SignIn() {
  const [formData, setformData] = useState({});
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  //console.log(formData);
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success == false) {
        setLoading(false);
        setError(data.errMessage);
        return;
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl text-center p-3 font-semibold my-6 underline">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <input
          type="email"
          required
          id="email"
          onChange={handleChange}
          placeholder="Email"
          className="bg-slate 200 p-3 rounded-lg text-lg outline-none hover:outline-blue-500"
        />
        <input
          type="password"
          required
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="bg-slate 200 p-3 rounded-lg text-lg outline-none hover:outline-blue-500"
        />
        <button className="bg-slate-700 p-3 text-white font-semibold text-xl rounded-lg hover:opacity-95 disabled:opacity-85 uppercase">
          {Loading ? `Loading...` : `Sign In`}
        </button>
      </form>
      <div className="mt-5 flex  gap-5 text-lg font-semibold">
        <p>Don't have an Account?</p>
        <span className="text-blue-500 hover:underline cursor-pointer">
          Sign up
        </span>
      </div>
      {Error && (
        <p className="text-lg font-semibold text-red-500 mt-4">{Error}</p>
      )}
    </div>
  );
}
