import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserPayload, UpdateUserPayload, User } from '../types/userTypes';
import { useNavigate } from 'react-router-dom';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserPayload | UpdateUserPayload) => void | Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserPayload | UpdateUserPayload>({
    defaultValues: user
      ? {
          ...user,
          name: { ...user.name },
          address: { ...user.address, geo: { ...user.address.geolocation } },
        }
      : undefined,
  });

  const navigate = useNavigate();

  const onSubmitHandler = async (data: CreateUserPayload | UpdateUserPayload) => {
  try {
    await onSubmit(data);
    console.log('Navegando para a tela de listagem de usuários');
    navigate('/'); // substitua com o caminho correto para a listagem de usuários
  } catch (error) {
    console.error('Erro ao criar/atualizar usuário:', error);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label>Username:</label>
        <input {...register('username', { required: true })} />
        {errors.username && <span>This field is required</span>}
      </div>
      <div>
        <label>Email:</label>
        <input {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}
      </div>
      <div>
        <label>Password:</label>
        <input {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
      </div>
      {/* Add other input fields for the remaining user properties here */}
      <div>
        <button type="submit">{user ? 'Update' : 'Create'} User</button>
      </div>
    </form>
  );
};

export default UserForm;
