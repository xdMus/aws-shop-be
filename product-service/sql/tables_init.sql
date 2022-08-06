create table products (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    price integer
);

create table stocks (
    product_id uuid,
    count integer,
    foreign key ("product_id") references "products" ("id") on delete cascade on update cascade
);

with new_product as (
insert into products (title, description, price)
values('Ferrari', 'Sport car', 500000)
    returning id
    )
insert into stocks (product_id, count)
select id, 7
from new_product;

with new_product as (
insert into products (title, description, price)
values('Cristiano Ronaldo', 'SUUUUIIII', 1000000)
    returning id
    )
insert into stocks (product_id, count)
select id, 1
from new_product;


