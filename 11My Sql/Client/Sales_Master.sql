use client;

create table SALE_MASTER(
	SalesmanNo varchar(6),
    SName varchar(20),
    Address1 varchar(30),
	Address2 varchar(30),
	City varchar (20),
    PinCode int(8),
    State Varchar(20),
    SalAmt float(8.2),
    TgtAmt float(6.2),
    YtdSales float(6.2),
    Remarks varchar(60)
);

drop table SALE_MASTER;

insert into SALE_MASTER values 
('S00001','Aman','A/14','Worli','Mumbai',400002,'Maharashtra',3000,100,50,'Good'),
('S00002','Omkar','65','Nariman','Mumbai',400001,'Maharashtra',3000,200,100,'Good'),
('S00003','Raj','P-7','Bandra','Mumbai',400032,'Maharashtra',3000,200,100,'Good'),
('S00004','Ashish','A/5','Juhu','Mumbai',400044,'Maharashtra',3500,200,150,'Good');

select *from SALE_MASTER; 

-- salery equal to 3000 
select SName
from SALE_MASTER
where SalAmt=3000;

-- change city of salesman to Pune
SET SQL_SAFE_UPDATES = 0;
update client.sale_master set City = 'Pune';

-- delete record whose salAmt is eqal to Rs.3500
DELETE FROM sale_master WHERE SalAmt=3500;

-- renaming a tablename
ALTER TABLE sale_master RENAME TO renamedtable;


