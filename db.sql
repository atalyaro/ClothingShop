CREATE DATABASE clothingshop;

USE clothingshop;

CREATE TABLE users(
user_id int,
private_name varchar(30),
family_name varchar(30),
email varchar(60),
password varchar(255),
access boolean default false,
city varchar(20),
street varchar(30),
primary key(user_id)
);

CREATE TABLE categories(
category_id int auto_increment,
category_name varchar(30),
primary key(category_id)
);

CREATE TABLE products(
product_id int auto_increment,
product_name varchar(100),
product_price int,
image varchar(255),
category_id int,
primary key(product_id),
foreign key(category_id) references categories(category_id)
);

CREATE TABLE carts(
cart_id int auto_increment,
date_cart_created date default now(),
status varchar(20),
user_id int,
primary key(cart_id),
foreign key(user_id) references users(user_id)
);

CREATE TABLE productsincarts(
productincart_id int auto_increment,
amount int,
total_price int,
product_id int,
cart_id int,
primary key(productincart_id),
foreign key(product_id) references products(product_id),
foreign key(cart_id) references carts(cart_id)
);

CREATE TABLE orders(
order_id int auto_increment,
city varchar(20),
street varchar(30),
order_price int,
date_of_order date,
date_order_created date default now(),
four_digits_creditcard int,
cart_id int,
user_id int,
primary key(order_id),
foreign key(cart_id) references carts(cart_id),
foreign key(user_id) references users(user_id)
);

INSERT INTO categories(category_name)
VALUES('Shirts'),
('Pants | Skirts'),
('Dresses | Overalls'),
('Sweaters | Jackets'),
('Swimsuit'),
('Active Wear'),
('Shoes'),
('Accessories');

INSERT INTO products(product_name,product_price,image,category_id)
VALUES('Blue floral top',30,'https://img.ltwebstatic.com/images3_pi/2020/12/28/1609128764157fc12f93dd9cc7ade3fe00acd5dd59_thumbnail_900x.webp',1) ,
('Green undershirt',20,'https://img.ltwebstatic.com/images3_pi/2020/07/20/159521414268a1525b2dcd3caf2f941e7e3791b5c2_thumbnail_900x.webp',1) ,
('Black plaid undershirt',15,'https://img.ltwebstatic.com/images3_pi/2020/11/26/16063586307b3528e0cee92d442d5a1fbfc30a8d3b_thumbnail_900x.webp',1) ,
('Black t-shirt',18,'https://img.ltwebstatic.com/images3_pi/2020/12/09/1607481981225ff65cb92706e49281e05466d18194_thumbnail_900x.webp',1) ,
('Brown buttoned shirt',25,'https://img.ltwebstatic.com/images3_pi/2020/09/28/1601257052d6f16371816e39509bdb2c0ab144a55a_thumbnail_900x.webp',1) ,
('Beige golf shirt',27,'https://img.ltwebstatic.com/images3_pi/2020/08/31/1598850372a077e882bba32fd99a77380c722a7944_thumbnail_900x.webp',1) ,

('Green floral skirt',22,'https://img.ltwebstatic.com/images3_pi/2020/06/24/159298173246d339155bcfbdb2c41b24eccc0b758f_thumbnail_900x.webp',2) ,
('Blue shorts jeans',34,'https://img.ltwebstatic.com/images3_pi/2020/02/27/1582766494ffd3593d5e431cd16a729702055e4716_thumbnail_900x.webp',2) ,
('Grey footer pants',20,'https://img.ltwebstatic.com/images3_pi/2020/11/18/1605689720077ff5306893d52bab43dadf45803683_thumbnail_900x.webp',2) ,
('Blue mom jeans',26,'https://img.ltwebstatic.com/images3_pi/2020/12/22/160860863193ebcb8797747477cb1028274cbaa140_thumbnail_900x.webp',2) ,
('Black and white plaid shorts',19,'https://img.ltwebstatic.com/images3_pi/2020/06/01/1590997378738fb19a052c11645ebda0b8beda587e_thumbnail_900x.webp',2) ,
('Green footer shorts',15,'https://img.ltwebstatic.com/images3_pi/2020/08/27/15985010559a4f51a89c2fc2f83d6c488ac4e7ae3d_thumbnail_900x.webp',2) ,

