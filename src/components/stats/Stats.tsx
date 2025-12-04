import { IoStarSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
export function Stats() {
  return (
    <div className="grid grid-cols-3 gap-8 mb-15 max-w-2xl mx-auto text-center">
      <div>
        <p className="text-3xl font-bold text-green-600 flex items-center justify-center">
          <span>10K</span>
          <FaPlus />
        </p>
        <p className="text-sm text-gray-600">Active Users</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-blue-600 flex items-center justify-center">
          
          <span>50K</span>
          <FaPlus />
        </p>
        <p className="text-sm text-gray-600">Trips Completed</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-purple-600 flex items-center justify-center">
          <span>4.8</span>
          <IoStarSharp />
        </p>
        <p className="text-sm text-gray-600">Average Rating</p>
      </div>
    </div>
  );
}
