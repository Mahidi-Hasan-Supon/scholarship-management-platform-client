import axios from "axios";


export const imageUpload = async ImageDAta=>{
      const formdata = new FormData();
    formdata.append("image", ImageDAta);


        const imageData = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
      formdata,
    );
    return imageData.data?.data?.display_url;
}


// user er data save db
export const saveOrUploadUser = async userData =>{
  const {data} = await axios.post(`${import.meta.env.VITE_SERVER_SITE}/user`, userData)
  return data
}

