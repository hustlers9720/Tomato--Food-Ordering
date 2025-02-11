import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    // console.log(token);

    if (!token) {
        return res.json({ success: false, message: 'Not authorized, log in again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // ✅ Fix: Use id, not _id
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Invalid token, log in again' });
    }
};

export default authMiddleware;
