import express from "express"
//import cors from "cors"

const app = express()

app.use(express.json())
//app.use(cors())
app.use(express.static("dist"))
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

let notes = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: "1",
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: "2",
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: "3",
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: "4",
	},
]

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
	response.json(notes)
})

app.get("/api/persons/:id", (request, response) => {
	const note = notes.find((note) => Number(note.id) === Number(request.params.id))
	note ? response.json(note) : response.status(404).end()
})

app.post("/api/persons", (request, response) => {
	const note = request.body
	note.id = Math.floor(Math.random() * 1000)

	notes.push(note)
	console.log(">>>>>>>>>>>>>", notes)
	response.json(notes)
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
