import express from "express"
//import cors from "cors"
import Person from "./models/person.js"
const app = express()

app.use(express.json())
//app.use(cors())
app.use(express.static("dist"))
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", async (request, response) => {
	//console.log(">>>>>  person", await Person.find({}))
	Person.find({}).then((result) => {
		result.forEach((note) => {
			//console.log(">>>>>  person", note)
		})
		response.json(result)
		//mongoose.connection.close()
	})
})

app.get("/api/persons/:id", (request, response) => {
	const note = notes.find((note) => Number(note.id) === Number(request.params.id))
	note ? response.json(note) : response.status(404).end()
})

app.post("/api/persons", (request, response) => {
	//const note = request.body
	//note.id = Math.floor(Math.random() * 1000)
	const person = new Person({
		name: "Samuel Delon",
		number: "01",
	})

	person.save().then((result) => {
		console.log("note saved!")
		response.json(result)
		mongoose.connection.close()
	})
	//notes.push(note)
	//console.log(">>>>>>>>>>>>>", notes)
	//response.json(notes)
})
app.get("/api/info", (request, response) => {
	const info = `Phonebuook has ${notes.length} contacts <br/> ${new Date().toString()}`

	response.send(info)
})
app.delete("/api/persons/:id", (request, response) => {
	notes = notes.filter((note) => Number(note.id) !== Number(request.params.id))
	notes ? response.json(notes) : response.status(204).end()
})

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
