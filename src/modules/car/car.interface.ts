import { Model, Types } from 'mongoose';

// car interface
export interface ICar {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status: 'available' | 'unavailable';
    features: string[];
    pricePerHour: number;
    isDeleted: boolean;
}

// car static model interface
export interface ICarModel extends Model<ICar> {
    isCarAvailable(id: Types.ObjectId): Promise<{ status: string }>;
}
