const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const {singleMulterUpload, singlePublicFileUpload} = require('../../awsS3')

const router = express.Router();

// Sign up
router.post(
    '/',
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );
  // Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

  //Gets all albums of a specific user
router.get('/:userId/albums', async(req, res) => {
  const id = req.params
  const albums = await Album.findAll({
    where: {
      userId: id.userId
    }
  })
  res.json(albums)
})
//Get specific user
router.get('/:userId', async(req, res) => {


  const id = req.params.userId;

  const user = await User.findByPk(id)

  res.json(user);
})
router.patch('/:userId', singleMulterUpload('image'), async(req, res) => {

  let {userId, username, email, image} = req.body

  const user = await User.findByPk(userId)
  if(req.file) {
    image = await singlePublicFileUpload(req.file)
  }


  if(user) {

    await user.update({username, email, image})
    return res.status(301).json(user)
  }else {
    
    return res.status(404).json('User not found')
  }

})

router.get('/:userId/songs', async(req, res) => {
  const id = req.params
  const songs = await Song.findAll({
    where: {
      userId: id.userId,
      albumId: null
    }
  })
  res.json(songs)
})

module.exports = router;
