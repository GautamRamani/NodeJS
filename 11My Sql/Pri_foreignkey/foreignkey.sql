use pri_foreignkey;

create table foreign_stud(
	grno int(4),
    F_name varchar(20),
    L_name varchar(20),
    City varchar(20),
    primary key(grno)
);

insert into foreign_stud values
(1001,'Gautam','Ramani','Surat'),
(1002,'Yaman','Dudhat','Ahmedabad'),
(1003,'Khushi','Vadodariya','Banglore'),
(1004,'Parimal','Jodhani','Surat'),
(1005,'Bhavin','Satasiya','Vadodara');

select *from foreign_stud;

create table foreign_result(
	srno int(4) primary key,
    Maths int(3),
    Chemistry int(3),
    Physics int(3),
    percentage float(3),
	foreign key (srno) references foreign_stud(grno)
);

insert into foreign_result values
(1001,80,95,79,85.04),
(1002,75,78,89,85.09),
(1003,95,98,72,83.60),
(1004,56,79,71,80.01),
(1005,67,76,87,85.00);

select *from foreign_result;

delete from foreign_stud
where grno=1001
