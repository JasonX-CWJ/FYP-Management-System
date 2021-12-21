import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        // if token is valid
        if (token && isCustomAuth) {
            // own auth
            decodedData = jwt.verify(token, secret);

            req.userId = decodedData?.id;
        } else {
            //google auth
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
