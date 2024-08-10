// src/pages/index.tsx
import { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoDetails, setVideoDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoDetails = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get('/api/video-details', { params: { url } });
      setVideoDetails(response.data);
    } catch (err) {
      setError('Failed to fetch video details. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (!url) {
      setError('Please enter a YouTube URL.');
      return;
    }
    fetchVideoDetails();
  };

  const handleDownload = () => {
    if (!url) {
      setError('Please enter a YouTube URL.');
      return;
    }
    window.open(`/api/download?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="container">
      <header>
        <h1>YouTube Video Downloader</h1>
      </header>
      <main>
        <div className="input-group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
          />
          <button onClick={handlePreview} disabled={loading}>
            {loading ? 'Loading...' : 'Preview Video'}
          </button>
        </div>
        {loading && <div className="loader"></div>}
        {error && <p className="error">{error}</p>}
        {videoDetails && !loading && (
          <div className="video-preview">
            <img src={videoDetails.thumbnail} alt={videoDetails.title} />
            <h2>{videoDetails.title}</h2>
            <p>Duration: {videoDetails.duration}</p>
            <p>Views: {videoDetails.views}</p>
            <p>Likes: {videoDetails.likes}</p>
            <video controls width="100%">
              <source src={videoDetails.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={handleDownload} disabled={loading}>
              {loading ? 'Downloading...' : 'Download Video'}
            </button>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default Home;
