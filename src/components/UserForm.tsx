import React from 'react';
import {useForm} from 'react-hook-form';
import {CreateUserPayload, UpdateUserPayload, User} from '../types/userTypes';
import {useNavigate} from 'react-router-dom';

interface UserFormProps {
    user?: User;
    onSubmit: (data: CreateUserPayload | UpdateUserPayload) => void | Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({user, onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateUserPayload | UpdateUserPayload>({
        defaultValues: user
            ? {
                ...user,
                name: {...user.name},
                address: {...user.address, geo: {...user.address.geolocation}},
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
                <input {...register('username', {required: true})} />
                {errors.username && <span>This field is required</span>}
            </div>
            <div>
                <label>Email:</label>
                <input {...register('email', {required: true})} />
                {errors.email && <span>This field is required</span>}
            </div>
            <div>
                <label>Password:</label>
                <input {...register('password', {required: true})} />
                {errors.password && <span>This field is required</span>}
            </div>
            <div>
                <label>First Name:</label>
                <input {...register('name.firstname', {required: true})} />
                {errors.name?.firstname && <span>This field is required</span>}
            </div>
            <div>
                <label>Last Name:</label>
                <input {...register('name.lastname', {required: true})} />
                {errors.name?.lastname && <span>This field is required</span>}
            </div>
            <div>
                <label>Phone:</label>
                <input {...register('phone', {required: true})} />
                {errors.phone && <span>This field is required</span>}
            </div>
            <div>
                <label>Street:</label>
                <input {...register('address.street', {required: true})} />
                {errors.address?.street && <span>This field is required</span>}
            </div>
            <div>
                <label>City:</label>
                <input {...register('address.city', {required: true})} />
                {errors.address?.city && <span>This field is required</span>}
            </div>
            <div>
                <label>Zipcode:</label>
                <input {...register('address.zipcode', {required: true})} />
                {errors.address?.zipcode && <span>This field is required</span>}
            </div>
            <div>
                <label>Latitude:</label>
                <input {...register('address.geo.lat', {required: true})} />
                {errors.address?.geo?.lat && <span>This field is required</span>}
            </div>
            <div>
                <label>Longitude:</label>
                <input {...register('address.geo.long', {required: true})} />
                {errors.address?.geo?.long && <span>This field is required</span>}
            </div>
            <div>
                <button type="submit">{user ? 'Update' : 'Create'} User</button>
            </div>
        </form>

    );
};

export default UserForm;
