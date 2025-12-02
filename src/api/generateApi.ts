// Function to generate image via API
export async function generateBack(front: string, accessToken: string) {
  const res = await fetch("http://localhost:5000/api/generate/back", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ front }),
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to generate back content");
  }
  return data.back;
}

// Function to generate an image based on the front text
export async function generateImage(front: string, accessToken: string) {
  const res = await fetch("http://localhost:5000/api/generate/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ front }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to generate image");
  }
  return data.image;
}
