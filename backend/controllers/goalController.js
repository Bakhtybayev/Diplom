const asyncHandler = require('express-async-handler');

// @desc get Goals
// @Route GET api/goals
// @access PRIVATE
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: 'Goals is Normal'
	})
})

// @desc post Goals
// @Route POST api/goals
// @access PRIVATE
const postGoals = asyncHandler(async (req, res) => {
	if(!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field!');
	}
	res.status(200).json({
		message: 'Set Goals'
	})
})

// @desc put Goals
// @Route GET api/goals/:id
// @access PRIVATE
const putGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Put Goal ${ req.params.id }`
	})
})

// @desc get Goals
// @Route GET api/goals/:id
// @access PRIVATE
const deleteGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Delete Goal ${ req.params.id }`
	})
})

module.exports = {
	getGoals,
	postGoals,
	putGoals,
	deleteGoals
}