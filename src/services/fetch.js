export const fetchContent = async jwt => {
  // Fetch Content from the Lambda
  const url = process.env.LAMBDA_CONTENT_URL
  const headers = new Headers({
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${jwt}`,
  })
  const options = {
    method: "GET",
    headers,
  }
  let data
  try {
    let response = await fetch(url, options)
    data = await response.json()
    if (data === null || data === undefined || data === null) {
      throw new Error("No valid data received from the API.")
    } else {
      window.localStorage.setItem("data", JSON.stringify(data))
    }
  } catch (err) {
    console.log(`API error: ${err}`)
  }
}
