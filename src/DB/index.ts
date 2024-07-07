import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

// super admin data
const superAdminData = {
    name: 'Mehedi Hasan',
    email: 'mehedi01616720009@gmail.com',
    role: USER_ROLE.superAdmin,
    password: config.superAdminPassword,
    phone: '01616720009',
    address: 'Dhaka',
};

// super admin query
const superAdminQuery = { role: USER_ROLE.superAdmin };

const seedSuperAdmin = async () => {
    // check count of super admins, if it grater than limit of super admin delete all and initialize it
    const totalSuperAdmins = await User.countDocuments(superAdminQuery);
    if (totalSuperAdmins > Number(config.superAdminLimit)) {
        await User.deleteMany(superAdminQuery);
    }

    // check if any super admin exist, if no one then seed super admin
    const isSuperAdminExist = await User.findOne(superAdminQuery);
    if (!isSuperAdminExist) {
        await User.create(superAdminData);
    }
};

export default seedSuperAdmin;
