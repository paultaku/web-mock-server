import React from 'react';
import { ApiStatus } from './api-status';

export default function ListApi() {
  const [apis, setApis] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/_mock/api/list')
      .then((response) => response.json())
      .then((result) => setApis(result.files))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="w-full shadow-xl card bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Mock APIs</h2>
          <div>
            {apis.map((api, index) => (
              <ApiStatus api={api} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
