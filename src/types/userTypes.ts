export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
}

export interface UpdateUserPayload extends CreateUserPayload {
  id: number;
}
