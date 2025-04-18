import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage("");

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Successfully subscribed!");
        setEmail("");
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Failed to connect to server.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Narnia Center Description */}
          <div>
            <h3 className="text-xl font-bold mb-4">Narnia Center</h3>
            <p className="text-gray-400">
              "If you want to change the world, let God change you first"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/activities" className="text-gray-400 hover:text-white">Activities</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
              <li><Link to="/mission" className="text-gray-400 hover:text-white">Mission & Vision</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-gray-400">+261 38 43 714 74</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span className="text-gray-400">contact@narniacenter.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-gray-400">123 Tsiadana, Antananarivo Madagascar</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <form className="flex flex-col sm:flex-row items-center" onSubmit={handleSubmit}>
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2 mb-4 sm:mb-0 sm:mr-2 text-gray-900 rounded"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
            {message && <p className="mt-2 text-sm text-gray-300">{message}</p>}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-4">
          <a href="https://www.facebook.com/yourpage" aria-label="Facebook" className="text-gray-400 hover:text-white">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com/yourprofile" aria-label="Instagram" className="text-gray-400 hover:text-white">
            <Instagram className="h-6 w-6" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Narnia Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
