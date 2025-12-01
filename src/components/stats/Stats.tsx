export function Stats() {
  return (
    <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto text-center">
      <div>
        <p className="text-3xl font-bold text-green-600">10K+</p>
        <p className="text-sm text-gray-600">Active Users</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-blue-600">50K+</p>
        <p className="text-sm text-gray-600">Trips Completed</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-purple-600">4.8★</p>
        <p className="text-sm text-gray-600">Average Rating</p>
      </div>
    </div>
  );
}
