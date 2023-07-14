import React, { useState, ChangeEvent, FormEvent } from 'react';
import { makeApiRequest } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = () => {
  const [url, setUrl] = useState('');
  const [length, setLength] = useState(100);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { htmlContent } = await makeApiRequest(url, length, language);
      setSummary(htmlContent);
    } catch (error) {
      setError('Failed to fetch the summary. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center p-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="urlInput">URL:</label>
          <input
            type="text"
            id="urlInput"
            className="form-control"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="lengthInput">Summarization Length:</label>
          <input
            type="number"
            id="lengthInput"
            className="form-control"
            value={length}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLength(Number(e.target.value))
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="languageSelect">Language Choice:</label>
          <select
            id="languageSelect"
            className="form-control"
            value={language}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setLanguage(e.target.value)
            }
            required
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="zh">Chinese</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="pa">Punjabi</option>
            <option value="de">German</option>
            {/* Add other language options */}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <div className="mt-4">
        {error && (
          <div className="border border-danger p-3">
            <p className="text-danger">{error}</p>
          </div>
        )}
        {summary && (
          <div className="border p-3">
            <h2>Summary</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
