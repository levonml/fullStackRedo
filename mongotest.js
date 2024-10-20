import mongoose from "mongoose"

//import dotenv from "dotenv"

//dotenv.config()

if (process.argv.length < 3) {
	console.log("give password as argument")
	process.exit(1)
}

const password = process.argv[2]

const MONGO_URI = `mongodb+srv://lstepany:${password}@cluster0.v0u5e.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`
//const MONGO_URL = process.env.MONGO_URL
mongoose.set("strictQuery", false)

mongoose.connect(MONGO_URI)

const noteSchema = new mongoose.Schema({
	name: String,
	number: String,
})

export const Person = mongoose.model("person", noteSchema)

const person = new Person({
	name: "Alen Delon",
	number: "01",
})

/*person.save().then((result) => {
	console.log("note saved!")
	//mongoose.connection.close()
}) */
Person.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note)
	})
	//mongoose.connection.close()
})
