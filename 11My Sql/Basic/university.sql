create database university;
use university;
create table student(
    srno int,
    rollno int,
    sname varchar(10),
    saddress varchar(20)
);

insert into student values(1,21,'Yaman','Punagam Surat');
insert into student values(2,22,'Gautam','Pasodara Surat');
insert into student values(3,23,'Parimal','Swaminarayan Surat');
insert into student values(4,24,'Khushi','Shayamnagar Surat');
insert into student values(5,25,'Bhavin','Swaminarayan Surat');
insert into student values(6,26,'Veer','Gokuldham Surat');
insert into student values(7,27,'Kashil','Citylight Surat');
insert into student values(8,28,'Ansh','Dangigev Surat');
insert into student values(9,29,'Riyan','Yogichowk Surat');
insert into student values(10,30,'Parag','Kargilchowk Surat');

select *from student;

select *from student where rollno=23;

select *from student order by rollno asc;
select *from student order by rollno desc;

delete from student where rollno=30;

drop table student;

drop database university;

truncate table student;

SET SQL_SAFE_UPDATES = 0;
update university.student set saddress = 'Om-Pasodara' where sname = 'Gautam';

select * from student where sname = 'Yaman' and saddress='Punagam Surat';

