import axios from "axios"
import { backEndLink, hostURL } from "../config"

export const getUserInfo = async (user_id) => {
  try {
    const res = await axios.get(`${hostURL}/get-user/${user_id}`);
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

export const updateInfo = async ({ user_id, firstname, lastname, phone, address, role }) => {
  try {
    const res = await axios.post(`${hostURL}/update-info`, {
      user_id, firstname, lastname, phone, address, role
    });
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

export const register = async ({email, password, firstname, lastname, phone, address, role}) => {
  try {
    const res = await axios.post(`${hostURL}/register`, {
      email, password, firstname, lastname, phone, address, role
    });
    if (res.status === 200) {
      return {
        ...res.data,
        success: true
      }
    } else {
      return {
        ...res.data,
        success: false,
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

export const getAllUser = async (offset, limit) => {
  try {
    const res = await axios.get(`${hostURL}/get-all-user/${offset}/${limit}`);
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


export const login = async (email, password) => {
  try {
    const res = await axios.post(`${backEndLink}/api/auth/login`, {
      email,
      password,
    });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      return {
        ...res.data,
        success: true,
      }
    }
    else {
      return {
        ...res.data,
        success: false,
        error: res.data.error,
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

// export const getUser = async (token, offset, limit) => {
//   try {
//     const res = await axios.get(`${backEndLink}/api/user?offset=${offset}&limit=${limit}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.status === 200) {
//       // localStorage.setItem("token", res.data.token);
//       return {
//         ...res.data,
//         success: true,
//       }
//     }
//     else {
//       return {
//         ...res.data,
//         success: false,
//         // error: res.data.error,
//       }
//     }
//   }
//   catch (error) {
//     return {
//       success: false,
//       error: error,
//     }
//   }
// }

// export const getUserByID = async (token, id) => {
//   try {
//     const res = await axios.get(`${backEndLink}/api/user/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.status === 200) {
//       // localStorage.setItem("token", res.data.token);
//       return {
//         ...res.data,
//         success: true,
//       }
//     }
//     else {
//       return {
//         ...res.data,
//         success: false,
//         // error: res.data.error,
//       }
//     }
//   }
//   catch (error) {
//     return {
//       success: false,
//       error: error,
//     }
//   }
// }

// export const updateUser = async (token, id, updateOps) => {
//   try {
//     const res = await axios.post(`${backEndLink}/api/user/update/${id}`, { ...updateOps }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.status === 200) {
//       return {
//         ...res.data,
//         success: true,
//       }
//     }
//     else {
//       return {
//         ...res.data,
//         success: false,
//       }
//     }
//   }
//   catch (error) {
//     return {
//       success: false,
//       error: error,
//     }
//   }
// }

// export const createUser = async (token, userOps) => {
//   try {
//     const res = await axios.post(`${backEndLink}/api/user/createUser`, { ...userOps }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.status === 200) {
//       return {
//         ...res.data,
//         success: true,
//       }
//     }
//     else {
//       return {
//         ...res.data,
//         success: false,
//       }
//     }
//   }
//   catch (error) {
//     return {
//       success: false,
//       error: error,
//     }
//   }
// }
