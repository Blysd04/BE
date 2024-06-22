const userModel = require('../models/user.model')

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const createUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body
    const checkEmail = await userModel.find({ email: email })
    let errors = []

    if (!req.body.hasOwnProperty('name')) {
      errors.push("Name is required")
    } else if (/^\d+$/.test(name)) {
      errors.push("Name cannot be all numbers")
    } else if (name.length < 2 || name.length > 50) {
      errors.push("Name's length should be between 2 and 50")
    }
    if (req.body.hasOwnProperty('email')) {
      if (isValidEmail(email)) {
        if (checkEmail.length > 0) {
          errors.push("Email is registered")
        }
      } else {
        errors.push("Email invalid")
      }
    } else if (!req.body.hasOwnProperty('email')) {
      errors.push("Email is required")
    }

    if (req.body.hasOwnProperty('age')) {
      if (age < 10 || age > 120) {
        errors.push("Age should be between 10 and 120")
      }
    } else if (!req.body.hasOwnProperty('age')) {
      errors.push("Age is required")
    }

    if (req.body.hasOwnProperty('password')) {
      if (password.length < 6 || password.length > 50) {
        errors.push("Password's length should be between 6 and 50")
      }
    } else if (!req.body.hasOwnProperty('password')) {
      errors.push("Password is required")
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const user = await userModel.create({ name: name, email: email, age: age, password: password })
    res.status(400).json(user);

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findById(id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params
    const { email, name, age, password } = req.body
    const checkEmail = await userModel.find({ email: email })
    let errors = []

    if (/^\d+$/.test(name)) {
      errors.push("Name cannot be all numbers")
    } else if (name.length < 2 || name.length > 50) {
      errors.push("Name's length should be between 2 and 50")
    }

    if (req.body.hasOwnProperty('email')) {
      if (isValidEmail(email)) {
        if (checkEmail.length > 0) {
          errors.push("Email is registered")
        }
      } else {
        errors.push("Email invalid")
      }
    }
    if (req.body.hasOwnProperty('age')) {
      if (age < 10 || age > 120) {
        errors.push("Age should be between 10 and 120")
      }
    }
    if (req.body.hasOwnProperty('password')) {
      if (password.length < 6 || password.length > 50) {
        errors.push("Password's length should be between 6 and 50")
      }
    }
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const user = await userModel.findByIdAndUpdate(id, req.body)
    res.status(200).json(user)

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findByIdAndDelete(id)
    if (!user) {
      res.status(200).json("User not found!")
    } else {
      res.status(200).json("User deleted!")
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById }