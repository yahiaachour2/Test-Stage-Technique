import './CreateOrUpdateDocument.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

interface Document {
  id?: string;
  name: string;
  type: string;
  description: string;
}

const CreateOrUpdateDocument: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const [document, setDocument] = useState<Document>({
    name: '',
    type: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      const fetchDocument = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/documents/${id}`);
          setDocument(response.data);
        } catch (error) {
          console.error(`Error fetching document with ID ${id}:`, error);
        }
      };

      fetchDocument();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDocument((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`http://localhost:3001/documents/${id}`, document);
      } else {
        await axios.post('http://localhost:3001/documents', document);
      }

      navigate('/');
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'creating'} document:`, error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Update Document' : 'Create Document'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={document.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Type:
          <input type="text" name="type" value={document.type} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={document.description} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default CreateOrUpdateDocument;
