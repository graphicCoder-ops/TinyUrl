import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './App.css';
import API from './config';

const App = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const onBtnClick = async () => {
    setShowCopyMessage(false);
    try {
      const response = await fetch( `${API}api/linkgenerator`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ longURL: longUrl }),
      });
      const json = await response.json();
      const short = `${API}${json.short}`;
      setShortUrl(short);
    } catch (err) {
      console.error('Error generating short URL:', err);
    }
  };

  const onCopyClicked = () => {
    navigator.clipboard.writeText(shortUrl);
    setShowCopyMessage(true);
  };

  return (
    <div className="maindiv">
      <div className="container1">
        <input
          type="text"
          id="urlText"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={onBtnClick}>Convert URL</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '0.6rem', alignItems: 'center' }}>
        <div className="mono">Your Short URL: </div>
        {showCopyMessage && (
          <div id="ptag" style={{ display: 'block' }}>
            link Copied to Clipboard!
          </div>
        )}
      </div>
      <div className="copyurl">
        <a id="displayURL" href={shortUrl}>{shortUrl || 'http://127.0.0.1:5500/static/main.htm'}</a>
        <i id="copyicon" className='bx bx-copy' onClick={onCopyClicked}></i>
      </div>
    </div>
  );
};

export default App;
