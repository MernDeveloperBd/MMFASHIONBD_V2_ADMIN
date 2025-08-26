import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData) => {
    try {
        const response = await fetch(apiUrl + URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchDataFromApi = async (url) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            },
        }
        const { data } = await axios.get(apiUrl + url, params)
        return data;
    } catch (error) {
        return error;

    }
}

export const uploadImage = async (url, updateData) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'multipart/form-data'
        },
    }
    let response;
    await axios.put(apiUrl + url, updateData, params).then((res) => {
        console.log(res);
        response = res;

    })
    return response;
}
export const uploadImages = async (url, formData) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'multipart/form-data'
        },
    }
    let response;
    await axios.post(apiUrl + url, formData, params).then((res) => {
        console.log(res);
        response = res;

    })
    return response;
}
// Edit data
export const editData = async (url, formData) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        },
    }
    var response;
    await axios.put(apiUrl + url, formData, params).then((res) => {
        console.log(res);
        response = res;

    })
    return response;
}

// delete image
export const deleteImages = async (url) => {
     const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        },
    }
    const {res} = await axios.delete(apiUrl + url,  params)
    return res
}
// delete image
export const deleteData = async (url) => {
     const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        },
    }
    const {res} = await axios.delete(apiUrl + url,  params)
    return res
}

