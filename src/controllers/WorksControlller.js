const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class WorksController {
    async create ( request, response ) {
        const { title, publisher, authors, image } = request.body;
        const work_id = await knex("works").insert({
            title,
            publisher,
            image
        });
        const authorsInsert = authors.map(author => {
            return {
                author,
                work_id: work_id[0]
            }
        });
        await knex("authors").insert(authorsInsert);
        response.status(201).json({});
    }

    async update ( request, response ) {
        const { title, publisher, image, authors } = request.body;
        const { id } = request.query;
        const work = await knex("works").select("*").where({ id });
        
        work.title = title ?? work.title;
        work.publisher = publisher ?? work.publisher;
        work.image = image ?? work.image;


        await knex("works").update({
            title: work.title,
            publisher: work.publisher,
            image: work.image,
            updated_at: knex.fn.now()
        }).where({ id });


        if ( authors ) {
            const authorCreatedAt = await knex("authors").select("*").where({ work_id: id }).first();
            const authorsInsert = authors.map( author => {
                return {
                    author,
                    created_at: authorCreatedAt.created_at,
                    updated_at: knex.fn.now(),
                    work_id: id
                }
            });
            await knex("authors").del().where({ work_id: id })
            await knex("authors").insert(authorsInsert);
        }

        response.json({});
    }

    async index ( request, response ) {
        const works = await knex("works").select("*");
        const authors = await knex("authors").select("*");

        const worksWithAuthors = works.map(work => {
            const workAuthors = authors.filter(author => work.id === author.work_id );
            return {
                ...work,
                authors: workAuthors
            }
        })
        response.json(worksWithAuthors);
    }

    async delete ( request, response ) {
        const { id } = request.query;
        await knex("works").del().where({ id });
        response.status(204).json({})
    }
} 

module.exports = WorksController;