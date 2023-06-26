create table if not exists movies{
    id serial primary key,
    title varchar(200),
    year integer,
    mainActor varchar(200)
}