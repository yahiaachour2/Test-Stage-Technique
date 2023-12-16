import './Content.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const Content: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents');
        setData(response.data);
      } catch (error) {
        setError(JSON.stringify(error, null, 2));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/documents/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      setError(`Error deleting document with ID ${id}: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const handleAddDocument = async () => {
    try {
      await axios.post('http://localhost:3001/documents', newDocument);

      closeForm();
    } catch (error) {
      setError(`Error adding new document: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const openForm = () => {

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setNewDocument({
      name: '',
      type: '',
      description: '',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='content-container'>
      <div className='flex flex-between'>
        <h1>Documents</h1>
        <Link to="/document"><button>Add document</button></Link>
      </div>
      {showForm && (
        <div className="form-container">
          <label>Name:</label>
          <input
            type="text"
            value={newDocument.name}
            onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
          />

          <label>Type:</label>
          <input
            type="text"
            value={newDocument.type}
            onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
          />

          <label>Description:</label>
          <input
            type="text"
            value={newDocument.description}
            onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
          />

          <button onClick={handleAddDocument}>Add</button>
          <button onClick={closeForm}>Cancel</button>
        </div>
      )}

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.description}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
              <td className='flex' >
                <Link to={`/document?id=${item.id}`}><button><i className="fas fa-edit"></i></button></Link>
                <button onClick={() => handleDelete(item.id)}><i className="fas fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
