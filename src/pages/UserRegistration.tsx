import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createUserAsync} from '../store/usersSlice';
import {CreateUserPayload} from '../types/userTypes';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';

const UserRegistration: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [phone, setPhone] = useState('');



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: CreateUserPayload = {
            username,
            email,
            password,
            name: {
                firstName,
                lastName,
            },
            address: {
                street,
                suite,
                city,
                zipcode,
                geo: {
                    lat: lat,
                    lng: lng,
                },
            },
            phone,
        };

        console.log('Payload:', payload); // Adicione esta linha

        try {
            await dispatch(createUserAsync(payload));
            navigate('/'); // substitua com o caminho correto para a listagem de usuários
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </label>
            <label>
                Street:
                <input
                    type="text"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                />
            </label>
            <label>
                Suite:
                <input
                    type="text"
                    value={suite}
                    onChange={(event) => setSuite(event.target.value)}
                />
            </label>
            <label>
                City:
                <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
            </label>
            <label>
                Zipcode:
                <input
                    type="text"
                    value={zipcode}
                    onChange={(event) => setZipcode(event.target.value)}
                />
            </label>
            <label>
                Latitude:
                <input
                    type="text"
                    value={lat}
                    onChange={(event) => setLat(event.target.value)}
                />
            </label>
            <label>
                Longitude:
                <input
                    type="text"
                    value={lng}
                    onChange={(event) => setLng(event.target.value)}
                />
            </label>
            <label>
                Phone:
                <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default UserRegistration;
