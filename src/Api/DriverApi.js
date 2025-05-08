import BusOperatorAxios from "../Axios/BusOperatorAxios"
export const busSignup = async (formData) => {
    try {
      console.log("in function",formData)
      const response = await BusOperatorAxios.post('/bus-operator/register',formData)
      return response.data
    } catch (error) {k
        console.log(error)
    }
}

export const busSignin = async (formData) => {
  try {
    const response = await BusOperatorAxios.post('/bus-operator/login',formData)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
