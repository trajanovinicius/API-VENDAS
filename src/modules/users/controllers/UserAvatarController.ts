/* eslint-disable prettier/prettier */
import { Response, Request } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(user);
  }
}
