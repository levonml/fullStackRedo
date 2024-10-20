import mongoose from "mongoose"
import { MONGO_URL } from "../config/utils.js"

mongoose.set("strictQuery", false)

mongoose
	.connect(MONGO_URL)
	.then((result) => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})
personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

export default mongoose.model("Person", personSchema)
