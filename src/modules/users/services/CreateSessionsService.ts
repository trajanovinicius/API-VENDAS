import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRespository';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password); // comparando as senhas criptografas com as não criptografadas

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
