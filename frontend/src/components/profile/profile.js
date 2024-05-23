import React, { useState, useEffect } from 'react';
import ProfileForm from './profileForm';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({ email: '', handicap: '' });

    useEffect(() => {
        // Fetch the user profile data from the backend
        axios.get('/api/profile')
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile data', error));
    }, []);

    const handleSubmit = (values) => {
        // Update the user profile data
        axios.put('/api/profile', values)
            .then(response => {
                setProfile(response.data);
                alert('Profile updated successfully');
            })
            .catch(error => console.error('Error updating profile', error));
    };

    return (
        <div className="container mt-4">
            <h2>Your Profile</h2>
            <ProfileForm initialValues={profile} onSubmit={handleSubmit} />
        </div>
    );
};

export default Profile;
