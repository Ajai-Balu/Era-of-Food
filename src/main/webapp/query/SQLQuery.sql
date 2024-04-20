CREATE TABLE EOF.USER_DATA(user_id int IDENTITY(3000,1) NOT NULL,name varchar(30) NOT NULL,age int NOT NULL,email varchar(30) unique NOT NULL,gender varchar(10) NOT NULL,phone_number varchar(20) NOT NULL,likes varchar(10) NOT NULL,password varchar(30) NOT NULL,role varchar(10) default 'user',is_delete int default 0,created_at datetime default getdate())

CREATE TABLE EOF.RECIPE_MASTER(recipe_id int identity(5000,1) primary key, user_id int NOT NULL, title varchar(40) NOT NULL,category varchar(10) NOT NULL,dish varchar(20) NOT NULL,cuisine varchar(20) NOT NULL,prepare_time int NOT NULL,cooking_time int NOT NULL,total_time int NOT NULL,yield varchar(30) NOT NULL,about varchar(MAX) NOT NULL,ingredients nvarchar(Max) NOT NULL,instructions nvarchar(MAX) NOT NULL,img text NOT NULL, is_delete int default 0, posted_at datetime default getdate());

CREATE TABLE EOF.RECIPE_CMD(comment_id int identity(1,1) primary key, recipe_id int not null, user_id int not null, comments varchar(max), is_delete int default 0, created_at datetime default getdate(),CONSTRAINT UC_cmd UNIQUE (recipe_id,user_id))

CREATE TABLE EOF.RECIPE_RATING(rating_id int identity(1,1) primary key, recipe_id int not null,user_id int not null,rating int not null default 0,is_delete int default 0, submitted_at datetime default getdate(),CONSTRAINT UC_rating UNIQUE (recipe_id,user_id))

SELECT * FROM EOF.RECIPE_RATING

UPDATE EOF.RECIPE_CMD SET is_delete = 0 WHERE comment_id = 1

SELECT * FROM EOF.RECIPE_CMD

SELECT top 8 title,img,RESP.recipe_id,RAT.count,RAT.sum from eof.RECIPE_MASTER RESP with (NOLOCK) left join (SELECT recipe_id,SUM(rating) as sum,COUNT(rating) as count FROM eof.RECIPE_RATING with (nolock) where is_delete = 0 group by recipe_id ) RAT ON RAT.recipe_id = RESP.recipe_id WHERE is_delete = 0 order by sum DESC,count DESC 


SELECT title,img,RESP.recipe_id,isnull(count,0) FROM EOF.RECIPE_MASTER RESP with (NOLOCK) LEFT JOIN (SELECT recipe_id,SUM(rating) as sum,COUNT(rating) as count FROM eof.RECIPE_RATING with (NOLOCK) WHERE is_delete = 0 group by recipe_id)RAT ON RESP.recipe_id = RAT.recipe_id WHERE RESP.is_delete = 0

update eof.RECIPE_MASTER set is_delete = 0 where recipe_id in( 5003, 5006)

UPDATE eof.USER_DATA SET role = 'admin' WHERE user_id = 3004

UPDATE eof.USER_DATA SET password = 'QWphaUAyMTky' WHERE user_id = 3002

SELECT  * FROM EOF.RECIPE_MASTER 

SELECT * FROM EOF.USER_DATA

SELECT * FROM eof.USER_DATA USR left join (SELECT COUNT(recipe_id) as count,user_id FROM EOF.RECIPE_MASTER where is_delete = 0 group by user_id) RESP ON RESP.user_id = USR.user_id and is_delete = 0

SELECT COUNT(user_id) as user_count eof.USER_DATA WHERE is_delete = 0

SELECT * FROM EOF.RECIPE_DATA WITH (NOLOCK) WHERE user_id = 3000

SELECT top 8  recipe_id,AVG(Cast(rating as Float)) as avg FROM eof.RECIPE_RATING where is_delete = 0 group by recipe_id

SELECT title,img,recipe_id from eof.RECIPE_MASTER WITH (NOLOCK) WHERE recipe_id = 5000  and is_delete = 0 

SELECT top 8  recipe_id,SUM(rating) as sum,COUNT(rating) as count FROM eof.RECIPE_RATING where is_delete = 0 group by recipe_id order by sum desc,count desc

SELECT recipe_id,SUM(rating) as sum,COUNT(rating) as count FROM eof.RECIPE_RATING where recipe_id = 5000 and is_delete = 0 group by recipe_id

SELECT id, name, amount, date FROM AJAI.CUSTOMERS cust RIGHT JOIN AJAI.ORDERS ord ON cust.ID = ord.customer_id

