import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";

const CreateListing = () => {
  const [files, setfiles] = useState([]);
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [imageuploadError, setimageuploadError] = useState(false);
  const [uploading, setuploading] = useState(false);
  const { currentuser } = useSelector((state) => state.user);
  const [formData, setformData] = useState({
    imageUrl: [],
    name: "",
    description: "",
    address: "",
    type: "sell",
    Parking: true,
    furnished: false,
    offer: false,
    bedRooms: 1,
    bathRooms: 1,
    regularPrice: 50,
    discountPrice: 50,
  });
  //console.log(formData);

  // Image upload Functionality
  const handleimagesubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrl.length < 7) {
      setimageuploadError(false);
      setuploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(StoreImage(files[i]));
      }
      Promise.all(promises)
        .then((url) => {
          setformData({ ...formData, imageUrl: formData.imageUrl.concat(url) });
          setuploading(false);
        })
        .catch((err) => {
          setimageuploadError("you can upload imgage 2 MB ");
          setuploading(false);
        });
    } else {
      setimageuploadError("you can Upload 6 image per listing...");
      setuploading(false);
    }
  };

  const StoreImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const StorageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(StorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const process =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload file ${process} % done `);
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            resolve(downloadurl);
          });
        }
      );
    });
  };

  // Delete Functionality
  const handleDeleteClick = (index) => {
    setformData({
      ...formData,
      imageURl: formData.imageUrl.filter((_, i) => i !== index),
    });
  };

  // Create List Button Functionality
  const handleChange = (e) => {
    if (e.target.id == "sell" || e.target.id == "Rent") {
      setformData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "number"
    ) {
      setformData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    if (
      e.target.id === "Parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setformData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
  };

  // Createing list Submit Function Handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("api/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentuser._id,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success == false) {
        setLoading(false);
        setError(data.errMessage);
      }
      setLoading(false);
      setError(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div>
      <main className="max-w-4xl mx-auto p-3 ">
        <h1 className="font-semibold uppercase underline text-3xl text-center p-4 my-6 ">
          Create Listing
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row ">
          <div className="flex flex-col gap-4 flex-1 p-3">
            <input
              type="text"
              placeholder="Name"
              id="name"
              maxLength="64"
              minLength="10"
              required
              className="p-3 text-lg rounded-lg outline-none  "
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              required
              className="p-3 rounded-lg resize-none outline-none "
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              required
              id="address"
              className=" p-3 rounded-lg outline-none "
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap gap-6 font-semibold text-slate-500">
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="Rent"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.type === "Rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="Parking"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.Parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-5 text-slate-500 font-semibold">
              <div className="flex items-center gap-3 rounded-lg ">
                <input
                  type="number"
                  id="bedRooms"
                  className="p-3 w-20 h-10 outline-none rounded-lg"
                  min="1"
                  max="10"
                  onChange={handleChange}
                  value={formData.bedRooms}
                />
                <span>Beds</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="bathRooms"
                  className="p-3 w-20 h-10 outline-none 
                  rounded-lg  "
                  min="1"
                  max="10"
                  onChange={handleChange}
                  value={formData.bathRooms}
                />
                <span>Baths</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 font-semibold text-slate-500 items-center">
                <input
                  type="number"
                  id="regularPrice"
                  className="p-3 rounded-lg w-20 h-10"
                  onChange={handleChange}
                  min="50"
                  max="1000000"
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regualr Price</p>
                  <span className="text-sm my-1">($/month)</span>
                </div>
              </div>

              <div className="flex  gap-5 font-semibold text-slate-500 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  min="50"
                  max="1000000"
                  className="p-3 rounded-lg w-20 h-10"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span className="text-sm my-1">($/month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex gap-3">
              <h3 className="font-semibold ">Images:</h3>
              <p>The first image will be the cover (Max-6)</p>
            </div>
            <div className="flex  gap-3">
              <input
                type="file"
                accept="image/*"
                multiple
                id="images"
                onChange={(e) => setfiles(e.target.files)}
                className="p-3 border border-slate-300 w-full"
              />
              <button
                type="button"
                onClick={handleimagesubmit}
                className="border border-green-600 p-3 text-green-600 font-semibold "
              >
                {uploading ? `Uploading...` : `Upload`}
              </button>
            </div>
            <p className="text-red-700 font-semibold text-center">
              {imageuploadError && imageuploadError}
            </p>
            {formData.imageUrl.length > 0 &&
              formData.imageUrl.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between border p-3 border-3 border-slate-300"
                >
                  <img
                    src={url}
                    alt="list image"
                    className="w-30 h-20 rounded-lg object-contain "
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(index)}
                    className="bg-red-600 w-20 h-10 flex items-center justify-center self-center p-3 text-center rounded-lg  text-white uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button className="bg-slate-700  p-3 text-white text-xl uppercase  rounded-lg hover:opacity-95">
              {Loading ? `Creating...` : `create list`}
            </button>
            {Error && (
              <p className="text-red-600 text-sm font-semibold">{Error}</p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
