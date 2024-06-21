import { ICar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: ICar) => {
    const result = await Car.create(payload);
    return result;
};

const getAllCarFromDB = async () => {
    const result = await Car.find();
    return result;
};

const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<ICar>) => {
    const result = await Car.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    // if (features && features.length > 0) {
    //     const deletedFeatures =
    // }
    return result;
};

const deleteCarFromDB = async (id: string) => {
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

export const CarServices = {
    createCarIntoDB,
    getAllCarFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB,
};
