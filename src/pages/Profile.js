import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice'; // Import the action from userSlice

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Local state for editing the profile
  const [editableUser, setEditableUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleSave = () => {
    // Dispatch updated user data
    dispatch(updateUser(editableUser));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-8">Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Edit User Information</h3>
              <p className="mt-1 text-sm text-gray-600">
                Update your personal account details below.
              </p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editableUser.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editableUser.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
