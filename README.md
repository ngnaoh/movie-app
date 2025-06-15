# Movie Explorer

A modern web application for exploring and discovering movies using The Movie Database (TMDB) API.

## Features

## User Stories

The following **required** functionality is completed:

- [x] User can view a list of movies currently playing in theaters. Poster images load asynchronously.
- [x] Add a tab bar for **Now Playing** and **Top Rated** movies.
- [x] Add a search bar.
- [x] User can view movie details by tapping on a cell.
- [x] User sees loading state while waiting for the API.
- [x] User sees an error message when there is a network error.
- [x] Simple responsive.

The following **optional** features are implemented:

- [x] Implement segmented control to switch between list view and grid view.
- [x] All images fade in.
- [x] Implement lazy load image.
- [x] Customize the highlight and selection effect of the cell.
- [x] Improve UX loading by skeleton loading.
- [x] Enhance responsive.

The following **additional** features are implemented:

- [x] Toggle theme
- [x] Preview trailer when hover video
- [x] User can see the trailer and streaming provider in movie detail
- [x] Optimize performance by caching large data

## Requirements

- Please use ReactJS with typescript
- Please use SCSS
- Please do not use any CSS/SCSS framework or UI library

## Video Walkthrough

https://drive.google.com/drive/folders/1nE23vNCZjxn_xsxkrVdgqMTEEz_RbhoB?usp=sharing

## Setup

1. Clone the repository

   ```
   git clone https://github.com/ngnaoh/movie-app.git
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the root directory and add your TMDB API key:

   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

   You can get an API key by signing up at [TMDB](https://www.themoviedb.org/documentation/api)

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Technologies Used

- React
- TypeScript
- Vite
- TMDB API
- SCSS

## Project Structure

```
src/
  ├── components/
  │   ├── MovieCard.tsx
  │   ├── MovieList.tsx
  │   └── SearchBar.tsx
  ├── types.ts
  ├── App.tsx
  └── App.css
```

## Contributing

Feel free to submit issues and enhancement requests!

# movie-app
# movie-app
