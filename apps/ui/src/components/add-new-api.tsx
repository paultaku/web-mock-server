import React from 'react';

export default function AddNewApi() {
  function callApi(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      apiPath: HTMLInputElement;
      method: HTMLSelectElement;
    };
    if (!formElements.apiPath.value) {
      alert('API Path is required');
      return;
    }
    if (!formElements.method.value) {
      alert('Method is required');
      return;
    }
    fetch('http://localhost:3000/_mock/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiPath: formElements.apiPath.value,
        method: formElements.method.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => alert(result.message))
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div className="w-full shadow-xl card bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Add New API</h2>
          <form onSubmit={callApi}>
            <div className="justify-end card-actions">
              <label className="w-full" htmlFor="">
                <input
                  type="text"
                  name="apiPath"
                  placeholder="API Path, e.g. /api/v1/users"
                  className="w-full max-w-xs input input-bordered"
                />
              </label>
              <label className="w-full" htmlFor="">
                <select
                  className="w-full max-w-xs select select-bordered"
                  defaultValue=""
                  name="method"
                >
                  <option disabled value="">
                    Http Method
                  </option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                  <option value="OPTION">OPTION</option>
                </select>
              </label>
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
