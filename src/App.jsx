import React, { useState, useEffect } from 'react';

// Placeholder data structure for demonstration
const placeholderData = {
  Cetinje: {
    streetFood: [
      { name: 'Burek', description: 'Flaky phyllo pastry with meat, cheese or spinach.' },
      { name: 'Njeguški pršut & Cheese', description: 'Smoked ham and cheese slices from local producers.' },
      { name: 'Ćevapi', description: 'Grilled minced-meat sausages served with flatbread.' }
    ],
    restaurants: [
      { name: 'Restaurant Kole', description: 'Traditional Montenegrin dishes in generous portions.' },
      { name: 'Gradska Kafana', description: 'Modern twists on local classics.' },
      { name: 'Belveder Nacionalni Restoran', description: 'Authentic cuisine with panoramic views.' }
    ],
    attractions: [
      { name: 'Lipa Cave', description: 'Underground cave system with dramatic stalactites.' },
      { name: 'Cetinje Green Market', description: 'Weekly farmer market with fresh local produce.' },
      { name: 'Blue Palace', description: 'Presidential residence with quiet gardens.' }
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

function CategorySection({ title, items }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <li
            key={item.name}
            className="bg-white p-4 rounded shadow transition transform duration-300 hover:scale-105 hover:shadow-lg animate-fadeIn"
          >
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
