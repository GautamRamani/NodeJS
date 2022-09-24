create database pri_foreignkey;
use pri_foreignkey;

create table student_pri(
		f_name varchar(20),
        l_name varchar(20),
        college varchar(30),
		primary key(f_name)
);

drop table student_pri;

insert into student_pri values ('Gautam','Ramani','SSASIT');
insert into student_pri values ('Gautam','Ramani','SSASIT');
																				
select *from student_pri;
