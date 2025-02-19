export async function fetchWeddingInfo() {
    try {
        const response = await fetch("http://localhost:8000/api/info");
        return await response.json();
    } catch (error) {
        console.error("Error fetching wedding info:", error);
        return null;
    }
}