SELECT *,USR.name,RAT.sum,RAT.count  FROM EOF.RECIPE_MASTER RESP left JOIN EOF.USER_DATA USR ON RESP.user_id = USR.user_id  left join (SELECT SUM(rating) as sum,COUNT(rating) as count, recipe_id FROM eof.RECIPE_RATING where is_delete = 0 group by recipe_id) RAT ON RESP.recipe_id = RAT.recipe_id where RESP.is_delete = 0 and RESP.recipe_id = 5000

SELECT usr.name,age,email,gender,phone_number,likes FROM eof.USER_DATA usr left join (SELECT COUNT(recipe_id) as count,user_id FROM EOF.RECIPE_MASTER where is_delete = 0 group by user_id) RESP ON RESP.user_id = usr.user_id WHERE usr.user_id = 3000 and is_delete = 0

--SELECT top 8  RAT.recipe_id,SUM(rating) as sum,COUNT(rating) as count FROM eof.RECIPE_RATING RAT left JOIN ()RESP ON RAT.recipe_id=RESP.recipe_id where RAT.is_delete = 0 group by RAT.recipe_id order by sum DESC,count DESC

SELECT title,img,RESP.recipe_id,RAT.count,RAT.sum from eof.RECIPE_MASTER RESP left join (SELECT recipe_id,SUM(rating) as sum,COUNT(rating) as count FROM eof.RECIPE_RATING where is_delete = 0 group by recipe_id ) RAT ON RAT.recipe_id = RESP.recipe_id order by sum DESC,count DESC

SELECT top 8 title,img,RESP.recipe_id,isnull(RAT.count,0) as avg,isnull(RAT.avg,0) as avg from eof.RECIPE_MASTER RESP WITH (NOLOCK) left join (SELECT recipe_id,SUM(rating) as sum,COUNT(rating) as count,AVG(rating) as avg FROM eof.RECIPE_RATING WITH (NOLOCK) where is_delete = 0 group by recipe_id ) RAT ON RAT.recipe_id = RESP.recipe_id WHERE is_delete = 0 order by sum DESC,count DESC

SELECT RESP.recipe_id,RESP.user_id,title,category,dish,cuisine,prepare_time,cooking_time,total_time,ingredients,instructions,yield,about,img,USR.name,isnull(RAT.count,0) as count,isnull(RAT.avg,0) as avg  FROM EOF.RECIPE_MASTER RESP WITH (NOLOCK) left JOIN EOF.USER_DATA USR ON RESP.user_id = USR.user_id  left join (SELECT AVG(rating) as avg,COUNT(rating) as count, recipe_id FROM eof.RECIPE_RATING WITH (NOLOCK) where is_delete = 0 group by recipe_id) RAT ON RESP.recipe_id = RAT.recipe_id where RESP.is_delete = 0 and RESP.recipe_id = ?


SELECT title,img,RESP.recipe_id,sum,count FROM EOF.RECIPE_MASTER RESP LEFT JOIN (SELECT recipe_id,SUM(rating) as sum,COUNT(rating) as count FROM eof.RECIPE_RATING WHERE is_delete = 0 group by recipe_id)RAT ON RESP.recipe_id = RAT.recipe_id WHERE RESP.is_delete = 0 and dish = 'salad'


SELECT USR.user_id,comments,USR.name FROM EOF.RECIPE_CMD CMD with (nolock)  left JOIN EOF.USER_DATA USR with (nolock) ON CMD.user_id = USR.user_id WHERE recipe_id = 5001 and CMD.is_delete = 0

SELECT USR.user_id,name,age,email,gender,phone_number,likes,RESP.count FROM eof.USER_DATA USR with (NOLOCK) left join (SELECT COUNT(recipe_id) as count,user_id FROM EOF.RECIPE_MASTER with (NOLOCK) where is_delete = 0 group by user_id) RESP ON RESP.user_id = USR.user_id WHERE USR.role = 'user' and is_delete = 0

SELECT RESP.recipe_id,RESP.user_id,title,category,dish,cuisine,prepare_time,cooking_time,total_time,ingredients,instructions,img,USR.name,RAT.sum,RAT.count  FROM EOF.RECIPE_MASTER RESP WITH (NOLOCK) left JOIN EOF.USER_DATA USR ON RESP.user_id = USR.user_id  left join (SELECT SUM(rating) as sum,COUNT(rating) as count, recipe_id FROM eof.RECIPE_RATING WITH (NOLOCK) where is_delete = 0 group by recipe_id) RAT ON RESP.recipe_id = RAT.recipe_id where RESP.is_delete = 0 and RESP.recipe_id = 5000

SELECT USR.user_id,name,age,email,gender,phone_number,likes,CASE WHEN RESP.count > -1 then RESP.count else 0 END as count FROM eof.USER_DATA USR with (NOLOCK) left join (SELECT COUNT(recipe_id) as count,user_id FROM EOF.RECIPE_MASTER with (NOLOCK) where is_delete = 0 group by user_id) RESP ON RESP.user_id = USR.user_id WHERE USR.user_id = 3002 and is_delete = 0
