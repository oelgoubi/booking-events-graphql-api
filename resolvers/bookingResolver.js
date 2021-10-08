const Booking = require("../models/booking")
const Event = require("../models/event")
const { transformBooking, transformEvent} = require("./mergers")





module.exports = {
    bookings: async (args, ctx) => {
        if(!ctx.isAuth){
            throw Error("Unauthenticated")
        }
        try {
            const bookings = await Booking.find({});
            return bookings.map(booking => {
                return transformBooking(booking)
            })

        } catch (error) {
            console.log(error)
            throw error
        }
    },
    bookEvent: async ({ eventId },ctx) => {
        if(!ctx.isAuth){
            throw Error("Unauthenticated")
        }
        // Check is Events exist
        try {
            const event = await Event.findById(eventId);
            // Todo :  Check if the user already booked the event 

            const newBooking = new Booking({
                event: event,
                user: ctx.userId
            })
            // Save Booking
            const savedBooking = await newBooking.save();
            return transformBooking(savedBooking)
        } catch (error) {
            throw error
        }
    },
    cancelBooking : async ({bookingId},ctx)=>{
        if(!ctx.isAuth){
            throw Error("Unauthenticated")
        }
        try {
            const booking = await Booking.findById(bookingId).populate("event")
            const event = transformEvent(booking.event)
            await Booking.deleteOne({_id : bookingId});
            return event            
        } catch (error) {
            throw error;
        }
        
    }
}