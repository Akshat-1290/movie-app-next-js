
export default async function getMovie(movieId: string) {
    const response = await fetch(`https://advanced-internship-api-production.up.railway.app/movies/${movieId}`)
    if(!response.ok) return undefined
    const data = await response.json()
    return data.data
  }
