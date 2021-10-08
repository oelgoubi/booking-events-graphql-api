const Event = require("../models/event");
const User = require("../models/user");
const { dateToString } = require("../helpers/date")
const { transformEvent} = require("./mergers")





module.exports = {
    events: async () => {
        try {
            const allEvents = await Event.find({});
            return allEvents.map(async event => {
                return transformEvent(event)
            })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    createEvent: async ({ eventInput },ctx) => {
        //console.log("inside event",ctx.isAuth)
        if(!ctx.isAuth){
            throw Error("Unauthenticated")
        }
        // 1st Step : Check is the User exist 
        try {
            // Create the event 
            const event = new Event({
                title: eventInput.title,
                description: eventInput.description,
                price: +eventInput.price, // Convert to number
                date: new Date(eventInput.date),
                creator: ctx.userId
            })
            // Temp Variable 
            let createdEvent = null;
            const newEvent = await event.save();
            // Set the new Event 
            createdEvent = transformEvent(newEvent)
            const user = await User.findById(ctx.userId);

            if (!user) {
                throw new Error("User don't exist !")
            }

            user.createdEvents.push(createdEvent);
            // Update new User
            await user.save()

            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    
    
}