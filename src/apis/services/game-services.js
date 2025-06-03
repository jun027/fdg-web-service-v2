export const getCountryTown = async () => {
  const fetchUrl = `${process.env.BASE_URL}api/v1/selectlist/countrytown`

  console.log(new Date().toISOString(), '【getCountryTown】url:', fetchUrl)

  try {
    const response = await fetch(
      fetchUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        cache: 'no-store',
      },
    )

    const data = await response.json()

    console.log(
      new Date().toISOString(),
      '【getCountryTown】response data:',
      data,
    )

    return data
  } catch (error) {
    return {
      error: {
        message: 'Failed to fetch country town / error: ' + error,
      },
    }
  }
}

export const getProjects = async () => {
  const fetchUrl = `${process.env.BASE_URL}api/v1/selectlist/fundraise`

  console.log(new Date().toISOString(), '【getProjects】url:', fetchUrl)

  try {
    const response = await fetch(
      fetchUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        cache: 'no-store',
      },
    )

    const data = await response.json()

    console.log(new Date().toISOString(), '【getProjects】response data:', data)

    return data
  } catch (error) {
    return {
      error: {
        message: 'Failed to fetch projects / error: ' + error,
      },
    }
  }
}

export const getPayType = async () => {
  const fetchUrl = `${process.env.BASE_URL}api/v1/selectlist/paytype`

  console.log(new Date().toISOString(), '【getPayType】url:', fetchUrl)

  try {
    const response = await fetch(
      fetchUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        cache: 'no-store',
      },
    )

    const data = await response.json()

    console.log(new Date().toISOString(), '【getPayType】response data:', data)

    return data
  } catch (error) {
    return {
      error: {
        message: 'Failed to fetch pay type / error: ' + error,
      },
    }
  }
}
