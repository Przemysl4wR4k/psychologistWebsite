export class User {
    email!: string
    uid!: string
    isAdmin!: boolean

    constructor(authData: any) {
        this.email = authData.email
        this.uid = authData.uid
        this.isAdmin = authData
    }
}