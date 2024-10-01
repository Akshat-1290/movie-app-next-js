
export default async function getAllMovies({type} : {type : "selected" | "top"}) {
  const response = await fetch(`https://advanced-internship-api-production.up.railway.app/${type}Movies`)
  if(!response.ok) return undefined
  const data = await response.json()
  return data.data
}
