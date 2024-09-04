import React, { useState } from 'react';

const ImageUploader = ({ onUpload }) => {
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => onUpload(reader.result);
        reader.readAsDataURL(file);
    };

    return <input type="file" accept="image/*" onChange={handleImageUpload} />;
};

export default ImageUploader;
