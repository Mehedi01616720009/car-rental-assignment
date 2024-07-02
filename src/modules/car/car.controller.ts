import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';

// create a car controller
const createCar = catchAsync(async (req, res) => {
    const result = await CarServices.createCarIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Car created successfully',
        data: result,
    });
});

// get all cars controller
const getAllCar = catchAsync(async (req, res) => {
    const result = await CarServices.getAllCarFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car retrieved successfully',
        data: result,
    });
});

// get a car controller
const getSingleCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.getSingleCarFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'A Car retrieved successfully',
        data: result,
    });
});

// update a car controller
const updateCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.updateCarIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car updated successfully',
        data: result,
    });
});

// soft delete a car controller
const deleteCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.deleteCarFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car deleted successfully',
        data: result,
    });
});

// return car from user controller
const returnCar = catchAsync(async (req, res) => {
    const result = await CarServices.returnCarFromUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car returned successfully',
        data: result,
    });
});

export const CarController = {
    createCar,
    getAllCar,
    getSingleCar,
    updateCar,
    deleteCar,
    returnCar,
};
