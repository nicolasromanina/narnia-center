import { useState, useEffect } from 'react';

export default function SubscribersList() {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  let copier = "Copy";

  useEffect(() => {
    const fetchSubscribers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/newsletter/subscribers');
        console.log("Statut de la réponse:", res.status);
        if (!res.ok) {
          throw new Error(`Erreur: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Données reçues:", data);
        setSubscribers(data.subscribers || []);
      } catch (err) {
        console.error("Erreur lors du fetch:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleCopyEmail = (email) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        copier = "Copied";
      }).catch(err => {
        alert('Erreur lors de la copie : ' + err.message);
      });
    } else {
      alert('Votre navigateur ne supporte pas l\'API Clipboard. Copiez manuellement : ' + email);
    }
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSubscribers = [...filteredSubscribers].sort((a, b) => {
    const emailA = a.email.toLowerCase();
    const emailB = b.email.toLowerCase();
    return sortAsc ? emailA.localeCompare(emailB) : emailB.localeCompare(emailA);
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des abonnés</h2>

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mr-2"></div>
          <p className="text-gray-600">Chargement en cours...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Erreur : {error}
        </div>
      )}

      {/* Barre de recherche et bouton de tri */}
      {!isLoading && !error && (
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <label htmlFor="search" className="sr-only">Rechercher un abonné</label>
            <input
              id="search"
              type="text"
              placeholder="Rechercher par email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Trier par {sortAsc ? 'Z à A' : 'A à Z'}
          </button>
        </div>
      )}

      {/* Liste des abonnés */}
      {!isLoading && !error && (
        <ul className="space-y-2">
          {sortedSubscribers.length > 0 ? (
            sortedSubscribers.map(sub => (
              <li
                key={sub._id}
                className="p-3 border border-gray-300 rounded flex justify-between items-center hover:bg-gray-100 transition"
              >
                <span className="truncate max-w-[70%]" title={sub.email}>
                  {sub.email}
                </span>
                <button
                  onClick={() => handleCopyEmail(sub.email)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  {copier}
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">
              {searchTerm
                ? 'Aucun abonné correspondant à la recherche'
                : 'Aucun abonné'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}