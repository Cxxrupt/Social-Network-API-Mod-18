const { ObhjectId } = require('mongodb');
const { User, Thoughts } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get one thought by id
    async getThoughtById({ params }, res) {
        try {
          const thought = await Thoughts.findOne({ _id: params.id });
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(thought);
        }
        catch (err) {
            console.log(err);
            return res.status(400).json(err);
            }
    },
    // create a new thought
    async createThought(req, res) {
        try {
          const thoughts = await Thoughts.create(req.body
            
          );
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thoughts._id } },
            { new: true }
          );
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // update a thought by id
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { new: true }
              );

                if (!thought) {
                    res.status(404).json({ message: 'No thought with this id!' });
                }

                res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }  
    },

    // delete a thought by id
    async deleteThought({ params }, res) {
        try {
            const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });
      
            if (!thought) {
              return res.status(404).json({ message: "No such thought exists" });
            }
      
            res.json({ message: "thought successfully deleted" });
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
        },

    // add a reaction to a thought
    async createReaction(req, res) {
        console.log("You are adding a reaction");
    
        try {
          const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: req.body } },
            { new: true }
          );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    // delete a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
                );
                if (!thought) {
                    res.status(404).json({ message: 'No thought with this id!' });
                }
                res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          },
        };
        