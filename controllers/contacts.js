const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

const createContact = async (req, res) => {
  // swagger.tags =[contacts]
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .insertOne(contact);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json({
      error: 'Some error occurred while creating the contact',
    });
  }
};

const updateContact = async (req, res) => {
  // swagger.tags =[contacts]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favouriteColor: req.body.favouriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Contact not updated' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  // swagger.tags =[contacts]
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Successfully deleted
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
