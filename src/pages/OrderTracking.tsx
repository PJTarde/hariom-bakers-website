import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for marker icons in React/Vite
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function OrderTracking() {
  const [showFeedback, setShowFeedback] = useState(false);
const [rating, setRating] = useState(0);
const [feedback, setFeedback] = useState("");
useEffect(() => {
  const timer = setTimeout(() => {
    setShowFeedback(true);
  }, 10000);

  return () => clearTimeout(timer);
}, []);

  const bakery: [number, number] = [19.8762, 75.3433];
  const rider: [number, number] = [19.8785, 75.3475];

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Order On The Way 🚴
      </h1>

      {/* Rider Information */}

      <div className="bg-white shadow-md p-4 rounded-lg mb-6">

        <p className="text-lg font-semibold">
          Rider: Rahul Patil
        </p>

        <p className="text-gray-600">
          Arriving in 18 minutes
        </p>

        <a
          href="tel:+919876543210"
          className="inline-block mt-3 bg-green-500 text-white px-4 py-2 rounded"
        >
          Call Rider
        </a>

      </div>

      {/* Map */}

      <MapContainer
        center={bakery}
        zoom={14}
        style={{ height: "400px", width: "100%" }}
      >

        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={bakery}>
          <Popup>Hariom Bakers</Popup>
        </Marker>

        <Marker position={rider}>
          <Popup>Delivery Rider</Popup>
        </Marker>

      </MapContainer>

      {/* Rating Section */}

      <div className="mt-8">

        <h2 className="text-xl font-semibold mb-2">
          Rate Delivery
        </h2>

        <div className="text-3xl cursor-pointer">
          ⭐ ⭐ ⭐ ⭐ ⭐
        </div>

      </div>

      {/* Contact Bakery */}

      <div className="mt-8">

        <h3 className="text-lg font-semibold">
          Need Help?
        </h3>

        <a
          href="tel:+918983344648"
          className="inline-block mt-3 bg-red-500 text-white px-4 py-2 rounded"
        >
          Contact Bakery
        </a>

      </div>
     {showFeedback && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg">

      <h2 className="text-xl font-semibold mb-4">
        Rate Your Delivery
      </h2>

      {/* Star Rating */}

      <div className="flex gap-2 text-3xl mb-4">
        {[1,2,3,4,5].map((star) => (
  <span
    key={star}
    onClick={() => setRating(star)}
    className={`cursor-pointer text-3xl ${
      rating >= star ? "text-yellow-500" : "text-gray-300"
    }`}
  >
    ★
  </span>
))}
      </div>

      {/* Feedback */}

      <textarea
        placeholder="Write your feedback..."
        value={feedback}
        onChange={(e)=>setFeedback(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm"
      />

      {/* Submit */}

      <button
        onClick={()=>{
          const oldReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

          const customerName = localStorage.getItem("customerName") || "Customer";

const newReview = {
  name: customerName,
  rating,
  feedback,
  date: new Date().toLocaleDateString()
};

          localStorage.setItem(
            "reviews",
            JSON.stringify([...oldReviews,newReview])
          );

          setShowFeedback(false);
        }}
        className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
      >
        Submit Feedback
      </button>

    </div>

  </div>
)}
    </div>
  );
}