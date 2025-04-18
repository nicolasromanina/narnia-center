import { useState } from "react";

// pages/donate.jsx
export default function DonatePage() {
    const [amount, setAmount] = useState(50);
    const [frequency, setFrequency] = useState('once');
  
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="py-20 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Make an Impact</h1>
            <p className="text-xl mb-8">Your donation changes lives</p>
          </div>
        </section>
  
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-lg font-medium mb-4">Donation Amount</label>
                <div className="grid grid-cols-3 gap-4">
                  {[25, 50, 100, 250, 500].map((value) => (
                    <button
                      key={value}
                      onClick={() => setAmount(value)}
                      className={`p-4 rounded-xl ${
                        amount === value 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      ${value}
                    </button>
                  ))}
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-4 rounded-xl bg-gray-100 col-span-3"
                    placeholder="Custom amount"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-4">Frequency</label>
                <div className="space-y-2">
                  {['once', 'monthly', 'yearly'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFrequency(option)}
                      className={`w-full p-4 rounded-xl text-left ${
                        frequency === option
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
  
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-4 rounded-xl border border-gray-200"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="p-4 rounded-xl border border-gray-200"
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="p-4 rounded-xl border border-gray-200"
                />
              </div>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700">
                Donate ${amount} {frequency !== 'once' && `per ${frequency}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }