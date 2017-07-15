const UserModel = require('../../../models/user.model');

const init = (data) => {
return {
    register: (req, res) => {
        const body = req.body;
        const user = new UserModel(body.username, body.password, body.email);
        const usersData = data.user;

        usersData.create({
            name: user.name,
            password: user.password,
            email: user.email,
            }).then((createdUser) => {
                res.render('profile', createdUser);
            });
        },
    };
};

module.exports = { init };
