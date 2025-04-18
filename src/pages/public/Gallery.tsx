// pages/gallery.jsx
export default function GalleryPage() {
    const categories = ['All', 'Events', 'Community', 'Projects'];
    const [selectedCategory, setSelectedCategory] = useState('All');
  
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Gallery</h1>
            <p className="text-xl">Visual stories of impact and community</p>
          </div>
        </section>
  
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
  
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {[1,2,3,4,5,6,7,8,9].map((item) => (
              <div key={item} className="mb-8 break-inside-avoid">
                <img
                  src={`/gallery-${item}.jpg`}
                  className="rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  alt={`Gallery item ${item}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

function useState(_arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}
