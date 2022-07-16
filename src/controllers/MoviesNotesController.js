const knexfile = require("../../knexfile");
const knex = require("../database/knex");


class MoviesNotesController {
    async create(request, response){
        const {title, description, rating, tags} = request.body;
        const {user_id} = request.params;
        

        const note_id = await knex("movies").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags.map(name => {
            return {
                note_id, 
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.json();
    }
    
    async show(request, response) {
        const {id} = request.params;

        const note = await knex("movies").where({id}).first();
        const tags = await knex("tags").where({note_id: id}).orderBy("name");


        return response.json({
            ...note,
            tags
        });

    }

    async delete(request, response) {
        const {id} = request.params;

        await knex("movies").where({id}).delete();

        return response.json();
    }

    async index(request, response) {
        const {title, user_id, tags} = request.query;

        let movies;
        console.log(tags);

        if(tags){
            const filterTags = tags.split(',').map(tag =>tag.trim());

            movies = await knex("tags")
            .select([
                "movies.id",
            "movies.title",
            "movies.user_id",
            ])
            .where("movies.user_id", user_id)
            .whereLike("movies.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("movies", "movies.id", "tags.note_id")
            .orderBy("movies.title")

        }else {
            movies = await knex("movies")
            .where({user_id})
            whereLike("title", `%${title}%`)
            .orderBy("title");
        }
        console.log(tags);

        const userTags = await knex("tags").where({user_id});
        const notesWithTags = movies.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        });
        console.log(tags);


        return response.json(notesWithTags);
    }
}

module.exports = MoviesNotesController;