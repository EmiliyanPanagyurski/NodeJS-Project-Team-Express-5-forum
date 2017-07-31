/* eslint-disable no-undefined */
/* eslint-disable max-len */
const bcrypt = require('bcryptjs');

const init = (data, ObjectId) => {
    return {
        register: (req, res) => {
            const UsersData = data.users;
            const username = req.body.username;
            const password = UsersData.hashPassword(req.body.password, bcrypt);
            const email = req.body.email;
            UsersData.checkIfUsernameAndEmailAreFree(username, email)
                .then((validator) => {
                    if (!(validator.valid)) {
                        return res.render('register', { msg: validator.msg });
                    }

                    return UsersData.create({
                        username: username,
                        password: password,
                        email: email,
                        firstName: '',
                        lastName: '',
                        signature: '',
                        img: 'default-img.gif',
                    }).then((createdUser) => {
                        return res.render('login',
                        { msgLogin: 'Successfull registration, now you can log in!' });
                    });
                });
        },
        updateProfile: (req, res) => {
            const UsersData = data.users;
            return UsersData.update({ username: req.body.username },
                {
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    signature: req.body.signature,
                })
                .then(() => {
                    return res.redirect(301, '/profile/' + req.user._id);
                });
        },
        updateProfileImage: (req, res) => {
            const UsersData = data.users;
            const PostsData = data.posts;
            if (req.file === undefined) {
                return res.render('invalid',
                    { imgError: 'must choose a file first' });
            }

            return UsersData.update({ username: req.user[0].username },
                {
                    img: req.file.originalname,
                })
                .then(() => {
                    PostsData.updateMany({ createdBy: req.user[0].username },
                    { createdByImg: req.file.originalname })
                    .then(() => {
                        return res.redirect(301, '/profile/' + req.user[0]._id);
                    });
                });
        },
        getPublicProfile: (req, res) => {
            const UsersData = data.users;
            if (req.isAuthenticated()) {
                 if (req.user[0]._id.toString() === req.params.id) {
                    return res.redirect(301, '/profile/' + req.user[0]._id);
                }
            }

            return UsersData.filterBy({ _id: new ObjectId(req.params.id) })
                .then((users) => {
                    return res.render('publicprofile',
                        {
                            username: users[0].username,
                            firstName: users[0].firstName,
                            lastName: users[0].lastName,
                            email: users[0].email,
                            signature: users[0].signature,
                            img: users[0].img,
                            id: users[0]._id,
                        }
                    );
                });
        },
    };
};

module.exports = { init };
