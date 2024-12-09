import React, { useState } from 'react';
import maleAvatar from '../../assets/avatar/male-default-avatar.png';
import Axios from 'axios';
import { useAlert } from '../utils/AlertProvider';
import { useLoading } from '../utils/LoadingProvider';
import { useNavigate } from 'react-router-dom';

const UserProfileCard = ({ currProfile = {}, showNext }) => {
  const [isAccepted, setIsAccepted] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    requirement: '',
    username: currProfile?.username || '',
    email: '',
    phone: '',
  });
  const { setAlert } = useAlert();
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/emails/send-email`, {
        host: 'smtp.gmail.com',
        port: 587,
        username: 'raushan2288.jnvbanka@gmail.com',
        password: 'dqooryackjjjwdzp',
        to: currProfile.email,
        subject: `Request from ${formData.username}`,
        text: `Requirement: ${formData.requirement}\nEmail: ${formData.email}\nPhone: ${formData.phone}`,
      });

      await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/emails/store-email`, formData);

      setAlert({ message: 'Request sent successfully!', type: 'success' });
      setShowModal(false);
    } catch (error) {
      console.error('Error sending request:', error.response?.data || error.message);
      setAlert({ message: 'Failed to send the request. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    navigate(`/${currProfile.username}`);
  };

  return (
    <div className="w-full max-w-md border-2 border-blue-600 dark:border-blue-500 rounded-lg shadow bg-slate-200 dark:bg-gray-900 my-10">
      <div className="flex flex-col items-center p-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={maleAvatar} alt="Default avatar" />
        <button
          onClick={handleClick}
          className="mb-1 text-xl font-medium text-blue-600 dark:text-blue-500"
        >
          {`@ ${currProfile?.username?.toLowerCase() || 'User'}`}
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {`${currProfile?.fname || ''} ${currProfile?.lname || ''}`}
        </span>

        <div className="flex flex-col mt-4">
          <h4 className="text-sm text-gray-500 mb-1">About</h4>
          <p className="text-sm text-black dark:text-gray-200">{currProfile?.bio || 'No bio available'}</p>
        </div>

        <div className="flex flex-col mt-4">
          <h4 className="text-sm text-gray-500 mb-1">Email</h4>
          <p className="text-sm text-black dark:text-gray-200">
            {currProfile?.email || 'Email not available'}
          </p>
        </div>

        <div className="flex flex-col mt-4">
          <h4 className="text-sm text-gray-500 mb-1">Available Time Slot</h4>
          <p className="text-sm text-black dark:text-gray-200">
            {currProfile?.timeslot
              ? currProfile.timeslot.split(',').map((slot, idx) => (
                  <span key={idx} className="block">{slot}</span>
                ))
              : 'Timeslot not available'}
          </p>
        </div>

        <div className="mt-5">
          <h4 className="text-sm text-gray-500 mb-1">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {(currProfile?.skills || []).map((skill, idx) => (
              <span
                key={idx}
                className="rounded-full px-4 py-2 text-sm bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-black"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-sm text-gray-500 mb-1">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {(currProfile?.interests || []).map((interest, idx) => (
              <span
                key={idx}
                className="rounded-full px-4 py-2 text-sm bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-black"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-5 px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Send Request
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Send Request</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Requirement</label>
              <textarea
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                className="ml-2 py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
