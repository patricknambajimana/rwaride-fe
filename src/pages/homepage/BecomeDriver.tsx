

export const BecomeDriver: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Become a Driver</h1>
        <p className="text-center text-gray-600 mb-10">
          Register as a driver and earn money by sharing your daily routes.
        </p>

        {/* Driver Registration Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <div className="mb-4">
            <label className="font-medium text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="font-medium text-sm">Vehicle Model</label>
            <input
              type="text"
              placeholder="Example: Toyota Corolla"
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="font-medium text-sm">License Plate</label>
            <input
              type="text"
              placeholder="Example: RAB 456 C"
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700">
            Register as Driver
          </button>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Easy Setup</h3>
            <p className="text-gray-600 text-sm">
              Register in minutes and start driving.
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Earn Daily</h3>
            <p className="text-gray-600 text-sm">
              Make money on every completed ride.
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Your Schedule</h3>
            <p className="text-gray-600 text-sm">
              Choose when you want to drive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
