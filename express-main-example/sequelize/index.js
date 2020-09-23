const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");
const dotenv = require("dotenv");
dotenv.config();

const { RDS_DB, RDS_USER, RDS_PWD, RDS_HOST } = process.env;

const sequelize = new Sequelize(RDS_DB, RDS_USER, RDS_PWD, {
	host: RDS_HOST,
	dialect: "mysql",
});

const modelDefiners = [
	require("./models/user.model"),
	require("./models/instrument.model"),
	require("./models/orchestra.model"),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

sequelize.sync();

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
