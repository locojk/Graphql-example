import Database from 'better-sqlite3';

// Initialize SQLite Database
const db = new Database('database.sqlite', { verbose: console.log });

// Create Tables If Not Exists
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    release_year INTEGER
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER,
    content TEXT NOT NULL,
    FOREIGN KEY(movie_id) REFERENCES movies(id)
  );
`);

// Insert Default Data If Tables Are Empty
function seedDatabase() {
  // Check if `users` table is empty
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  if (userCount === 0) {
    console.log('Seeding users table...');
    const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const users = [
      ['Alice', 'alice@example.com'],
      ['Bob', 'bob@example.com'],
      ['Charlie', 'charlie@example.com'],
      ['David', 'david@example.com'],
      ['Emma', 'emma@example.com'],
    ];
    users.forEach(user => insertUser.run(...user));
  }

  // Check if `movies` table is empty
  const movieCount = db.prepare('SELECT COUNT(*) AS count FROM movies').get().count;
  if (movieCount === 0) {
    console.log('Seeding movies table...');
    const insertMovie = db.prepare('INSERT INTO movies (title, release_year) VALUES (?, ?)');
    const movies = [
      ['Inception', 2010],
      ['The Matrix', 1999],
      ['Interstellar', 2014],
      ['The Dark Knight', 2008],
      ['Fight Club', 1999],
    ];
    movies.forEach(movie => insertMovie.run(...movie));
  }

  // Check if `comments` table is empty
  const commentCount = db.prepare('SELECT COUNT(*) AS count FROM comments').get().count;
  if (commentCount === 0) {
    console.log('Seeding comments table...');
    const insertComment = db.prepare('INSERT INTO comments (movie_id, content) VALUES (?, ?)');
    const comments = [
      [1, 'Amazing movie!'],
      [2, 'This changed my perspective!'],
      [3, 'Incredible visuals and story.'],
      [4, 'Best Batman movie ever!'],
      [5, 'A true cult classic.'],
    ];
    comments.forEach(comment => insertComment.run(...comment));
  }
}

// Run Seed Function to Insert Data If Necessary
seedDatabase();

// Export a function that returns the raw `db` instance
export function setupDatabase() {
  // Your GraphQL resolvers can call db.prepare(...) directly
  return db;
}


