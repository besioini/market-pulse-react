import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import authService from '../../services/auth';
import utils from '../../utility/utils';
import '../../styles/profile.css';
import Footer from '../../components/Footer';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const userProfile = await authService.getProfile();
            setProfile(userProfile);
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.updateProfile(profile);
            alert('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile');
        }
    };

    const handleDeleteAccount = async () => {
        if(window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
            try {
                await authService.deleteAccount();
                localStorage.removeItem('authToken');
                navigate('/login');
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Error deleting account');
            }
        }
    };

    const userType = utils.getUserType();

    return (
        <div>
            <Header userType={userType}/>
            {isEditing ? (
                <form onSubmit={handleSubmit} id="updateForm">
                    <input type="text" name="firstname" value={profile.firstname} onChange={handleInputChange} placeholder="First Name" />
                    <input type="text" name="lastname" value={profile.lastname} onChange={handleInputChange} placeholder="Last Name" />
                    <input type="text" name="username" value={profile.username} onChange={handleInputChange} placeholder="Username" />
                    <input type="email" name="email" value={profile.email} onChange={handleInputChange} placeholder="Email" />
                    <button type="submit" >Submit Update</button>
                </form>
            ) : (
                <div id="profile-info">
                    <p>First Name:{profile.firstname}</p>
                    <p>Last Name:{profile.lastname}</p>
                    <p>Username:{profile.username}</p>
                    <p>Email:{profile.email}</p>
                    <button onClick={() => setIsEditing(true)}>Update Profile</button>
                </div>
            )}
            <hr />
            <div id="delete-account">
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
            <hr />
            <Footer />
        </div>
    );
};

export default Profile;
