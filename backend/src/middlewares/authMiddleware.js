import jwt from 'jsonwebtoken'

export const authenticate = async function (req,res,next) {

    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            console.log("Header does not contain token")
            return res.status(403).json({
                message: "No Token is provided"
            })
        }

        const token = authHeader.split(" ")[1]

        if (!process.env.JWT_SECRET) {
            console.log("JWT is not configured")
            return res.status(500).json({
                message: "Internal Sever Error: JWT not configured"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)


        if (!decoded) {
            console.log("Invalid Token Payload")
            return res.status(403).json({
                message: "Invalid Token"
            })
        }

        req.userId = decoded.userId; 
        next()

    } catch (err) {
        console.log("User is not authenticated")
        return res.status(404).json({
            message: "User is not authenticated"
        })
    }

}