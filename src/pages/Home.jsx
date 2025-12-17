import React from "react";
import { useNavigate } from "react-router-dom";
import Img from '../assets/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg'
// Sample slider images


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans">

      {/* Hero / Banner Section */}
<div className="relative w-full h-[500px]">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${Img})` }}
  ></div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/60 to-black/30"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
      Save Lives, Donate Blood
    </h1>
    <p className="max-w-xl mb-8 text-lg text-gray-200">
      A single donation can save up to three lives. Be a hero today.
    </p>
    <div className="flex gap-4">
      <button
        onClick={() => navigate("/register")}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
      >
        Join as a Donor
      </button>
      <button
        onClick={() => navigate("/search")}
        className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
      >
        Search Donors
      </button>
    </div>
  </div>
</div>



      {/* Featured Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Donate Blood?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-4">Save Lives</h3>
            <p>One blood donation can save up to three lives.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-4">Healthy Practice</h3>
            <p>Donating blood is safe and helps your body stay healthy.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-4">Community Impact</h3>
            <p>Support your community by helping patients in need.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold text-white transition"
            >
              Send Message
            </button>
          </form>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="mb-4">+880 123 456 789</p>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>support@blooddonate.com</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-4">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-xl mb-2">BloodDonate</h3>
            <p>Helping you save lives, one donation at a time.</p>
          </div>
          <div className="flex gap-8">
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul>
                <li>Home</li>
                <li>Register</li>
                <li>Search Donors</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul>
                <li>About Blood Donation</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center mt-8">&copy; 2025 BloodDonate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
