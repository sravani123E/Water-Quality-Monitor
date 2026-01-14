import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSensors } from '../services/api';

export default function SensorList() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchSensors()
      .then(data => { if (mounted) setSensors(data); })
      .catch(e => { if (mounted) setError(e.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading sensors...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;

  if (!sensors.length) return <div>No sensors found.</div>;

  return (
    <div>
      <h2>Sensors</h2>
      <ul>
        {sensors.map(s => (
          <li key={s.id}>
            <Link to={`/sensors/${s.id}`}>{s.name || s.id}</Link>
            {s.type ? <span> — {s.type}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
