import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [movie, setMovie] = useState({
    name: '',
    duration: '',
    genre: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setMovie((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', movie.name);
    formData.append('duration', movie.duration);
    formData.append('genre', movie.genre);
    formData.append('image', movie.image);

    try {
      const response = await axios.post('http://localhost:5000/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding movie', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-40 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Add Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-zinc-700 dark:text-zinc-200 mb-1">Movie Name</label>
          <input
            type="text"
            name="name"
            value={movie.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-200 mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-200 mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-200 mb-1">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-500 file:text-white hover:file:bg-pink-600 dark:file:bg-pink-600 dark:hover:file:bg-pink-700"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg transition"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
