const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function getClothes() {
  return fetch(`${baseUrl}/items?_sort=_id&_order=desc`).then(checkResponse);
}

export function addClothingItems({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items?_sort=_id&_order=desc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkResponse);
}

export function deleteClothingItems(card) {
  return fetch(`${baseUrl}/items/${card._id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(checkResponse);
}
