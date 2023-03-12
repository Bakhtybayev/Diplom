const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const User = require('../model/userModel');

// @desc get Goals
// @Route GET api/goals
// @access PRIVATE
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
})

// @desc post Goals
// @Route POST api/goals
// @access PRIVATE
const postGoals = asyncHandler(async (req, res) => {
	if(!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field!');
	}
	
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id
	});
	
	res.status(200).json(goal);
})

// @desc put Goals
// @Route PUT api/goals/:id
// @access PRIVATE
const putGoals = asyncHandler(async (req, res) => {

	const goal = await Goal.findById(req.params.id);

	if(!goal) {
		res.status(400);
		throw new Error('Goal not founded!');
	}

	const user = await User.findById(req.user.id);
	
	//Check for User!
	if(!user) {
		res.status(401);
		throw new Error('User not Founded!');
	}

	// Make sure the logged in User matches the goal user!
	if(goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized!');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	res.status(200).json(updatedGoal);
})

// @desc delete Goals
// @Route DELETE api/goals/:id
// @access PRIVATE
const deleteGoals = asyncHandler(async (req, res) => {

	const goal = await Goal.findById(req.params.id);

	if(!goal) {
		res.status(400);
		throw new Error('Goal not founded!');
	}

	//Check for User!
	if(!user) {
		res.status(401);
		throw new Error('User not Founded!');
	}

	// Make sure the logged in User matches the goal user!
	if(goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized!');
	}

	await goal.deleteOne();

	res.status(200).json({
		message: `Goal by this id ${ req.params.id } was deleted!`
	})
})

module.exports = {
	getGoals,
	postGoals,
	putGoals,
	deleteGoals
}