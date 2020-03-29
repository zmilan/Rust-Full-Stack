const Email = require('../models/Email');

// $curl -X GET localhost:8000/api/email/v1
const listEmails = async (_req, res) => {
    try {
        // https://mongoosejs.com/docs/queries.html
        // You can also use regexp?
        // https://mongoosejs.com/docs/queries.html

        const items = await Email.find().sort({ date: -1 });
        res.json(items);
    } catch(e) {
        res.json({
            ...e,
            success: false,
        });
        console.log(e);
    }
};

// curl -X GET localhost:8000/api/email/v1/steady@learner.com
const getEmail = async (req, res) => {
    try {
        const item = Email.findOne({
            email: req.params.email
        });
        res.json(item);
    } catch (e) {
        res.json({
            ...e,
            success: false,
        });
        console.log(e);
    }
};


// Refer to this if you want to save various datas.
// https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator

// $curl -X POST localhost:8000/api/email/v1 -H "Content-Type: application/json" -d '{ "email": "steady@learner.com" }'
// $curl -X POST localhost:8000/api/email/v1 -H "Content-Type: application/json" -d '{ "email": "example@email.com" }'
const registerEmail = async (req, res) => {
    const newEmail = new Email({
        email: req.body.email,
    });

    // Use methods here if you defined them before.
    // var fluffy = new Kitten({ name: 'fluffy' });
    // fluffy.speak(); // "Meow name is fluffy"

    try {
        const newItem = await newEmail.save();
        res.json(newItem);
    } catch(e) {
        res.json({
            ...e,
            success: false,
        });

        console.log(e);
    }
};

// $curl -X PATCH localhost:8000/api/email/v1/steady@learner.com -H "Content-Type: application/json" -d '{ "response": "true" }'
const updateEmail = async (req, res) => {
    try {
        // The following updates directly into MongoDB.
        // You want to avoid them unless you want to skip the middlewares and field validations.
        // const _updatedEmail = await Email.findOneAndUpdate({ email: req.params.email }, req.body);
        // res.json({ success: true });

        const targetEmail = await Email.findOne({ email: req.params.email });
        const updatedEmail = await targetEmail.set(req.body);
        const _savedEmail = await updatedEmail.save();

        res.json({ success: true });

    } catch(e) {
        console.log(e);
        res.status(404).json({ success: false });
    }
};

// $curl -X DELETE localhost:8000/api/email/v1/steady@learner.com
const deleteEmail = async (req, res) => {
    try {
        // The following updates directly into MongoDB.
        // You want to avoid them unless you want to skip the middlewares and field validations.
        // const _deletedEmail = await Email.findOneAndDelete({ email: req.params.email });

        const targetEmail = await Email.findOne({ email: req.params.email });
        const _removedEmail = await targetEmail.remove();

        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.status(404).json({ success: false });
    }
};

module.exports = {
    listEmails,
    getEmail,
    registerEmail,
    updateEmail,
    deleteEmail,
}
