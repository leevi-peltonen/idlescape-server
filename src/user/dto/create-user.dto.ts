import {
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator'

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'Name must have atleast 3 characters' })
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: 'Password must be atleast 8 characters and a maximum of 20 characters. Also must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    })
    password: string
}