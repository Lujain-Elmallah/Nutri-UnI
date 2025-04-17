// src/pages/StudentDashboard.jsx
import { useState } from "react";
import { getWeekMenu } from "../api/meals";
import axios from "axios";
import StudentHeader from "../components/StudentHeader";
import { ChevronLeft } from "lucide-react";

const COUNTER_MAP = {
  D1: ["Mongolian", "Salad", "Japanese", "Grill"],
  D2: ["Subjects", "Flavors", "Grill", "Italian", "Vegan"],
  Marketplace: ["Chakra", "Los amigos", "Asiatic", "Pasta"],
};

const StudentDashboard = () => {
  const [selectedDiningHall, setSelectedDiningHall] = useState(null);
  const [availableCounters, setAvailableCounters] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [meals, setMeals] = useState([]);

  const handleDiningHallSelect = (hall) => {
    setSelectedDiningHall(hall);
    setAvailableCounters(COUNTER_MAP[hall]);
    setSelectedCounter(null);
    setMeals([]);
  };

  const handleCounterSelect = async (counter) => {
    setSelectedCounter(counter);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/meals/week-menu/filter`,
        {
          params: {
            dining_hall: selectedDiningHall,
            counter: counter,
          },
        }
      );
      setMeals(res.data);
    } catch (err) {
      console.error("Failed to fetch meals", err);
    }
  };

  const handleBackToDining = () => {
    setSelectedDiningHall(null);
    setSelectedCounter(null);
    setMeals([]);
  };

  return (
    <div className="px-6 py-4">
      <StudentHeader />
      <h1 className="text-2xl mt-8 mb-6">Hello,</h1>

      {!selectedDiningHall && (
        <div>
          <p className="mb-4 text-lg">Please select your dining hall:</p>
          <div className="space-y-4">
            {Object.keys(COUNTER_MAP).map((hall) => (
              <button
                key={hall}
                className="w-full bg-[#edf6f9] hover:bg-[#d9f0f5] p-4 rounded-full text-xl transition"
                onClick={() => handleDiningHallSelect(hall)}
              >
                {hall}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDiningHall && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBackToDining}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <p className="text-lg font-semibold text-gray-800">
              Counters at {selectedDiningHall}:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {availableCounters.map((counter) => (
              <button
                key={counter}
                className={`w-20 h-24 flex items-center justify-center flex-col rounded-full shadow-md transition ${
                  selectedCounter === counter
                    ? "bg-[#008B9E] text-white scale-105"
                    : "bg-[#eaf7f6] text-black hover:bg-[#d8efed]"
                }`}
                onClick={() => handleCounterSelect(counter)}
              >
                <span className="text-sm font-medium text-center">{counter}</span>
              </button>
            ))}
          </div>

          {selectedCounter && (
            <div>
              <p className="mb-4 text-xl font-semibold text-gray-700">
                Meals at {selectedCounter} ({selectedDiningHall})
              </p>

              {meals.length === 0 ? (
                <p className="text-gray-500 italic text-center">No meals at this counter currently.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="flex bg-[#eaf7f6] rounded-3xl p-4 items-center gap-6 shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={meal.food_info.item_photo_link}
                        alt={meal.food_info.item_name}
                        className="w-28 h-28 object-cover rounded-full border-4 border-white shadow"
                      />

                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-1">{meal.food_info.item_name}</h2>

                        <div className="flex gap-4 text-sm text-gray-700 mb-2">
                          {meal.food_info.veg && (
                            <div className="flex items-center gap-1">
                              <span className="w-3 h-3 bg-green-600 rounded-full inline-block" />
                              Vegetarian
                            </div>
                          )}
                          {meal.food_info.vegan && (
                            <div className="flex items-center gap-1">
                              <span className="w-3 h-3 bg-green-400 rounded-full inline-block" />
                              Vegan
                            </div>
                          )}
                        </div>

                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Allergens:</span>{" "}
                          {meal.food_info.allergens.length > 0
                            ? meal.food_info.allergens.join(", ")
                            : "None"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;


//earlier
// function StudentDashboard() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Student Dashboard</h1>
//       <p>Welcome student!</p>
//     </div>
//   );
// }

// export default StudentDashboard;
