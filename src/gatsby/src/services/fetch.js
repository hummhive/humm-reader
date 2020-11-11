export const fetchContent = async jwt => {
  // Fetch Content from the Lambda
  const hive = require("../../content/hive-config.json")
  const lambda =
    hive.connections.aws &&
    hive.connections.aws.lambdas.find(
      lambda => lambda.name === "humm-keybase-private-content-service"
    )

  const payload = { jwt: jwt }
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  }
  let data
  try {
    let response = await fetch(lambda, options)
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