('Pink dotted overall',27,'https://img.ltwebstatic.com/images3_pi/2021/01/18/16109442631c228f19e25677deb6da810018891f77_thumbnail_900x.webp',3) ,
('Red mini dress',16,'https://img.ltwebstatic.com/images3_pi/2020/12/24/16087822687e2355dc02fa616e42b6d87228c9b1e2_thumbnail_900x.webp',3) ,
('Black velvet dress',21,'https://img.ltwebstatic.com/images3_pi/2020/11/02/160428639154776544fdff51b981739093e46480cf_thumbnail_900x.webp',3) ,
('Yellow floral overall',31,'https://img.ltwebstatic.com/images3_pi/2020/12/28/16091301737ef818058a71d607f1c8d6fe45bf8a54_thumbnail_900x.webp',3) ,
('Black leather overall',40,'https://img.ltwebstatic.com/images3_pi/2020/12/14/160790918157af67640e036188563fafa68f2d0619_thumbnail_900x.webp',3) ,
('Black long sleeves dress',22,'https://img.ltwebstatic.com/images3_pi/2020/09/23/1600868996b88fde841296d00beec65a7e01bad1b3_thumbnail_900x.webp',3) ,

('Black sweater',28,'https://img.ltwebstatic.com/images3_pi/2020/10/29/1603938187743b9c482e028e8239d71de13984d0a8_thumbnail_900x.webp',4) ,
('Yellow footer sweatshirt',23,'https://img.ltwebstatic.com/images3_pi/2020/08/19/1597801966ac85a70d75d79216ee4a4905d1846f1f_thumbnail_900x.webp',4) ,
('Brown corduroy jacket',42,'https://img.ltwebstatic.com/images3_pi/2020/12/11/1607665875ca6e669d35fd0c247d87f3baae197196_thumbnail_900x.webp',4) ,
('Black furr jacket',36,'https://img.ltwebstatic.com/images3_pi/2020/07/15/15947905742684200ab8b8b3f30f5f59203272212e_thumbnail_900x.webp',4) ,
('Pink and black naylon jacket',29,'https://img.ltwebstatic.com/images3_pi/2020/07/24/159556723482565be10e54e1bae2c1b91a3ce8928e_thumbnail_900x.webp',4) ,
('Green footer sweatshirt',26,'https://img.ltwebstatic.com/images3_pi/2021/01/18/1610967220d5e91a682b3809cf801d762ee66f06ef_thumbnail_900x.webp',4) ,

('Beige sparkle bikini',22,'https://img.ltwebstatic.com/images3_pi/2020/11/30/16067135608fc060015ab3ceee673c88b5f8b4cb2d_thumbnail_900x.webp',5) ,
('Red one piece suim',31,'https://img.ltwebstatic.com/images3_pi/2020/12/18/1608268402c54e99e5b3126f02ea5f0224ea9713e3_thumbnail_900x.webp',5) ,
('Green bikini',24,'https://img.ltwebstatic.com/images3_pi/2020/10/17/16028987873e29361a1226a92906fd77f06818dca8_thumbnail_900x.webp',5) ,
('Brown sterples one piece suim',39,'https://img.ltwebstatic.com/images3_pi/2020/09/15/1600148373cc9c8974e0b67391a84845995beb6226_thumbnail_900x.webp',5) ,
('Orange floral bikini',23,'https://img.ltwebstatic.com/images3_pi/2020/07/06/1594012608402a7d677576c466e57195469d22d0c2_thumbnail_900x.webp',5) ,
('Black one piece suim',31,'https://img.ltwebstatic.com/images3_pi/2020/12/22/1608606511bfdd97b84715f6a860dc1eb575c33164_thumbnail_900x.webp',5) ,

('Pink sport bra',30,'https://img.ltwebstatic.com/images2_pi/2018/05/30/15276804093264242731_thumbnail_900x1199.webp',6) ,
('Blue thigts',38,'https://img.ltwebstatic.com/images3_pi/2020/12/09/16074822477d6c8836332688d076a2c4a902717a26_thumbnail_900x.webp',6) ,
('Red sport set',52,'https://img.ltwebstatic.com/images3_pi/2020/11/03/1604377808a57227885eebd0c9654bea91a87ef32e_thumbnail_900x.webp',6) ,
('White sweater sport',36,'https://img.ltwebstatic.com/images3_pi/2020/12/30/16093233728745ff0fe2fb63ea8a35a27b9928664d_thumbnail_900x.webp',6) ,
('Grey sport bra',27,'https://img.ltwebstatic.com/images2_pi/2018/06/25/15299154172571534451_thumbnail_900x1199.webp',6) ,
('Black sport set',48,'https://img.ltwebstatic.com/images3_pi/2020/12/12/16077366846b8b287def23b9abc40e58dc7ecc429f_thumbnail_900x.webp',6) ,

