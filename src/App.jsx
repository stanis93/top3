import React, { useState, useEffect } from 'react';

// Placeholder data structure for demonstration
const placeholderData = {
  Cetinje: {
    streetFood: [
      {
        name: 'Burek',
        description: 'Flaky phyllo pastry with meat, cheese or spinach.',
        where: 'Bakeries around the city centre',
        image: 'https://via.placeholder.com/300x200?text=Burek'
      },
      {
        name: 'Njeguški pršut & Cheese',
        description: 'Smoked ham and cheese slices from local producers.',
        where: 'Local markets and deli shops',
        image: 'https://via.placeholder.com/300x200?text=Prsut'
      },
      {
        name: 'Ćevapi',
        description: 'Grilled minced-meat sausages served with flatbread.',
        where: 'Street vendors in the main square',
        image: 'https://via.placeholder.com/300x200?text=Cevapi'
      }
    ],
    restaurants: [
      {
        name: 'Restaurant Kole',
        description: 'Traditional Montenegrin dishes in generous portions.',
        where: '11 Njegoševa',
        image: 'https://via.placeholder.com/300x200?text=Kole'
      },
      {
        name: 'Gradska Kafana',
        description: 'Modern twists on local classics.',
        where: 'Main pedestrian street',
        image: 'https://via.placeholder.com/300x200?text=Gradska'
      },
      {
        name: 'Belveder Nacionalni Restoran',
        description: 'Authentic cuisine with panoramic views.',
        where: 'Belveder hill',
        image: 'https://via.placeholder.com/300x200?text=Belveder'
      }
    ],
    attractions: [
      {
        name: 'Lipa Cave',
        description: 'Underground cave system with dramatic stalactites.',
        where: 'Lipa Dobrska',
        image: 'https://via.placeholder.com/300x200?text=Lipa+Cave'
      },
      {
        name: 'Cetinje Green Market',
        description: 'Weekly farmer market with fresh local produce.',
        where: 'Central market square',
        image: 'https://via.placeholder.com/300x200?text=Market'
      },
      {
        name: 'Blue Palace',
        description: 'Presidential residence with quiet gardens.',
        where: 'Cetinje centre',
        image: 'https://via.placeholder.com/300x200?text=Blue+Palace'
      }
    ]
  }
};

const categories = {
  streetFood: { label: 'Street Food', title: 'Top 3 Street Food' },
  restaurants: { label: 'Restaurants', title: 'Top 3 Famous Restaurants' },
  attractions: { label: 'Attractions', title: 'Top 3 Places to Visit' }
};

function App() {
  const [query, setQuery] = useState('Cetinje');
  const [cityData, setCityData] = useState(null);
  const [category, setCategory] = useState('streetFood');

  useEffect(() => {
    // In a real app, fetch from API: /api/cities?name=<query>
    const normalized = query.trim().toLowerCase();
    const match = Object.keys(placeholderData).find(
      key => key.toLowerCase() === normalized
    );
    const data = match ? placeholderData[match] : null;
    setCityData(data);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <header className="text-center mb-8 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Choose Local Over Tourist Traps</h1>
        <div className="relative mx-auto w-full max-w-xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-full shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="w-full max-w-xs">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-full shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
          >
            {Object.entries(categories).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full">
        {cityData ? (
          <CategorySection title={categories[category].title} items={cityData[category]} />
        ) : (
          <p className="text-center text-gray-500">No data found for "{query}".</p>
        )}
      </main>
    </div>
  );
}

function ResultCard({ item }) {
  return (
    <div className="bg-white w-80 p-6 rounded-lg shadow-lg animate-fadeIn">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-bold text-xl mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <p className="text-sm text-gray-500 mb-4">Where to see: {item.where}</p>
      <div className="flex justify-center space-x-4">
        <button className="text-2xl hover:scale-110 transition-transform">👍</button>
        <button className="text-2xl hover:scale-110 transition-transform">👎</button>
      </div>
    </div>
  );
}

function CategorySection({ title, items }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);

  const item = items[index];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      <div className="relative flex items-center justify-center">
        <button
          onClick={prev}
          className="absolute left-0 p-2 text-3xl select-none"
          aria-label="Previous"
        >
          &#10094;
        </button>
        <ResultCard item={item} />
        <button
          onClick={next}
          className="absolute right-0 p-2 text-3xl select-none"
          aria-label="Next"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default App;
