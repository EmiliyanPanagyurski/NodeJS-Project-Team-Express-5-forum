const ObjectId = require('mongodb').ObjectId;

const init = (data) => {
    const UsersData = data.users;
    return {
        register: (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
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
                    }).then((createdUser) => {
                        return res.render('login',
                        { msgLogin: 'Successfull registration, now you can log in!' });
                    });
                });
        },
        updateProfile: (req, res) => {
            UsersData.update({ username: req.body.username },
                {
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    signature: req.body.signature,
                })
                .then(() => {
                    return res.redirect('/profile/' + req.user._id);
                });
        },
        getPublicProfile: (req, res) => {
            UsersData.filterBy({ _id: new ObjectId(req.params.id) })
                .then((user) => {
                    return res.render('publicprofile',
                        {
                            username: user[0].username,
                            firstName: user[0].firstName,
                            lastName: user[0].lastName,
                            email: user[0].email,
                            signature: user[0].signature,
                        }
                    );
                });
        },
    };
};

module.exports = { init };
