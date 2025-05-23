import React, { useEffect, useState } from "react";
import "../css/Recommendations.css";

export default function Recommendations() {
  const [moodScore, setMoodScore] = useState(null);
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map mood score to category
  const getMoodCategory = (score) => {
    if (score >= 4) return "happy";
    if (score >= 3) return "neutral";
    if (score >= 1) return "stressed";
    return "neutral";
  };

  const moodToGenres = {
    happy: { movie: "35", book: "fiction" }, // Comedy
    neutral: { movie: "18", book: "drama" }, // Drama
    stressed: { movie: "16", book: "self-help" }, // Animation or self-help
  };

  useEffect(() => {
    const fetchMood = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/mood/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // Calculate collective score
      const moodLevels = { happy: 5, calm: 4, neutral: 3, stressed: 2, sad: 1 };
      const scores = data.map((d) => moodLevels[d.mood.toLowerCase()] || 3);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      setMoodScore(avg);

      const category = getMoodCategory(avg);
      await fetchMovies(moodToGenres[category].movie);
      await fetchBooks(moodToGenres[category].book);
      setLoading(false);
    };

    const fetchMovies = async (genreId) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=29f5163897d8224edd74a511f207f37a&with_genres=${genreId}`
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 5)); // top 5
    };

    const fetchBooks = async (query) => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      );
      const data = await res.json();
      setBooks(data.items || []);
    };

    fetchMood();
  }, []);

  if (loading) return <p>Loading recommendations...</p>;

  return (
    <div className="recommendations-page">
      <h2>Recommended for You</h2>
      <p>Your collective mood is: <strong>{getMoodCategory(moodScore).toUpperCase()}</strong></p>

      <div className="recommendations-container">
        <div className="movies-section">
          <h3>🎬 Movies</h3>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <div>
                  <strong>{movie.title}</strong>
                  <p>{movie.overview.slice(0, 100)}...</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="books-section">
          <h3>📚 Books</h3>
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                <div>
                  <strong>{book.volumeInfo.title}</strong>
                  <p>{book.volumeInfo.description?.slice(0, 100) || "No description."}...</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
