export default interface UserDTO {
    id: string;
    name: string;
    email: string;
    age: number;
    createdAt: string; // toISOString()
}
