create database university
use university;

create table student(
    rollno int,
    sname varchar(10),
    saddress varchar(20)
);

insert into student values(21,'Yaman','Punagam Surat');
insert into student values(22,'Gautam','Pasodara Surat');
insert into student values(23,'Parimal','Swaminarayan Surat');
insert into student values(24,'Khushi','Shayamnagar Surat');
insert into student values(25,'Bhavin','Swaminarayan Surat');
insert into student values(26,'Veer','Gokuldham Surat');
insert into student values(27,'Kashil','Citylight Surat');
insert into student values(28,'Ansh','Dangigev Surat');
insert into student values(29,'Riyan','Yogichowk Surat');
insert into student values(30,'Parag','Kargilchowk Surat');


select * from student;

select *from student where rollno=23;

select *from student order by rollno asc;
select *from student order by rollno desc;

delete from student where rollno=30;

drop table student;

drop database university;