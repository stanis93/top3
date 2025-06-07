import React, { useState, useEffect, useRef } from 'react';

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
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [cityData, setCityData] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!city) {
      setCityData(null);
      return;
    }
    const data = placeholderData[city] || null;
    setCityData(data);
  }, [city]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <header className="mb-8 w-full flex justify-center">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-lg font-bold">Top 3</span>
          <h1 className="text-3xl font-bold">Choose local by locals</h1>
        </div>
      </header>

      <div className="flex flex-col items-center w-full space-y-4 mb-8">
        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border-2 border-gray-300 rounded-full shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
        >
          <option value="">Select a city...</option>
          {Object.keys(placeholderData).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        {city && (
          <select
            value={category}
            onChange={e => {
              setCategory(e.target.value);
              sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full max-w-xs px-4 py-2 border-2 border-gray-300 rounded-full shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
          >
            <option value="">Select a category...</option>
            {Object.entries(categories).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        )}
      </div>

      <main ref={sectionRef} className="max-w-4xl mx-auto w-full">
        {cityData && category ? (
          <CategorySection title={categories[category].title} items={cityData[category]} />
        ) : city ? (
          <p className="text-center text-gray-500">Please choose a category.</p>
        ) : null}
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
