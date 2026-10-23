from unittest.mock import patch, AsyncMock
from fastapi.testclient import TestClient
from main import app, APP_API_KEY

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_analyze_missing_api_key():
    response = client.post("/analyze", json={"text": "Great product!"})
    assert response.status_code == 422  # header is required, none sent

def test_analyze_wrong_api_key():
    response = client.post(
        "/analyze",
        json={"text": "Great product!"},
        headers={"x-api-key": "wrong-key"},
    )
    assert response.status_code == 401

@patch("main.client.aio.models.generate_content", new_callable=AsyncMock)
def test_analyze_success(mock_generate):
    mock_generate.return_value.text = "Positive feedback about the product."

    response = client.post(
        "/analyze",
        json={"text": "Great product!"},
        headers={"x-api-key": APP_API_KEY},
    )

    assert response.status_code == 200
    assert response.json() == {"result": "Positive feedback about the product."}
