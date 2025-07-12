// src/shared/FilterForm.tsx
import React, { useState } from 'react';

export default function FilterForm({ onStart }) {
  const [filters, setFilters] = useState({ difficulty: 'All', season: 'All', character: 'All', questionCount: 5 });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onStart(filters);
      }}
    >
      <label>Difficulty:</label>
      <select name="difficulty" value={filters.difficulty} onChange={handleChange}>
        <option>All</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <label>Season:</label>
      <select name="season" value={filters.season} onChange={handleChange}>
        <option>All</option>
        {[...Array(10)].map((_, i) => (
          <option key={i}>S{i + 1}</option>
        ))}
      </select>

      <label>Character:</label>
      <select name="character" value={filters.character} onChange={handleChange}>
        <option>All</option>
        <option>Ross</option>
        <option>Rachel</option>
        <option>Monica</option>
        <option>Chandler</option>
        <option>Joey</option>
        <option>Phoebe</option>
      </select>

      <button type="submit">Start Quiz</button>
    </form>
  );
}
