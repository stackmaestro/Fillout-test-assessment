# Fillout.com Take-Home Assignment API Server

This project serves as an API server for handling form submissions and responses with customizable filtering options. It allows clients to retrieve form submissions from the Fillout.com service, applying various filters as required.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or later recommended)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/stackmaestro/Fillout-test-assessment.git
   cd fillout-assignment-api
   ```

2. Install the required packages:

   ```
   npm install
   ```

3. Set up environment variables:

   - Create a new file named `.env`.
   - Fill in your environment variables in the `.env` file.

   Example `.env` content:

   ```
   PORT=5000
   API_KEY=your_fillout_api_key_here
   ```

### Running the Server

Start the server with the following command:

```
npm start
```

You should see an output indicating that the server is running and listening on the specified port.

## API Endpoints

- **GET /**: A simple route that returns a welcome message from the API server.

- **GET /:formId/filteredResponses**: Retrieves filtered form responses based on the provided form ID and query parameters. Filters must be provided as a JSON string in the `filters` query parameter.

  Example request:

  ```
  https://fillout-test-assessment-production.up.railway.app/cLZojxk94ous/filteredResponses?filters=[{"id":"dSRAe3hygqVwTpPK69p5td","condition":"less_than","value":"2021-08-24"}]
  https://fillout-test-assessment-production.up.railway.app/cLZojxk94ous/filteredResponses?filters=[{"id":"bE2Bo4cGUv49cjnqZ4UnkW","condition":"equals","value":"Johnny"}]
  https://fillout-test-assessment-production.up.railway.app/cLZojxk94ous/filteredResponses?filters=[{"id":"bE2Bo4cGUv49cjnqZ4UnkW","condition":"equals","value":"Johnny"},{"id":"dSRAe3hygqVwTpPK69p5td","condition":"less_than","value":"2024-02-02"}]
  https://fillout-test-assessment-production.up.railway.app/cLZojxk94ous/filteredResponses?filters=[{"id":"fFnyxwWa3KV6nBdfBDCHEA","condition":"greater_than","value":11}]

  ```

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Axios](https://github.com/axios/axios) - For making HTTP requests
- [dotenv](https://github.com/motdotla/dotenv) - For managing environment variables

## Contributing

Please feel free to fork this repository, make changes, and submit pull requests. We welcome contributions to improve this project!

## License

This project is licensed under the MIT License
