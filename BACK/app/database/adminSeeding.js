import  User  from '../models/User.js';
import bcrypt from 'bcrypt';


const seedUsers = async () => {
    const passwordHash = await bcrypt.hash('Jesuisadmin78!', 10);

    await User.create({
        role: 'admin',
        firstname: 'jack',
        lastname: 'sparrow',
        password: passwordHash,
        email: 'admin@blackpearl.com',
        phone: 1234567890,
    });
};

seedUsers().catch((error) => {
    console.error('Error seeding users:', error);
});