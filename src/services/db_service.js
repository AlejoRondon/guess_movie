export default async function fetchMovies() {
  try {
    const response = await fetch(`./db.json`)
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
