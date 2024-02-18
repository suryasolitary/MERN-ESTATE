import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentuser } = useSelector((state) => state.user);
  const [file, setfile] = useState(undefined);
  const [filePercentage, setfilePercentage] = useState(0);
  const [formData, setformData] = useState({});
  const [fileUploadError, setfileUploadError] = useState(false);
  const fileRef = useRef(null);
  console.log(filePercentage);
  console.log(fileUploadError);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handlefileUpload(file);
    }
  }, [file]);

  const handlefileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(process);
        setfilePercentage(Math.round(process));
      },
      (error) => {
        setfileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
          setformData({ ...formData, profilePic: downloadurl });
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl uppercase font-semibold text-center p-3 my-3">
          Profile
        </h1>
        <img
          className=" rounded-full w-24 h-24 shadow-lg hover:cursor-pointer"
          src={formData.profilePic || currentuser.profilePic}
          onClick={() => fileRef.current.click()}
          alt="profile"
        />
        <p className="font-semibold text-lg my-2">
          {fileUploadError ? (
            <span className="text-red-700 ">{`upload image Error(must be lessthen 2MB )`}</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-500">{`Uploading image ${filePercentage} % `}</span>
          ) : filePercentage == 100 ? (
            <span className="text-green-800 ">{`Image uploading successfully!`}</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <form className="flex flex-col gap-4 my-5">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setfile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="username"
          value={currentuser.username}
          className=" p-3 rounded-lg outline-none text-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={currentuser.email}
          className=" p-3 rounded-lg outline-none text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-3 rounded-lg outline-none text-lg"
        />
        <button className="bg-slate-700 text-white p-3 text-lg rounded-lg hover:opacity-95 cursor-pointer uppercase ">
          update
        </button>
      </form>
      <div className="flex justify-between">
        <p className="text-lg text-red-700 font-semibold cursor-pointer">
          Delete Account{" "}
        </p>
        <span className="text-lg text-red-700 font-semibold cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}
