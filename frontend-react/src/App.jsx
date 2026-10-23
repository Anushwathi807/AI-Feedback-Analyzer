import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("Result will appear here");

  async function handleSubmit(event) {
    event.preventDefault();
    setResult("Analyzing...");

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "my-secret-dev-key-123",
        },
        body: JSON.stringify({ text: text }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error: " + error.message);
    }
  }

  return (
    <div>
      <h1>AI Feedback Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Type feedback here..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <button type="submit">Analyze</button>
      </form>
      <div>{result}</div>
    </div>
  );
}

export default App;
