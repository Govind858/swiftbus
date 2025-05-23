import userAxios from "../Axios/UserAxios";
export const userRegister = async (formData) =>{
    try {
        console.log (formData)
        const response = await userAxios.post('/user/userRegistration', formData);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}



export const loginUser = async (formData) =>{
    try {
        console.log (formData)
        const response = await userAxios.post('/user/userLogin', formData);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getOneTrip = async(id)=>{
    try {
        
    } catch (error) {
        
    }
}
 export const addBooking  =(data)=>{
    try {
        
    } catch (error) {
        
    }
 }

 export const  calculateFare = (km) => {
    const minFare = 10
    const minkm =2.5
    if(km <= minkm){
        return minFare
    }
    const remainingDistance = km - minkm 
    const fareForExtra = remainingDistance * 1.00
    const totalFare =  minFare + fareForExtra
    return Math.round(totalFare)
 }