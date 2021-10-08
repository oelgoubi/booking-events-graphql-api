const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")




module.exports = {
    createUser: async ({ userInput }) => {
        try {
            const isOldUser = await User.findOne({ email: userInput.email });

            if (isOldUser) {
                throw new Error("User exist Already !");
            }

            const hashedPassword = await bcrypt.hash(userInput.password, 12);
            const user = new User({
                email: userInput.email,
                password: hashedPassword
            })
            const newUser = await user.save();
            return {
                ...newUser._doc,
                password: null
            }

        } catch (err) {
            console.log(err);
            throw err
        }
    },
    login: async ({ email, password }) => {

        const user = await User.findOne({ email: email });

        if (!user) {
            return Error("User don't exist !")
        }
        console.log(user)

        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) return Error("Invalid Credientials")



        // Gen Token
        const token = jwt.sign({ userId: user.id, email: user.email}, process.env.TokenKey || "TokenKey",
                      { expiresIn: "1h" })

        console.log(token)
        return {
            userId: user.id,
            token,
            expirationTime: 1

        }
    }



}
