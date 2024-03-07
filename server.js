require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

const BASE_URL = "https://api.fillout.com/v1/api";

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("fillout.com take-home assignment API Server");
});

// Endpoint to fetch and filter form responses
app.get("/:formId/filteredResponses", async (req, res) => {
  const { formId } = req.params;
  const { filters, ...queryParameters } = req.query;

  // Build the API URL and headers for the Fillout API request
  const url = `${BASE_URL}/forms/${formId}/submissions`;
  const headers = { Authorization: `Bearer ${process.env.API_KEY}` };

  try {
    // Fetch responses from the Fillout API
    const response = await axios.get(url, { headers, params: queryParameters });
    let { responses, totalResponses, pageCount } = response.data;

    // Apply filters if they are provided
    if (filters) {
      const filterConditions = JSON.parse(filters);
      responses = responses.filter((response) =>
        filterConditions.every((filter) => {
          const question = response.questions.find((q) => q.id === filter.id);

          if (!question || question.value === null) return false; // Skip if the question doesn't exist or value is null

          switch (filter.condition) {
            case "equals":
              return question.value == filter.value;
            case "does_not_equal":
              return question.value != filter.value;
            case "greater_than":
              return question.type === "DatePicker"
                ? new Date(question.value) > new Date(filter.value)
                : Number(question.value) > Number(filter.value);
            case "less_than":
              return question.type === "DatePicker"
                ? new Date(question.value) < new Date(filter.value)
                : Number(question.value) < Number(filter.value);
            default:
              return true;
          }
        })
      );

      // Update the pagination based on filtering
      totalResponses = responses.length;
      pageCount = Math.ceil(
        totalResponses / (parseInt(queryParameters.limit) || totalResponses)
      );
    }

    // Return the filtered responses
    res.json({ responses, totalResponses, pageCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Tested URLS:
// http://localhost:5000/cLZojxk94ous/filteredResponses?filters=[{"id":"dSRAe3hygqVwTpPK69p5td","condition":"less_than","value":"2021-08-24"}]
// http://localhost:5000/cLZojxk94ous/filteredResponses?filters=[{"id":"bE2Bo4cGUv49cjnqZ4UnkW","condition":"equals","value":"Johnny"}]
// http://localhost:5000/cLZojxk94ous/filteredResponses?filters=[{"id":"bE2Bo4cGUv49cjnqZ4UnkW","condition":"equals","value":"Johnny"},{"id":"dSRAe3hygqVwTpPK69p5td","condition":"less_than","value":"2024-02-02"}]
// http://localhost:5000/cLZojxk94ous/filteredResponses?filters=[{"id":"fFnyxwWa3KV6nBdfBDCHEA","condition":"greater_than","value":11}]
