    const form = document.getElementById("feedback-form");
    const textInput = document.getElementById("feedback-text");
    const resultBox = document.getElementById("result");

    form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const text = textInput.value;
    resultBox.textContent = "Analyzing...";

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
        resultBox.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultBox.textContent = "Error: " + error.message;
        console.error(error);
    }
    });
