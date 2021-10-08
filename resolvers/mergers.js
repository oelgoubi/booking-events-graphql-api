const Event = require("../models/event");
const User = require("../models/user");
const { dateToString } = require("../helpers/date")



const getUserById = async userId => {
    try {
        const user = await User.findById(userId);

        return {
            ...user._doc,
            createdEvents: getEventsById.bind(this, user._doc.createdEvents)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}




// Return all the events that has an id contained in eventsIds
const getEventsById = async (eventsIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventsIds } });
        return events.map(async event => {
            return transformEvent(event)
        })
    } catch (error) {
        throw error
    }
}

// Get one Event 
const getEventById = async eventId  => {
    try {
        const event = await Event.findById(eventId);
        //console.log(event)
        return transformEvent(event)

    } catch (error) {
        throw error
    }
}


const transformBooking = booking =>{
    return {
        ...booking._doc,
        user: getUserById.bind(this, booking.user),
        event: getEventById.bind(this, booking.event),
        createdAt:  dateToString(booking.createdAt),
        updatedAt:  dateToString(booking.updatedAt),
    }
}

const transformEvent = event =>{
    return{
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: getUserById.bind(this, event._doc.creator)
    }
}

exports.transformBooking = transformBooking
exports.transformEvent = transformEvent
