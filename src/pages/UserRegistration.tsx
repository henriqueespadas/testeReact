// UserRegistration.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { createUserAsync } from '../store/usersSlice';
import { CreateUserPayload } from '../types/userTypes';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

const UserRegistration: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

const onSubmit = async (data: CreateUserPayload) => {
    try {
      await dispatch(createUserAsync(data));
      navigate('/'); // substitua com o caminho correto para a listagem de usuários
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return <UserForm onSubmit={onSubmit} />;
};

export default UserRegistration;
