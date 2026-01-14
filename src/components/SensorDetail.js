import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchReadings } from '../services/api';

export default function SensorDetail(){
  const { id } = useParams();
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted = true;
    fetchReadings(id)
      .then(data => { if(mounted) setReadings(data); })
      .catch(e => { if(mounted) setError(e.message); })
      .finally(()=> { if(mounted) setLoading(false); });
    return ()=> { mounted = false; };
  }, [id]);

  return (
    <div>
      <h2>Sensor: {id}</h2>
      <p><Link to="/">Back to sensors</Link></p>
      {loading && <div>Loading readings...</div>}
      {error && <div style={{color:'red'}}>Error: {error}</div>}
      {!loading && !readings.length && <div>No readings found.</div>}
      {readings.length > 0 && (
        <table>
          <thead>
            <tr><th>Timestamp</th><th>Values</th></tr>
          </thead>
          <tbody>
            {readings.map(r => (
              <tr key={r.id}>
                <td>{new Date(r.timestamp).toLocaleString()}</td>
                <td>{JSON.stringify(r.values)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
