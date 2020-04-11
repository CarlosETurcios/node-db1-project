const db = require('./data/dbConfig');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const getAllAccounts = await db('accounts');
    res.status(200).json(getAllAccounts);
  } catch (Error) {
    res.status(500).json({ Error: 'cannot get accounts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const getAccountById = await db('accounts').where('id', 1).first();
    if (getAccountById) {
      res.status(200).json(getAccountById);
    } else {
      res.status(404).json({ message: 'accounts not found ' });
    }
  } catch (Error) {
    res.status(500).json({
      message: 'Error retrieving the accounts',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const createAccount = req.body;
    const postAccount = await db('accounts').insert(createAccount);
    res.status(201).json(postAccount);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'there was an error while adding the account' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateAccouts = await db('accounts').where(id).update(req.body);
    if (updateAccouts) {
      res.status(200).json(updateAccouts);
    } else {
      res.status(404).json({ error: 'can not find id ' });
    }
  } catch (error) {
    res.status(500).json({ error: 'there was an error with the database' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAccounts = await db('accounts').where('id').del();
    if (deleteAccounts) {
      res.status(200).json(deleteAccounts);
    } else {
      res.status(500).json({ error: 'there was an error with the database' });
    }
  } catch (error) {
    res.status(500).json({ error: 'there was an error with the database' });
  }
});

module.exports = router;
