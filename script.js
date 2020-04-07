const { resolve, join, basename, extname } = require("path");
const fs = require('fs');

const TJS = require("typescript-json-schema");

const baseDirectory = join(__dirname, 'types');
const writeBaseDirectory = join(__dirname, 'json-types');

// optionally pass argument to schema generator
const settings = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
    strictNullChecks: true,
};

const code = (parentSchema, id) => `const Ajv = require('ajv');
const fs = require('fs');

const ajv = new Ajv();

const parentSchema = ${parentSchema};

ajv.addSchema(parentSchema, '${id}');

const validators = Object.keys(parentSchema.definitions).reduce((validators, key) => (
    { ...validators, [\`validate\${key}\`]: ajv.compile(parentSchema.definitions[key]) }
), {});

module.exports = validators;
`;

fs.readdir(baseDirectory, (err, files) => {
	if (err) {
		console.log("An unexpected error has occured");
		throw err;
	}

	files.forEach(file => {
		const fileBaseName = basename(file, extname(file));
		const program = TJS.getProgramFromFiles([join(baseDirectory, file)], compilerOptions);

		// We can either get the schema for one file and one type...
		const schema = TJS.generateSchema(program, "*", { ...settings, id: fileBaseName });

		const schemaString = JSON.stringify(schema, null, 4);

		fs.writeFile(join(writeBaseDirectory, `${fileBaseName}.js`), code(schemaString, fileBaseName), 'utf8', err => {
		    if (err) throw err;
		});
	});
});
