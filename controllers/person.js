'use strict'

var Person = require('../models/person');

var controller = {
	test: function (req, res) {
		return res.status(200).send({
			message: "Metodo de test"
		});
	},

	getNumb: function (req, res) {
		var num = req.params.num;

		if (num == null) return res.status(404).send({ message: 'ERROR: No numero' });

		return res.status(200).send({
			message: "Numero:" + num
		});
	},

	getPerson: function (req, res) {
		var personId = req.params.id;

		if (personId == null) return res.status(404).send({ message: 'ERROR: No indice' });

		Person.findById(personId, (err, person) => {

			if (err) return res.status(500).send({ message: 'Error al devolver los datos de la persona' });

			if (!person) return res.status(404).send({ message: 'Error, no existe la persona' });

			return res.status(200).send({
				person
			});

		});
	},

	getPersons: function (req, res) {

		var numbOfPersons = req.params.num;

		if (numbOfPersons == null) return res.status(404).send({ message: 'ERROR: Se debe indicar el numero de documentos a consultar' });

		Person.find({}).limit(numbOfPersons).exec((err, persons) => {

			if (err) return res.status(500).send({ message: 'Error al devolver los datos de la personas' });

			if (!persons) return res.status(404).send({ message: 'Error, no hay personas que mostrar' });

			return res.status(200).send({ persons });
		});

	},

	getPersonsByPagination: function (req, res) {

		const options = {
			page: req.query.page,
			limit: req.query.limit,
		};

		let field = req.query.field;
		let value = req.query.value;

		switch (field) {
			case "age": {
				//Parametro pasado para edad no es un numero
				if (isNaN(value)) return res.status(500).send({ ERROR: "La edad debe ser un valor numerico" });

				Person.paginate({ age: value }, options, (error, result) => {

					if (error) return res.status(500).send({ ERROR: error });

					return res.status(200).send({ result });
				});
				break;
			}

			case "name":{
				Person.paginate({name:new RegExp(value, 'i')}, options, (error, result) => {

					if (error) return res.status(500).send({ ERROR: error });

					return res.status(200).send({ result });
				});
				break;
			}

			case "lastName":{
				Person.paginate({lastName:new RegExp(value, 'i')}, options, (error, result) => {

					if (error) return res.status(500).send({ ERROR: error });

					return res.status(200).send({ result });
				});
				break;
			}

			default: {
				Person.paginate({}, options, (error, result) => {

					if (error) return res.status(500).send({ ERROR: error });

					return res.status(200).send({ result });
				});
				break;
			}
		}
	},

	savePerson: function (req, res) {
		var person = new Person();

		var params = req.body;
		person.name = params.name;
		person.lastName = params.lastName;
		person.age = params.age;

		person.save((err, personStored) => {
			if (err) return res.status(500).send({ message: 'Error al guardar' });

			if (!personStored) return res.status(404).send({ message: 'No se ha podido guardar los datos persona' });

			return res.status(200).send({ person: personStored });
		});
	},

	deletePerson: function (req, res) {
		var personId = req.params.id;

		Person.findByIdAndRemove(personId, (err, personRemoved) => {
			if (err) return res.status(500).send({ message: 'Error al eliminar' });

			if (!personRemoved) return res.status(404).send({ message: "No existe la persona que se quiere eliminar" });

			return res.status(200).send({
				personRemoved
			});
		});
	},

	deleteAllPersons: function (req, res) {

		Person.deleteMany({}, (err, numOfPersonsRemoved) => {
			if (err) return res.status(500).send({ message: 'Error al eliminar todas las personas' });

			if (!numOfPersonsRemoved) return res.status(404).send({ message: "No hay personas aun para eliminar" });

			return res.status(200).send({
				numOfPersonsRemoved
			});
		});
	},

	updatePerson: function (req, res) {
		var personId = req.params.id;
		var update = req.body;

		Person.findByIdAndUpdate(personId, update, { new: true }, (err, personUpdated) => {
			if (err) return res.status(500).send({ message: 'Error al actualizar' });

			if (!personUpdated) return res.status(404).send({ message: 'No existe la persona que se quiere actualizar' });

			return res.status(200).send({
				personUpdated
			});
		});

	},
};

module.exports = controller;