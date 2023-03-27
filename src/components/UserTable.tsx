import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/store';
import {deleteUserAsync} from '../store/usersSlice';
import {User} from '../types/userTypes';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({users, onEdit}) => {
    console.log("Users in UserTable component:", users);

    const dispatch: AppDispatch = useDispatch();

    const handleDelete = async (user: User) => {
        try {
            await dispatch(deleteUserAsync(user.id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Street</th>
                <th>City</th>
                <th>Zipcode</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.name.firstname}</td>
                    <td>{user.name.lastname}</td>
                    <td>{user.phone}</td>
                    <td>{user.address.street}</td>
                    <td>{user.address.city}</td>
                    <td>{user.address.zipcode}</td>
                    <td>{user.address.geolocation.lat}</td>
                    <td>{user.address.geolocation.long}</td>
                    <td>
                        <button onClick={() => onEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;
