const { resolve, join, basename, extname } = require("path");
const fs = require('fs');

const TJS = require("typescript-json-schema");

const baseDirectory = join(__dirname, 'src', 'types');
const writeBaseDirectory = join(__dirname, 'src', 'wrappers');

// optionally pass argument to schema generator
const settings = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
    strictNullChecks: true,
};

const code = (parentSchema, id) => `import Ajv from 'ajv';

import { ${id} } from '../types/${id}';

import PayloadWrapper from './PayloadWrapper';

const parentSchema = ${parentSchema};

const validate = new Ajv()
  .addSchema(parentSchema, '${id}')
  .compile(parentSchema.definitions.${id});

export class ${id}Wrapper extends PayloadWrapper<${id}> {
    isValid() {
        return <boolean> validate(this.getPayload());
    }

    getErrors() {
        return validate.errors;
    }
}
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

		fs.writeFile(join(writeBaseDirectory, `${fileBaseName}.ts`), code(schemaString, fileBaseName), 'utf8', err => {
		    if (err) throw err;
		});
	});
});
