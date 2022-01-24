import axios from "axios"
import { backEndLink, hostURL } from "../config"


export const getAllProduct = async (offset, limit) => {
  try {
    const res = await axios.get(`${hostURL}/get-all-product/${offset}/${limit}`);
    if (res.status === 200) {
      return {
        ...res.data,
        success: true,
      }
    }
    else {
      return {
        ...res.data,
        success: false,
        // error: res.data.error,
      }
    }
  }
  catch (error) {
    return {
      success: false,
      error: error,
    }
  }
}

export const getProductInfo = async (id) => {
  try {
    const res = await axios.get(`${hostURL}/get-product-by-id/${id}`);
    if (res.status === 200) {
      return {
        ...res.data,
        success: true
      }
    } else {
      return {
        ...res.data,
        success: false
      }
    }
  }
  catch (error) {
    return {
      success: false,
      error: error,
    }
  }
}

export const getProductTypes = async (category) => {
  try {
    const res = await axios.get(`${hostURL}/get-product-types/${category}`);
    if (res.status === 200) {
      return {
        ...res.data,
        success: true
      }
    } else {
      return {
        ...res.data,
        success: false
      }
    }
  }
  catch (error) {
    return {
      success: false,
      error: error,
    }
  }
}


export const getProduct = async (offset, limit) => {
  try {
    const res = await axios.get(`${backEndLink}/api/product/browse?offset=${offset}&limit=${limit}&admin=${true}`)
    return {
      success: true,
      ...res.data
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

export const getProductData = async (urlKey) => {
  try {
    const res = await axios.get(`${backEndLink}/api/product/${urlKey}`)
    return {
      success: true,
      ...res.data
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

export const updateProductData = async (id, updateOps) => {
  try {
    const res = await axios.post(`${backEndLink}/api/product/update/${id}`, {
      ...updateOps
    })
    return {
      success: true,
      ...res.data
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

export const createProduct = async (updateOps) => {
  try {
    const res = await axios.post(`${backEndLink}/api/product/createProduct`, {
      ...updateOps
    })
    return {
      success: true,
      ...res.data
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}
