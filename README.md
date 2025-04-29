# Lyrics Finder

A React application that helps users find song lyrics by searching for artist and song title.

## Project Structure

```
lyrics-finder/
├── public/
│   ├── icons/
│   │   └── music-icon.png
│   │   
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── logo.png
│   │       └── logo.svg
│   │   
│   ├── components/
│   │   ├── HelpModal/
│   │   │   ├── HelpModal.js
│   │   │   └── HelpModal.css
│   │   └── LyricsForm/
│   │       ├── LyricsForm.js
│   │       └── LyricsForm.css
│   │   
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
└── package-lock.json
```

## Features

- Search for song lyrics by artist and song title
- Clean and modern user interface
- Helpful modal with usage instructions
- Responsive design for all screen sizes

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lyrics-finder.git
cd lyrics-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## API

This project uses the [lyrics.ovh](https://lyrics.ovh/) API to fetch song lyrics.

## Technologies Used

- React
- CSS3
- lyrics.ovh API

## Project Organization

- `components/`: Contains all React components, each in its own directory with associated styles
- `assets/`: Contains all static assets like images
- `public/`: Contains public assets and icons
- Root level files contain main application logic and configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## 📸 Preview

![Lyrics Finder Screenshot](/readme_imgs/image.png)  

![Lyrics Finder Demo](/readme_imgs/test.gif)



