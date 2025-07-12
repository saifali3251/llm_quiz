
// src/pages/HomePage.tsx
import React, { useState } from 'react';
import FilterForm from '../shared/FilterForm';
export default function HomePage({ onStart }) {
  return (
    <div className="home-page">
      <h1>Friends Trivia Quiz</h1>
      <FilterForm onStart={onStart} />
    </div>
  );
}