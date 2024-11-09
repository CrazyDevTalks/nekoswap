import React, { useState } from 'react';
import { Button } from '@pancakeswap/uikit';
import styled from 'styled-components';
import axios from 'axios';
import { PINATA_API_KEY, PINATA_SECRET_KEY } from '../inputs';

const UploadWrapper = styled.div`
  margin-bottom: 16px;
  width: 50%;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  margin: 10px 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>('');

  const uploadToPinata = async (file: File) => {
    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      });

      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      onImageUploaded(ipfsUrl);
      setPreview(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size too large. Please select an image under 10MB.');
        return;
      }
      uploadToPinata(file);
    }
  };

  return (
    <UploadWrapper>
      <HiddenInput
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleFileSelect}
      />
      <Button
        as="label"
        htmlFor="image-upload"
        disabled={uploading}
        style={{ cursor: 'pointer' }}
      >
        {uploading ? 'Uploading...' : 'Upload Logo'}
      </Button>
      {preview && <PreviewImage src={preview} alt="Preview" />}
    </UploadWrapper>
  );
};

export default ImageUpload;