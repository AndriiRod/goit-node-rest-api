import jimp from 'jimp';
import path from 'path';
import fs from 'fs/promises';
import { User } from '../../models/index.js';

const __dirname = import.meta.dirname;

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');
const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  try {
    jimp
      .read(tmpUpload)
      .then(image => {
        return image.resize(250, 250).write(resultUpload);
      })
      .catch(e => console.log(e));
    // await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (e) {
    next(e);
  }
};

export default updateAvatar;
