import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {fetchUsersAsync} from '../store/usersSlice';
import UserTable from '../components/UserTable';
import {User} from '../types/userTypes';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../hooks/useAppDispatch';

const UserList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const state = useSelector((state: RootState) => state);
    console.log(state);

    const users = useSelector((state: RootState) => state.user.users);
    const userStatus = useSelector((state: RootState) => state.user?.status || 'idle');

    console.log("Users in UserList component:", users);
    console.log("User status in UserList component:", userStatus);


    useEffect(() => {
        const fetchUsers = async () => {
            await dispatch(fetchUsersAsync());
        };

        if (userStatus === 'idle') {
            fetchUsers();
        }
    }, [dispatch, userStatus]);

    const handleEdit = (user: User) => {
        navigate(`/users/edit/${user.id}`, {state: {user}});
    };


    return (
        <div>
            <h1>User List</h1>
            <UserTable users={users} onEdit={handleEdit}/>
            <button onClick={() => navigate('/users/register')}>Add User</button>
        </div>
    );
};

export default UserList;
