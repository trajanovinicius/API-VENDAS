/* eslint-disable prettier/prettier */
import { Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

interface IRequest {
  user_id: string;
  avatarFilename: string | undefined;
}

export default class UserAvatarController {
  public async update(request: IRequest, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user_id,
      avatarFilename: request.avatarFilename,
    });

    return response.json(user);
  }
}
