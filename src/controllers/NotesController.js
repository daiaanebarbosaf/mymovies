const { request } = require("express");
const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags} = request.body;
    const { user_id } = request.params;

    const movies_notes_id = await knex("movies_notes").insert({
      title, 
      description, 
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        movies_notes_id,
        name, user_id
      }
    });

    await knex("movies_tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movies_notes").where({ id }).first();
    const tags = await knex("movies_tags").where({ movies_notes_id: id }).orderBy("name");

    return response.json({
      ...note,
      tags
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movies_notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex("movies_tags")
      .whereIn("name",filterTags);

    } else {
    notes = await knex("movies_notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title");
    }

    return response.json(notes);
  }
}

module.exports = NotesController;