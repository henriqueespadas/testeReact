export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
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
    firstname: string;
    lastname: string;
  };
  address: {
    street: string;
    number: number;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface UpdateUserPayload extends CreateUserPayload {
  id: number;
}
