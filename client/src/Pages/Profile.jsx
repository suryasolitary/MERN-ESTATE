import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  UpdateuserStart,
  UpdateuserSuccess,
  UpdateuserFailure,
  DeletedUserStart,
  DeletedUserSuccess,
  DeletedUserFailure,
  SignoutUserStart,
  SignoutUserSuccess,
  SignoutUserFailure,
} from "../Redux/user/userSlice.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  //const navigation = useNavigate();
  const { currentuser, Loading, Error } = useSelector((state) => state.user);
  //console.log(currentuser);
  //console.log(currentuser.profilePic);
  const dispatch = useDispatch();
  const [file, setfile] = useState(undefined);
  const [filePercentage, setfilePercentage] = useState(0);
  const [formData, setformData] = useState({});
  const [fileUploadError, setfileUploadError] = useState(false);
  const [uploadFile, setuploadFile] = useState(false);
  const fileRef = useRef(null);
  //console.log(formData);

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

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(UpdateuserStart());
      const response = await fetch(`/api/user/update/${currentuser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        dispatch(UpdateuserFailure(data.errMessage));
        return;
      }
      setuploadFile(true);
      dispatch(UpdateuserSuccess(data));
    } catch (err) {
      dispatch(UpdateuserFailure(err));
    }
  };

  const handleDelete = async () => {
    dispatch(DeletedUserStart());
    try {
      const response = await fetch(`api/user/delete/${currentuser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        dispatch(DeletedUserFailure(data.errMessage));
      }
      dispatch(DeletedUserSuccess(data));
    } catch (Error) {
      dispatch(DeletedUserFailure(Error.message));
    }
  };

  const handleSignOut = async () => {
    dispatch(SignoutUserStart());
    try {
      const response = await fetch("/api/auth/signout");
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        dispatch(SignoutUserFailure(data.errMessage));
      }
      dispatch(SignoutUserSuccess(data));
    } catch (err) {
      dispatch(SignoutUserFailure(err.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl uppercase font-semibold text-center p-3 my-2">
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-3">
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
          defaultValue={currentuser.username}
          className=" p-3 rounded-lg outline-none text-lg"
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentuser.email}
          className=" p-3 rounded-lg outline-none text-lg"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-3 rounded-lg outline-none text-lg"
        />
        <button
          disabled={Loading}
          className="bg-slate-700 text-white p-3 text-lg rounded-lg disabled:opacity-85 hover:opacity-95 cursor-pointer uppercase "
        >
          {Loading ? `Loading...` : "Update"}
        </button>
        <Link
          className=" bg-green-700 text-white p-3 text-lg font-semibold text-center rounded-lg hover:opacity-90 uppercase"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between">
        <p
          onClick={handleDelete}
          className="text-lg text-red-700 font-semibold cursor-pointer"
        >
          Delete Account{" "}
        </p>
        <span
          onClick={handleSignOut}
          className="text-lg text-red-700 font-semibold cursor-pointer"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 font-semibold text-lg">{Error ? Error : ""}</p>
      <p className=" text-green-500 font-semibold text-lg text-center my-3 ">
        {uploadFile ? `User updated SuccessFull...` : ""}
      </p>
    </div>
  );
}
