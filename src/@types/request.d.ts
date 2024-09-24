export { };

declare global {
    // Register Payload
    export interface ICreateUserRequest {
        name?: string,
        username?: string,
        email: string
        emailVisibility?: boolean
        password: string,
        passwordConfirm: string
    }
}