('Black boots',42,'https://img.ltwebstatic.com/images3_pi/2020/12/21/16085219966a9b7520ba5b21bce631b7c3c5ab6260_thumbnail_900x.webp',7) ,
('Yellow sneakers',38,'https://img.ltwebstatic.com/images3_pi/2020/12/03/1606975675366cee794047106467ad1d121d24df62_thumbnail_900x.webp',7) ,
('Brown sandals',32,'https://img.ltwebstatic.com/images3_pi/2020/12/17/16081879927a97418e9f282d74f2a63100025947aa_thumbnail_900x.webp',7) ,
('Red flip-flops',25,'https://img.ltwebstatic.com/images3_pi/2020/12/24/1608780240d7bf88f48e4520797a76588a072cba29_thumbnail_900x.webp',7) ,
('Blue heels',34,'https://img.ltwebstatic.com/images3_pi/2020/07/16/15948870433328e74243af016b25682ad775b0b998_thumbnail_900x.webp',7) ,
('Pink sneakers',43,'https://img.ltwebstatic.com/images3_pi/2020/05/19/1589861852fe8fe4dc46760f67b208f9eb85921d66_thumbnail_900x.webp',7) ,

('Black belt',19,'https://img.ltwebstatic.com/images3_pi/2020/12/29/16092154875b8135cd13f2f15684047ecabc57d600_thumbnail_900x.webp',8) ,
('Beige knitted hat',12,'https://img.ltwebstatic.com/images3_pi/2020/12/18/160825824785dcc4a85dc34d47430f1f98d2e859d2_thumbnail_900x.webp',8) ,
('Blue sunglasses',26,'https://img.ltwebstatic.com/images3_pi/2020/12/30/16093069999ff4e80c7c12bd00600151a2b7901501_thumbnail_900x.webp',8) ,
('Red Bag',34,'https://img.ltwebstatic.com/images3_pi/2020/12/30/1609314462a032bb864ba397f731c946e870e67a8e_thumbnail_900x.webp',8) ,
('Green wallet',28,'https://img.ltwebstatic.com/images2_pi/2019/04/01/15541048273165509469_thumbnail_900x1199.webp',8) ,
('Pink sungalsses',24,'https://img.ltwebstatic.com/images3_pi/2020/08/31/1598841489fe5d57acc6ceaabbe8ffa9ddf63d11e1_thumbnail_900x.webp',8);


INSERT INTO users(user_id,private_name, family_name, email, password, city, street)
VALUES(209320670,'atalya','roichman','atalyaro@gmail.com',"$2b$10$u.SPMt5H5B9zvt/2UM2A2OZ2G5B4wpMtJwqV34yVJq84If9waafie","","") ,
(234863909,'omer','naar','omernaar@walla.com',"$2b$10$u.SPMt5H5B9zvt/2UM2A2OZ2G5B4wpMtJwqV34yVJq84If9waafie", "Tel Aviv", "Florentin 2") ,
(123982123,'mai','nitzan','mai123@gmail.com',"$2b$10$Zxl2gBEITac3oYUoqEaPZOsMD/mAk7YhM1SJzfKYdj79td.t0.OQq", "Jerusalem", "Ein Kerem 34") ,
(783722330,'amir','tchetchik','amir_t1@walla.com',"$2b$10$IrHQBdrQQlZIilkXXHToZOor8AWRhH5iqDvn92Br/r6VYDzTBYP9O", "Rishon LeZion", "Rothschild 168"),
(910129382,'yahav','nayer','yahoov@gmail.com',"$2b$10$VCZhVRz8c1v2mwLexuTgp.L9zNGu9vEK5cJBRxF/KjjYHILMm5gja", "Beersheba", "Herzl 45");

UPDATE users
SET access=1
WHERE user_id=209320670;

-- INSERT INTO carts(date_cart_created,user_id,status)
-- VALUES(NOW(),234863909,"open")