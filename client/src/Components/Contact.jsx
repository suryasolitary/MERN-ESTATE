import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useSelector } from "react-redux";

export default function Contact({ formData }) {
  const [LandDetails, setLandDetails] = useState(null);
  console.log(LandDetails);
  const [message, setmessage] = useState("");

  //const { currentuser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${formData.userRef}`);
        const data = await response.json();
        if (data.errMessage === false) {
          return;
        }
        setLandDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [formData.userRef]);

  const handleChange = (e) => {
    setmessage(e.target.value);
  };

  return (
    <>
      {LandDetails && (
        <div className="text-lg text-slate-700 mt-3 flex flex-col gap-3 ">
          <p>
            Contact{" "}
            <span className="text-xl font-semibold text-slate-900">
              {LandDetails.username}
            </span>{" "}
            for{" "}
            <span className="text-xl font-semibold text-slate-900">
              {formData.name.toLowerCase()}
            </span>{" "}
          </p>
          <textarea
            className="w-full rounded-lg resize-none h-20 p-3 outline-none "
            name="message"
            id="message"
            placeholder="Enter Your Message here..."
            onChange={handleChange}
            value={message}
          ></textarea>
          <Link
            to={`mailto:${LandDetails.email}?subject=Regarding${formData.name}&body=${message} `}
            className="text-center bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
