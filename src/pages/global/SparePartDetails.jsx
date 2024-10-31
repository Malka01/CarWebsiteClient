import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card,Modal } from 'antd';
import { green } from '@mui/material/colors';

const apiUrl = process.env.REACT_APP_API_URL;
const AdvertisementDetail = () => {
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    axios.get(`${apiUrl}spare-part/getAllSpareParts`)
      .then(response => {
        const ad = response.data.find(ad => ad.id === parseInt(id));
        setAdvertisement(ad);
      })
      .catch(error => console.error('Error fetching advertisement details:', error));
  }, [id]);

  const handleImageClick = (imageSrc) => {
    setPreviewImage(imageSrc);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPreviewImage('');
  };
  if (!advertisement) {
    return <p>Loading...</p>;
  }
  const mainImage = advertisement.data;
  const fileType = advertisement.fileType;
  const imageUrl = mainImage
  ? `data:${fileType};base64,${mainImage}`
  : 'path/to/default/image.jpg'; // Fallback image URL

const formattedDate = new Date(advertisement.createdOn).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
  return (
    <>
    <Card  style={{ padding: 50 ,paddingTop:10,marginLeft:60,marginRight:60 ,marginTop:60,border: "1px solid orange",
                          borderRadius: 10}}>
    <div style={{ marginBottom: '15px' }}>
                              <h3 style={{ fontSize: '50px', margin: 0 ,fontFamily: 'Arial, sans-serif' }}>{advertisement.partName} {advertisement.vehicleBrand} {advertisement.vehicleModel} </h3>
                              
                            </div>
      <Row gutter={16}>
        <Col xs={15} md={12}>
          <div style={{
                                width: '450px',
                                height: '290px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 10,
                                justifyContent: 'center',
                                border: '1px solid ',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
                      overflow: 'hidden'
                              }}>
            <img 
              src={imageUrl} 
              alt="Main" 
              style={{ width: '100%', height: 'auto', display:'cover', marginBottom: 20, borderRadius: 10 }} 
              onClick={() => handleImageClick(imageUrl)}
            />
          </div>
          
        </Col>
        <Col xs={24} md={12}>
  <p style={{ color: 'Green', fontSize: 50, fontWeight: 500 }}>Rs. {advertisement.price}</p>

  <div style={{ marginBottom: '10px' }}>
    {[
      { label: 'Vehcle Model ', value: advertisement.vehicleModel },
      { label: 'vehicle Brand', value: advertisement.vehicleBrand },
      
    ].map(item => (
      <div style={{ display: 'flex', margin: '5px 0' }} key={item.label}>
        <span style={{ color: 'grey', width: '200px', fontSize: 20, fontWeight: 400, fontFamily: 'Arial, sans-serif' }}>{item.label}:</span>
        <strong style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Arial, sans-serif' }}>{item.value}</strong>
      </div>
    ))}
  </div>

  <p style={{ fontSize: 22, fontWeight: 400, fontFamily: 'Arial, sans-serif', marginTop: 40 }}>
    <strong>Description</strong> <br /> {advertisement.description}
  </p>
</Col>




      </Row>
    </Card>
    <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <img 
          alt="Preview" 
          style={{ width: '100%', borderRadius: 10 }} 
          src={previewImage} 
        />
      </Modal>
    </>
  );
};

export default AdvertisementDetail;