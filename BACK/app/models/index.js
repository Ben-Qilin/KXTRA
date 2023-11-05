import User from "../models/User.js";
import Category from "../models/Category.js";
import Image from "../models/Image.js";
import Institution from "../models/Institution.js";
import Package from "../models/Package.js";
import Service from "../models/Service.js";
import Style from "../models/Style.js";
import Purchase from "../models/Purchase.js";

//Association des entités service/category
//0,N - relation de N à N - manyToMany => belongsToMany (conbinaision de 0,N et 1,N)
Service.belongsToMany(Category, {
    as: 'categories',
    through: 'service_has_category',
    foreignKey: 'service_id',
    otherKey: 'category_id'
});
// 1,N
Category.belongsToMany(Service, {
    as: 'services',
    through: 'service_has_category',
    foreignKey: 'category_id',
    otherKey: 'service_id'
});

//0,N - relation de N à N - manyToMany => belongsToMany (conbinaision de 0,N et 1,N)
Package.belongsToMany(Style, {
    as: 'style',
    through: 'package_has_style',
    foreignKey: 'package_id',
    otherKey: 'style_id'
});
// 1,N
Style.belongsToMany(Package, {
    as: 'package',
    through: 'package_has_style',
    foreignKey: 'style_id',
    otherKey: 'package_id'
});


//Association des entités service/institution
//0,N - oneToMany - 1,N - clé étrangère du côté du N car on veut retrouver ses many services donc on met institution_id dans institution et services
Institution.hasMany(Service, {
    as: 'services',
    foreignKey: 'institution_id'
});
//1,1
Service.belongsTo(Institution, {
    as: 'institution',
    foreignKey: 'institution_id'
});


//Association des entités user/purchase et purchase/package
//0,N
User.hasMany(Purchase, {
    as: 'purchases',
    foreignKey: 'user_id'
});
// ! relation inverse du hasMany - une commande un user
// 0,N
Purchase.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});
// N plusieur package pour plusieur commandes
Package.belongsToMany(Purchase, {
    as: 'purchases',
    through: 'purchase_has_package',
    foreignKey: 'package_id',
    otherKey: 'purchase_id'
});
// N et inversement 
Purchase.belongsToMany(Package, {
    as: 'packages',
    through: 'purchase_has_package',
    foreignKey: 'purchase_id',
    otherKey: 'package_id'
});



Package.belongsToMany(Service, {
    as: 'services',
    through: 'service_has_package',
    foreignKey: 'package_id',
    otherKey: 'service_id'
});
//1,N
Service.belongsToMany(Package, {
    as: 'packages',
    through: 'service_has_package',
    foreignKey: 'package_id',
    otherKey: 'service_id'
});




//Association des entités service/image
//0,N
Image.hasMany(Service, {
    as: 'services',
    foreignKey: 'service_id'
});
//1,1 - un service une image
Service.belongsTo(Image, {
    as: 'image',
    foreignKey: 'service_id',

});

//Association des entités user/service
//0,N
// User.hasMany(Service,{
//     as: 'services',
//     foreignKey: 'user_id'
// });
// //1.1
// Service.belongsTo(User,{
//     as: 'user',
//     foreignKey: 'user_id'
// });

//Association des entités user/institution
//0,N
User.hasMany(Institution,{
    as:'institutions',
    foreignKey: 'user_id'
});
//1.1
Institution.belongsTo(User,{
    as: 'user',
    foreignKey: 'user_id'
});

//Association des entités style/institution
//0,N
Style.hasMany(Institution,{
    as: 'institutions',
    foreignKey: 'institution_id'
});

//1,N
Institution.belongsToMany(Style,{
    as: 'styles',
    through: 'institution_has_style',
    foreignKey: 'style_id',
    otherKey: 'institution_id'
});

export { User, Category, Image, Institution, Service, Package, Purchase,  Style };