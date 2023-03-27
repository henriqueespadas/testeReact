import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateUserAsync } from '../store/usersSlice';
import { UpdateUserPayload, CreateUserPayload, User } from '../types/userTypes';
import { AppDispatch } from '../store/store';
import UserForm from '../components/UserForm';

const UserEditing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    user: User;
  }

  const user = (location.state as LocationState)?.user;

  const onSubmit = async (data: CreateUserPayload | UpdateUserPayload) => {
  if ('id' in data) {
    try {
      await dispatch(updateUserAsync(data as UpdateUserPayload));
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
};

  return (
    <div>
      <h1>User Editing</h1>
      {user ? (
        <UserForm user={user} onSubmit={onSubmit} />
      ) : (
        <p>User not found. Please go back to the user list.</p>
      )}
    </div>
  );
};

export default UserEditing;