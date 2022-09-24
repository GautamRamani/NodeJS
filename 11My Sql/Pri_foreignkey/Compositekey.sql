use pri_foreignkey;

create table student_com(
		f_name varchar(20),
        l_name varchar(20),
        college varchar(30),
		constraint PK_student primary key(f_name,l_name)
);

drop table student_com;

insert into student_com values ('Gautam','Ramani','SSASIT');
insert into student_com values ('Gautam','Patel','Tapi');
																				
select *from student_com;
