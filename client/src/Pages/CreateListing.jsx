export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-semibold text-center my-5 uppercase  underline">
        create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-5 p-3">
        <div className="flex flex-col gap-3 flex-1 ">
          <input
            type="text"
            placeholder="Name"
            maxLength="64"
            minLength="10"
            id="name"
            required
            className="p-3 outline-none rounded-lg "
          />
          <textarea
            required
            className="p-3 rounded-lg resize-none outline-none "
            placeholder="Description"
            id="description"
            maxLength="64"
            minLength="10"
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-3 rounded-lg outline-none"
            maxLength="64"
            minLength="10"
          />
          <div className="flex  gap-4 items-center flex-wrap p-3 ">
            <div className="flex gap-3 items-center font-semibold text-slate-500">
              <input type="checkbox" id="sell" className="w-4 h-4" />
              <span>Sell</span>
            </div>

            <div className="flex gap-3 font-semibold text-slate-500 items-center">
              <input type="checkbox" id="rent" className="w-4 h-4" />
              <span>Rent</span>
            </div>

            <div className="flex gap-3 font-semibold text-slate-500 items-center">
              <input type="checkbox" id="parking" className="w-4 h-4" />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-3 font-semibold text-slate-500 ">
              <input type="checkbox" id="furnished" className="w-4 h-4" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-3 font-semibold text-slate-500">
              <input type="checkbox" id="offer" className="w-4 h-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="beds"
                min="1"
                max="10"
                required
                className="p-2 border rounded-lg border-slate-300 outline-none "
              />
              <span className="font-semibold text-lg text-slate-500">Beds</span>
            </div>

            <div className="flex gap-4 items-center ">
              <input
                type="number"
                id="baths"
                min="1"
                max="10"
                required
                className="p-2 border rounded-lg border-slate-300 outline-none "
              />
              <span className="font-semibold  text-slate-500">Baths</span>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
                className="p-3 rounded-lg outline-none  "
              />
              <div className="font-semibold text-slate-500">
                <p>Regular price</p>
                <span className="ml-5 text-xs">($/month)</span>
              </div>
            </div>

            <div className="flex gap-4 ">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 outline-none border border-slate-300 rounded-lg "
                id="discountprice"
              />
              <div>
                <p className="font-semibold text-slate-500">Discount Price</p>
                <span className="ml-5 text-xs text-slate-500">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex  gap-3">
            <p className="font-semibold">Image:</p>
            <span className="text-slate-500">
              This first image will be the cover (max 6)
            </span>
          </div>
          <div className="flex gap-5">
            <input
              id="images"
              accept="images/*"
              type="file"
              className="p-3 border border-slate-500"
            />
            <button className="p-3 border text-green-700 border-green-500">
              Upload
            </button>
          </div>
          <button className="bg-slate-700  p-3 rounded-lg text-white text-lg uppercase hover:opacity-90 ">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
