create table orders (id serial primary key, status varchar(20), user_id bigint references users(id));