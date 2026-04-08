import { useState } from 'react';

function BuggyComponent() {
  throw new Error('Simulated component crash!');
}

export default function ErrorBoundaryDemo() {
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="section">
      <h2>4. Error Boundary Demo</h2>
      <p>Click the button to simulate a component crash caught by ErrorBoundary.</p>
      <button className="btn-delete" onClick={() => setTrigger(true)}>Trigger Error</button>
      {trigger && <BuggyComponent />}
    </div>
  );
}