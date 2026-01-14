const API_BASE = process.env.REACT_APP_API_BASE || '';

export async function fetchSensors() {
  const res = await fetch(`${API_BASE}/sensors/`);
  if (!res.ok) throw new Error('failed to fetch sensors');
  return res.json();
}

export async function fetchReadings(sensorId) {
  const res = await fetch(`${API_BASE}/readings/?sensor_id=${encodeURIComponent(sensorId)}`);
  if (!res.ok) throw new Error('failed to fetch readings');
  return res.json();
}
