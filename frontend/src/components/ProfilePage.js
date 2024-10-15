import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
`;

const ProfileHeader = styled.h2`
  color: #61dafb;
  border-bottom: 2px solid #61dafb;
  padding-bottom: 10px;
`;

const ProfileInfo = styled.p`
  margin: 10px 0;
  font-size: 16px;
`;

const LoadingText = styled.div`
  color: #61dafb;
  font-size: 18px;
  text-align: center;
`;

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/accounts/profile/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <LoadingText>Loading...</LoadingText>;

  return (
    <ProfileContainer>
      <ProfileHeader>Profile</ProfileHeader>
      {profile ? (
        <>
          <ProfileInfo>Username: {profile.username}</ProfileInfo>
          <ProfileInfo>Email: {profile.email}</ProfileInfo>
        </>
      ) : (
        <ProfileInfo>Unable to load profile information.</ProfileInfo>
      )}
    </ProfileContainer>
  );
}

export default ProfilePage;