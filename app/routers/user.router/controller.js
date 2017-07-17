const UserModel = require('../../../models/user.model');

const init = (data) => {
    return {
        register: (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            const user = new UserModel(username, password, email);
            const usersData = data.users;
            usersData.checkIfUsernameAndEmailAreFree(user.username, user.email)
                .then((validator) => {
                    if (!(validator.valid)) {
                        return res.render('register', { msg: validator.msg });
                    }

                    return usersData.create({
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        firstName: '',
                        lastName: '',
                        signature: '',
                    }).then((createdUser) => {
                        return res.render('profile', { id: createdUser._id });
                    });
                });
        },

    };
};

module.exports = { init };
