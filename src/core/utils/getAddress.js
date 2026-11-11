import React from 'react'

const getaddress = (line1, line2, line3) => {

    const addressLine1 = [line1, line2, line3]
        .map((line) => {
            if (!line) return;
            return line.toString().replace(/,/g, '').trim();
        })
        .filter(line => line !== '')//// null, undefined හෝ හිස් string ඉවත් කරයි
        .join(', ');

    return addressLine1;

}

export default getaddress;