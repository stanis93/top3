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

function App() {
  const [query, setQuery] = useState('Cetinje');
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    // In a real app, fetch from API: /api/cities?name=<query>
    const data = placeholderData[query];
    setCityData(data || null);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Local Over Tourist Traps</h1>
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded shadow"
        />
      </header>

      <main className="max-w-4xl mx-auto">
        {cityData ? (
          <>
            <CategorySection title="Top 3 Street Food" items={cityData.streetFood} />
            <CategorySection title="Top 3 Famous Restaurants" items={cityData.restaurants} />
            <CategorySection title="Top 3 Places to Visit" items={cityData.attractions} />
          </>
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
          <li key={item.name} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;