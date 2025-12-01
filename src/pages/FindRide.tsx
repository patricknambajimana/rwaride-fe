import React from "react";

export const FindRide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-4 text-center">Find a Ride</h1>
        <p className="text-center text-gray-600 mb-10">
          Search for available rides by entering your pickup and destination.
        </p>

        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <div className="mb-4">
            <label className="font-medium text-sm">Pickup Location</label>
            <input
              type="text"
              placeholder="Example: Kigali, Remera"
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="font-medium text-sm">Destination</label>
            <input
              type="text"
              placeholder="Example: Musanze"
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
            Search Rides
          </button>
        </div>

        {/* Example Rides */}
        <div className="space-y-5">
          <div className="bg-white shadow rounded-lg p-5 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Kimironko → Downtown</h3>
              <p className="text-gray-500 text-sm">Departure: 8:30 AM</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Book
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-5 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Kicukiro → Nyamirambo</h3>
              <p className="text-gray-500 text-sm">Departure: 4:00 PM</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Book
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
