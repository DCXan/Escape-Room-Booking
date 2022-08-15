import Employee from "../schemas/Employee.js";

export const updateEmployee = async (req, res, next) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};
export const deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json("Employee has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getEmployee = async (req, res, next) => {
  try {
    const Employee = await Employee.findById(req.params.id);
    res.status(200).json(Employee);
  } catch (err) {
    next(err);
  }
};
export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};
