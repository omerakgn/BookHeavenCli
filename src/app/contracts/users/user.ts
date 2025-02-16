export class User{

    id: string;
    name: string;
    surname: string;
    role: string;
    email: string;

}

export class UserResponse{

    users: User[];
    message: string;
    success: boolean;
  
}
