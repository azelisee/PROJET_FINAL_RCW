const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.post('/', departmentController.createDepartment);

router.get('/', departmentController.getDepartments);

router.get('/:id', departmentController.getDepartmentById);

router.put('/:id1,:id2', departmentController.updateDepartment);

router.delete('/:id1,:id2', departmentController.deleteDepartment);

module.exports = router;
