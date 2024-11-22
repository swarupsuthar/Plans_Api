// middleware/validateRequest.js
const validateRequest = (req, res, next) => {
    const { firstName, lastName, location, email, password } = req.body;
    if (!firstName || !lastName || !location || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };
  
  module.exports = validateRequest;
  