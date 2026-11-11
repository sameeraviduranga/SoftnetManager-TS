import { isEmpty } from '@mui/material';
import React from 'react'
import { string } from 'zod';

function getImageUrl(imagePath, imageName, defaultImage) {
    if (!imagePath) return "";
    const image = imageName || defaultImage;


    const baseUrl = import.meta.env.VITE_API_IMG_URL || "http://192.168.1.100:5001";
    //const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
    return `${baseUrl}/${imagePath}/${image}`;

}

export default getImageUrl